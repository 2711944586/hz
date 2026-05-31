"""把调研报告 docx + 合订本 docx 转为 PDF。"""

import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TASKS = [
    {
        "src": r"D:\文件\项目\会展\第二十三届中国国际装备制造业博览会调研报告.docx",
        "dst": os.path.join(ROOT, "docs", "assets", "report.pdf"),
    },
    {
        "src": r"D:\文件\项目\会展\第二十三届中国制博会调研_合订本.docx",
        "dst": os.path.join(ROOT, "docs", "assets", "report-combined.pdf"),
    },
]

TMP_DIR = r"C:\Users\Public\hz_pdf"

# 清理 Word 进程
subprocess.run(["taskkill", "/F", "/IM", "WINWORD.EXE"], capture_output=True)

os.makedirs(TMP_DIR, exist_ok=True)

try:
    from docx2pdf import convert

    for i, task in enumerate(TASKS):
        if not os.path.exists(task["src"]):
            print(f"!! source missing: {task['src']}")
            continue
        tmp_docx = os.path.join(TMP_DIR, f"task_{i}.docx")
        tmp_pdf = os.path.join(TMP_DIR, f"task_{i}.pdf")
        shutil.copy(task["src"], tmp_docx)
        try:
            convert(tmp_docx, tmp_pdf)
        except Exception as e:
            print(f"convert fail: {e}")
            continue
        if os.path.exists(tmp_pdf):
            os.makedirs(os.path.dirname(task["dst"]), exist_ok=True)
            shutil.move(tmp_pdf, task["dst"])
            size_mb = os.path.getsize(task["dst"]) / 1024 / 1024
            print(f"✓ {os.path.basename(task['dst'])} ({size_mb:.2f} MB)")
        if os.path.exists(tmp_docx):
            os.remove(tmp_docx)
finally:
    shutil.rmtree(TMP_DIR, ignore_errors=True)
