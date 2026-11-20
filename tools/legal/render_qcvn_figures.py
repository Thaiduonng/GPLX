"""Render các trang chứa bản vẽ (Hình 1–20) của QCVN 15:2026/BCA thành ảnh PNG.

Cách dùng:
    python -I tools/legal/render_qcvn_figures.py <pdf> <out_dir> --pages 5-17 [--dpi 150]

Yêu cầu: pymupdf (pip install pymupdf). Chỉ dùng cho tooling tài liệu, không phải runtime.
"""
import argparse
import pathlib
import sys


def parse_range(spec: str) -> list[int]:
    start, _, end = spec.partition("-")
    return list(range(int(start), int(end or start) + 1))


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf")
    parser.add_argument("out_dir")
    parser.add_argument("--pages", default="5-17", help="Dải trang 1-based, ví dụ 5-17")
    parser.add_argument("--dpi", type=int, default=150)
    args = parser.parse_args(argv)

    import pymupdf  # import muộn để --help chạy được khi chưa cài

    out = pathlib.Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(args.pdf)
    for page_no in parse_range(args.pages):
        page = doc[page_no - 1]
        pix = page.get_pixmap(dpi=args.dpi)
        target = out / f"page-{page_no:02d}.png"
        pix.save(target)
        print(f"{target} ({target.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
