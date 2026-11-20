"""Trích danh mục biển báo từ tài liệu tổng hợp QCVN 41 (bản 2016/2019, định dạng .doc).

Đầu ra:
  - frontend/public/signs/raster/<figure-id>.<png|jpg>   ảnh biển trích từ file .doc
  - docs/legal/sources/sign-catalog-qcvn41-2019.json      danh mục dạng JSON
  - docs/legal/sources/sign-extraction-report.md          báo cáo ghép ảnh / cảnh báo
  - backend/src/main/resources/db/migration/V14__seed_traffic_signs_qcvn41_2019.sql

Cách dùng (xem README.md):
  antiword -m UTF-8.txt <doc> > /tmp/signs.txt
  python -I tools/signs/extract_signs.py <doc> --text /tmp/signs.txt
"""
from __future__ import annotations

import argparse
import dataclasses
import json
import pathlib
import re
import struct
import sys
import unicodedata

STANDARD_VERSION = "QCVN41:2019"
LEGAL_STATUS = "NEEDS_VERIFICATION"
MEANING_MAX = 4000  # khớp giới hạn TrafficSignUpdateRequest.meaning

GROUP_BY_PREFIX = {
    "DP": "CAM",
    "P": "CAM",
    "R": "HIEU_LENH",
    "W": "NGUY_HIEM",
    "I": "CHI_DAN",
    "S": "PHU",
}

# "P.103", "P.103a", "R.301 (a,b,c)", "DP.135"
# Chấp nhận cả mã thiếu dấu chấm trong chú thích (vd "R301 (a,b,c,d)").
CODE_RE = re.compile(r"\b(DP|[PRWIS])\.?(\d{3})([a-z]?)(?:\s*\(([a-z ,]+)\))?")
NAME_RE = re.compile(r"[“\"]([^”\"]+)[”\"]")
HEADING_RE = re.compile(r"^[A-F]\.?\s*\d+[a-z]?\.?(?:\s+[A-F])?\s+Biển số\s")
CAPTION_RE = re.compile(r"^\s*Hình\s+([A-F])\.(\d+[a-z]?)\s*-\s*(.+?)\s*$")
PIC = "[pic]"
CAPTION_WINDOW = 3


@dataclasses.dataclass
class SignEntry:
    code: str
    name: str
    group: str
    meaning: str = ""
    figure_id: str | None = None
    raster_asset: str | None = None
    standard_version: str = STANDARD_VERSION
    legal_status: str = LEGAL_STATUS


def _clean(text: str) -> str:
    return text.replace("\xa0", " ").replace("\r", "")


def normalize(text: str) -> str:
    """Chuẩn hóa tìm kiếm — phải khớp TrafficSignServiceImpl.normalize phía backend."""
    text = text.replace("đ", "d").replace("Đ", "D")
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    return re.sub(r"\s+", " ", text).strip().lower()


def group_for(code: str) -> str:
    prefix = code.split(".", 1)[0]
    return GROUP_BY_PREFIX[prefix]


def _codes_of(match: re.Match) -> list[str]:
    prefix, num, letter, variants = match.groups()
    base = f"{prefix}.{num}"
    if variants:
        return [base + v.strip() for v in variants.split(",") if v.strip()]
    return [base + letter]


def expand_codes(heading: str) -> list[tuple[str, str]]:
    """Tách tiêu đề mục thành danh sách (mã, tên) theo thứ tự xuất hiện.

    Mã và tên xen kẽ theo nhóm: một nhóm mã liên tiếp được gán cho nhóm tên liên tiếp
    ngay sau nó — cùng số lượng thì ghép từng cặp, ít tên hơn thì mã dư dùng tên cuối.
    """
    heading = _clean(heading)
    tokens: list[tuple[int, str, object]] = []
    for m in NAME_RE.finditer(heading):
        tokens.append((m.start(), "name", re.sub(r"\s+", " ", m.group(1)).strip()))
    name_spans = [(m.start(), m.end()) for m in NAME_RE.finditer(heading)]
    for m in CODE_RE.finditer(heading):
        if any(s <= m.start() < e for s, e in name_spans):
            continue
        tokens.append((m.start(), "code", _codes_of(m)))
    tokens.sort(key=lambda t: t[0])

    result: list[tuple[str, str]] = []
    codes: list[str] = []
    names: list[str] = []

    def flush() -> None:
        if codes and names:
            for i, code in enumerate(codes):
                result.append((code, names[min(i, len(names) - 1)]))
        codes.clear()
        names.clear()

    for _, kind, value in tokens:
        if kind == "code":
            if names:
                flush()
            codes.extend(value)  # type: ignore[arg-type]
        else:
            names.append(value)  # type: ignore[arg-type]
    flush()
    return result


def _split_sections(lines: list[str]) -> list[tuple[str, list[str]]]:
    """Trả về (tiêu đề đầy đủ, các dòng thân) cho từng mục 'X.n Biển số ...'."""
    sections: list[tuple[str, list[str]]] = []
    i = 0
    while i < len(lines):
        if HEADING_RE.match(lines[i].strip()):
            head = [lines[i].strip()]
            i += 1
            while i < len(lines) and lines[i].strip():
                head.append(lines[i].strip())
                i += 1
            body: list[str] = []
            while i < len(lines) and not HEADING_RE.match(lines[i].strip()):
                body.append(lines[i])
                i += 1
            sections.append((" ".join(head), body))
        else:
            i += 1
    return sections


def parse_entries(text: str) -> list[SignEntry]:
    lines = _clean(text).split("\n")
    entries: list[SignEntry] = []
    seen: set[str] = set()
    for heading, body in _split_sections(lines):
        meaning_lines: list[str] = []
        for line in body:
            if PIC in line:
                break
            meaning_lines.append(line.strip())
        meaning = re.sub(r"\s+", " ", " ".join(meaning_lines)).strip()[:MEANING_MAX]
        for code, name in expand_codes(heading):
            if code in seen:
                continue
            seen.add(code)
            entries.append(SignEntry(code=code, name=name, group=group_for(code), meaning=meaning))
    return entries


def _captions_after_pics(text: str) -> list[tuple[str, str] | None]:
    """Với mỗi [pic] theo thứ tự: (figure_id, phần mô tả chú thích) hoặc None nếu không có chú thích gần."""
    lines = _clean(text).split("\n")
    out: list[tuple[str, str] | None] = []
    seen_ids: dict[str, int] = {}
    for i, line in enumerate(lines):
        if PIC not in line:
            continue
        found = None
        seen_nonblank = 0
        for nxt in lines[i + 1:]:
            if not nxt.strip():
                continue
            seen_nonblank += 1
            m = CAPTION_RE.match(nxt)
            if m:
                figure_id = f"{m.group(1)}-{m.group(2)}"
                # Tài liệu có số hình trùng (vd hai lần "Hình B.27d") → thêm hậu tố để mỗi hình giữ chú thích riêng.
                seen_ids[figure_id] = seen_ids.get(figure_id, 0) + 1
                if seen_ids[figure_id] > 1:
                    figure_id = f"{figure_id}-{seen_ids[figure_id]}"
                found = (figure_id, m.group(3))
            break
        out.append(found if seen_nonblank <= CAPTION_WINDOW else None)
        # Nhiều [pic] trên cùng một dòng: chú thích thuộc ảnh đầu, các ảnh sau vẫn chiếm chỉ số.
        out.extend([None] * (line.count(PIC) - 1))
    return out


def pair_pictures(text: str, image_count: int) -> dict[str, int]:
    """Ảnh thứ i ghép với [pic] thứ i, chỉ khi [pic] đó có chú thích 'Hình X.n' ngay sau."""
    pairing: dict[str, int] = {}
    for index, caption in enumerate(_captions_after_pics(text)):
        if index >= image_count:
            break
        if caption:
            pairing[caption[0]] = index
    return pairing


def attach_assets(entries: list[SignEntry], text: str, pairing: dict[str, int],
                  image_assets: dict[int, str]) -> list[SignEntry]:
    """Gán ảnh cho biển theo mã trong chú thích (mã không có chữ cái áp dụng cho mọi biến thể)."""
    captions = {c[0]: c[1] for c in _captions_after_pics(text) if c}
    figures: list[tuple[str, str, list[str]]] = []
    for figure_id, image_index in pairing.items():
        asset = image_assets.get(image_index)
        if asset is None:
            continue
        caption_codes: list[str] = []
        for m in CODE_RE.finditer(captions.get(figure_id, "")):
            caption_codes.extend(_codes_of(m))
        figures.append((figure_id, asset, caption_codes))

    def assign(match) -> None:
        for figure_id, asset, caption_codes in figures:
            for entry in entries:
                if entry.raster_asset is None and match(entry, caption_codes):
                    entry.raster_asset = asset
                    entry.figure_id = figure_id

    # Lượt 1: chú thích ghi đúng mã biến thể. Lượt 2: chú thích chỉ ghi mã gốc (P.127 → biến thể chưa có ảnh riêng).
    assign(lambda e, codes: e.code in codes)
    assign(lambda e, codes: re.sub(r"[a-z]$", "", e.code) in codes)
    return entries


def unused_figures(entries: list[SignEntry], pairing: dict[str, int]) -> list[str]:
    """Các hình đã trích được nhưng không gán cho biển nào (cần kiểm tra chú thích bằng mắt)."""
    used = {e.figure_id for e in entries if e.raster_asset is not None}
    return [figure_id for figure_id in pairing if figure_id not in used]


def _sql_str(value: str | None) -> str:
    if value is None:
        return "NULL"
    return "'" + value.replace("\\", "\\\\").replace("'", "''") + "'"


SQL_HEADER = (
    "-- =============================================================================\n"
    "-- Migration: V14__seed_traffic_signs_qcvn41_2019.sql\n"
    "-- Description: Seed danh mục biển báo từ tài liệu tổng hợp QCVN 41 (bản 2016/2019).\n"
    "-- Sinh tự động bởi tools/signs/extract_signs.py — KHÔNG sửa tay.\n"
    "-- Trạng thái pháp lý: NEEDS_VERIFICATION (chờ đối chiếu QCVN 41:2024/BGTVT).\n"
    "-- =============================================================================\n\n"
)


def to_sql(entries: list[SignEntry]) -> str:
    rows = []
    for e in entries:
        rows.append(
            "("
            + ", ".join([
                _sql_str(e.code), _sql_str(e.name), _sql_str(e.group), _sql_str(e.meaning or None),
                _sql_str(e.standard_version), _sql_str(e.legal_status), _sql_str(e.raster_asset),
                _sql_str(normalize(f"{e.code} {e.name}")),
            ])
            + ")"
        )
    return (
        "INSERT INTO traffic_signs (code, name, sign_group, meaning, standard_version, legal_status, raster_asset, search_text) VALUES\n"
        + ",\n".join(rows)
        + ";\n"
    )


SPRM_PIC_LOCATION = 0x6A03  # sprmCPicLocation: offset của PICF trong stream Data
_SPRA_SIZE = {0: 1, 1: 1, 2: 2, 3: 4, 4: 2, 5: 2, 7: 3}


def pic_locations_in_fkp(fkp: bytes) -> list[tuple[int, int]]:
    """Đọc một trang CHPX FKP (512 byte, [MS-DOC] 2.9.33) → [(fc bắt đầu run, offset PICF)]."""
    crun = fkp[511]
    fcs = struct.unpack_from(f"<{crun + 1}I", fkp, 0)
    found: list[tuple[int, int]] = []
    for i in range(crun):
        word_offset = fkp[4 * (crun + 1) + i]
        if word_offset == 0:
            continue
        start = word_offset * 2
        cb = fkp[start]
        grpprl = fkp[start + 1:start + 1 + cb]
        pos = 0
        while pos + 2 <= len(grpprl):
            sprm = struct.unpack_from("<H", grpprl, pos)[0]
            pos += 2
            spra = sprm >> 13
            size = grpprl[pos] + 1 if spra == 6 else _SPRA_SIZE[spra]
            if sprm == SPRM_PIC_LOCATION and pos + 4 <= len(grpprl):
                found.append((fcs[i], struct.unpack_from("<I", grpprl, pos)[0]))
            pos += size
    return found


def _pic_offsets_in_document_order(ole) -> list[int]:
    """Offset PICF của mọi ảnh, sắp theo vị trí ký tự trong văn bản (thứ tự [pic] của antiword)."""
    word = ole.openstream("WordDocument").read()
    flags = struct.unpack_from("<H", word, 0x0A)[0]
    table = ole.openstream("1Table" if flags & 0x0200 else "0Table").read()
    # FibRgFcLcb97 bắt đầu ở 154; cặp thứ 12 là fcPlcfBteChpx / lcbPlcfBteChpx.
    fc_plcf, lcb_plcf = struct.unpack_from("<II", word, 154 + 12 * 8)
    n = (lcb_plcf - 4) // 8
    page_numbers = struct.unpack_from(f"<{n}I", table, fc_plcf + 4 * (n + 1))
    runs: list[tuple[int, int]] = []
    for pn in page_numbers:
        page = pn & 0x3FFFFF
        runs.extend(pic_locations_in_fkp(word[page * 512:page * 512 + 512]))
    runs.sort()
    offsets: list[int] = []
    for _, offset in runs:
        if not offsets or offsets[-1] != offset:
            offsets.append(offset)
    return offsets


def _blob_after(data: bytes, offset: int) -> tuple[bytes, str] | None:
    """Ảnh PNG/JPEG đầu tiên nằm trong phạm vi PICF tại offset (lcb = 4 byte đầu)."""
    lcb = struct.unpack_from("<I", data, offset)[0]
    chunk = data[offset:offset + lcb]
    png = chunk.find(b"\x89PNG\r\n\x1a\n")
    jpg = chunk.find(b"\xff\xd8\xff")
    if png != -1 and (jpg == -1 or png < jpg):
        end = chunk.find(b"IEND\xaeB`\x82", png)
        return (chunk[png:end + 8], "png") if end != -1 else None
    if jpg != -1:
        end = chunk.rfind(b"\xff\xd9")
        return (chunk[jpg:end + 2], "jpg") if end > jpg else None
    return None


def extract_images(doc_path: pathlib.Path) -> list[tuple[bytes, str] | None]:
    """Ảnh theo đúng thứ tự xuất hiện trong văn bản; None nếu vị trí đó không phải PNG/JPEG."""
    import olefile

    ole = olefile.OleFileIO(str(doc_path))
    data = ole.openstream("Data").read()
    return [_blob_after(data, off) for off in _pic_offsets_in_document_order(ole)]


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("doc", type=pathlib.Path)
    parser.add_argument("--text", type=pathlib.Path, required=True, help="Văn bản UTF-8 xuất bởi antiword")
    parser.add_argument("--repo", type=pathlib.Path, default=pathlib.Path(__file__).resolve().parents[2])
    args = parser.parse_args(argv)

    # antiword đôi khi để lại byte lẻ của NBSP (0xC2) → thay bằng ký tự thay thế, không dừng.
    text = args.text.read_bytes().decode("utf-8", errors="replace").replace("�", " ")
    images = extract_images(args.doc)
    pairing = pair_pictures(text, len(images))

    raster_dir = args.repo / "frontend" / "public" / "signs" / "raster"
    raster_dir.mkdir(parents=True, exist_ok=True)
    assets: dict[int, str] = {}
    for figure_id, index in pairing.items():
        if images[index] is None:
            continue
        blob, ext = images[index]
        (raster_dir / f"{figure_id}.{ext}").write_bytes(blob)
        assets[index] = f"/signs/raster/{figure_id}.{ext}"

    entries = attach_assets(parse_entries(text), text, pairing, assets)

    sources = args.repo / "docs" / "legal" / "sources"
    (sources / "sign-catalog-qcvn41-2019.json").write_text(
        json.dumps([dataclasses.asdict(e) for e in entries], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    migration = args.repo / "backend" / "src" / "main" / "resources" / "db" / "migration" / "V14__seed_traffic_signs_qcvn41_2019.sql"
    migration.write_text(SQL_HEADER + to_sql(entries), encoding="utf-8")

    pic_count = text.count(PIC)
    missing = [e.code for e in entries if e.raster_asset is None]
    by_group: dict[str, int] = {}
    for e in entries:
        by_group[e.group] = by_group.get(e.group, 0) + 1
    report = [
        "# Báo cáo trích danh mục biển báo (QCVN 41 bản 2016/2019)", "",
        f"- Số mã biển: **{len(entries)}** ({', '.join(f'{k}: {v}' for k, v in sorted(by_group.items()))})",
        f"- Số ảnh nhúng trong file: {len(images)}; số vị trí [pic]: {pic_count}; số hình ghép được: {len(pairing)}",
    ]
    if len(images) != pic_count:
        report.append(f"- ⚠ Số ảnh ({len(images)}) khác số [pic] ({pic_count}): ghép theo thứ tự đến hết số nhỏ hơn — cần kiểm tra mắt.")
    report.append(f"- Vị trí ảnh không phải PNG/JPEG (bỏ qua): {sum(1 for i in images if i is None)}")
    report.append("- Thứ tự ảnh lấy theo vị trí ký tự ảnh trong văn bản (sprmCPicLocation trong CHPX FKP), không theo thứ tự lưu trong stream Data.")
    unused = unused_figures(entries, pairing)
    report += ["", f"## Mã chưa có ảnh ({len(missing)})", "", ", ".join(missing) or "(không có)", "",
               f"## Hình đã trích nhưng không gán cho biển nào ({len(unused)})", "", ", ".join(unused) or "(không có)", "",
               "## Bảng ghép hình → ảnh", "", "| Hình | Ảnh |", "| :--- | :--- |"]
    report += [f"| {fid} | `{assets[idx]}` |" for fid, idx in pairing.items()]
    (sources / "sign-extraction-report.md").write_text("\n".join(report) + "\n", encoding="utf-8")

    print(f"entries={len(entries)} images={len(images)} pics={pic_count} paired={len(pairing)} missing_asset={len(missing)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
