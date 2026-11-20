"""Unit test cho tools/signs/extract_signs.py (chạy: python -I -m unittest tools/signs/test_extract_signs.py -v)."""
import pathlib
import sys
import unittest

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import extract_signs as ex  # noqa: E402

SAMPLE = (HERE / "fixtures" / "sample.txt").read_text(encoding="utf-8")


class ParseEntriesTest(unittest.TestCase):
    def test_parse_simple_entry(self):
        entries = {e.code: e for e in ex.parse_entries(SAMPLE)}
        self.assertIn("P.101", entries)
        self.assertEqual(entries["P.101"].name, "Đường cấm")
        self.assertEqual(entries["P.101"].group, "CAM")
        self.assertIn("đặt biển số P.101", entries["P.101"].meaning)

    def test_parse_entry_with_nbsp_and_multiline_heading(self):
        entries = {e.code: e for e in ex.parse_entries(SAMPLE)}
        self.assertEqual(entries["P.103c"].name, "Cấm xe ôtô rẽ trái")
        self.assertEqual(entries["R.122"].name, "Dừng lại")
        self.assertEqual(entries["R.122"].group, "HIEU_LENH")

    def test_irregular_heading_numbering(self):
        text = (
            'D. 11  Biển số R.403a "Đường dành cho xe ô tô”\n\nmô tả\n\n'
            "F.12. Biển số S.510a “Chú ý đường trơn có băng tuyết”\n\nmô tả\n\n"
            'E.42 F Biển số I.439 "Tên cầu"\n\nmô tả\n'
        )
        codes = [e.code for e in ex.parse_entries(text)]
        self.assertEqual(codes, ["R.403a", "S.510a", "I.439"])

    def test_expand_variant_codes(self):
        pairs = ex.expand_codes(
            "B3  Biển số P.103a “Cấm xe ôtô”, Biển số P.103b và P.103c "
            "“Cấm xe ôtô rẽ phải” và “Cấm xe ôtô rẽ trái”"
        )
        self.assertEqual(
            pairs,
            [
                ("P.103a", "Cấm xe ôtô"),
                ("P.103b", "Cấm xe ôtô rẽ phải"),
                ("P.103c", "Cấm xe ôtô rẽ trái"),
            ],
        )
        pairs = ex.expand_codes('D.1a  Biển số R.301 (a,b,c) "Hướng đi phải theo"')
        self.assertEqual(
            pairs,
            [
                ("R.301a", "Hướng đi phải theo"),
                ("R.301b", "Hướng đi phải theo"),
                ("R.301c", "Hướng đi phải theo"),
            ],
        )

    def test_group_from_prefix(self):
        self.assertEqual(ex.group_for("W.224"), "NGUY_HIEM")
        self.assertEqual(ex.group_for("R.122"), "HIEU_LENH")
        self.assertEqual(ex.group_for("I.408"), "CHI_DAN")
        self.assertEqual(ex.group_for("S.506b"), "PHU")
        self.assertEqual(ex.group_for("DP.135"), "CAM")


class PicturePairingTest(unittest.TestCase):
    def test_unmatched_pictures_get_no_asset(self):
        text = (
            "B.1 Biển số P.101 “Đường cấm”\n\nmô tả 1\n\n    [pic]\n\n\n"
            "      Hình B.1 - Biển số P.101\n\n"
            "B.4 Biển số P.104 “Cấm xe máy”\n\nmô tả 2\n\n    [pic]\n\n"
        )
        pairing = ex.pair_pictures(text, image_count=2)
        self.assertEqual(pairing, {"B-1": 0})
        entries = ex.attach_assets(ex.parse_entries(text), text, pairing, {0: "/signs/raster/B-1.png", 1: "/signs/raster/x.png"})
        by_code = {e.code: e for e in entries}
        self.assertEqual(by_code["P.101"].raster_asset, "/signs/raster/B-1.png")
        self.assertIsNone(by_code["P.104"].raster_asset)

    def test_two_pictures_on_one_line_each_consume_an_image(self):
        text = (
            "B.1 Biển số P.101 “Đường cấm”\n\n    [pic][pic]\n\n      Hình B.1 - Biển số P.101\n\n"
            "B.2 Biển số P.102 “Cấm đi ngược chiều”\n\n    [pic]\n\n      Hình B.2 - Biển số P.102\n"
        )
        self.assertEqual(ex.pair_pictures(text, image_count=3), {"B-1": 0, "B-2": 2})

    def test_caption_without_variant_applies_to_all_variants(self):
        pairing = ex.pair_pictures(SAMPLE, image_count=10)
        self.assertEqual(pairing, {"B-1": 0, "B-2": 1, "B-3": 2})
        entries = ex.attach_assets(ex.parse_entries(SAMPLE), SAMPLE, pairing, {i: f"/signs/raster/{i}.png" for i in range(10)})
        by_code = {e.code: e for e in entries}
        self.assertEqual(by_code["P.103b"].raster_asset, "/signs/raster/2.png")
        self.assertIsNone(by_code["P.104"].raster_asset)
        self.assertIsNone(by_code["R.122"].raster_asset)


class DocPictureOrderTest(unittest.TestCase):
    @staticmethod
    def _fkp(runs):
        """runs: list[(fc_start, fc_end, grpprl bytes)] → 512-byte CHPX FKP."""
        import struct
        page = bytearray(512)
        crun = len(runs)
        fcs = [r[0] for r in runs] + [runs[-1][1]]
        struct.pack_into(f"<{crun + 1}I", page, 0, *fcs)
        offset = 511
        for i, (_, _, grpprl) in enumerate(runs):
            chpx = bytes([len(grpprl)]) + grpprl
            offset = (offset - len(chpx)) & ~1
            page[offset:offset + len(chpx)] = chpx
            page[4 * (crun + 1) + i] = offset // 2
        page[511] = crun
        return bytes(page)

    def test_parse_chpx_fkp_finds_pic_locations(self):
        import struct
        pic = lambda off: struct.pack("<HI", 0x6A03, off)  # sprmCPicLocation
        bold = struct.pack("<HB", 0x0835, 1)              # sprmCFBold (toggle, 1 byte)
        fkp = self._fkp([(100, 101, bold + pic(9000)), (200, 201, bold), (300, 301, pic(500))])
        self.assertEqual(ex.pic_locations_in_fkp(fkp), [(100, 9000), (300, 500)])


class SqlTest(unittest.TestCase):
    def test_sql_escapes_quotes(self):
        entry = ex.SignEntry(code="P.999", name="Cấm \"xe\" O'Brien", group="CAM", meaning="a 'b'")
        sql = ex.to_sql([entry])
        self.assertTrue(sql.lstrip().startswith("INSERT INTO traffic_signs"))
        self.assertIn("'Cấm \"xe\" O''Brien'", sql)
        self.assertIn("'NEEDS_VERIFICATION'", sql)
        self.assertIn("'QCVN41:2019'", sql)

    def test_normalize_matches_backend_rule(self):
        self.assertEqual(ex.normalize("  R.122 DỪNG LẠI Đường "), "r.122 dung lai duong")


if __name__ == "__main__":
    unittest.main()
