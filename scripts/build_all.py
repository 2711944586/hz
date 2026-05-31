"""一键构建：图表 + 二维码 + 占位图 + icon + docx + 合订本 + PDF。
按依赖顺序串行执行，任一步骤失败即停止。"""

import os
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run(cmd, cwd=ROOT, label=None):
    print(f'\n{"="*60}\n▶ {label or " ".join(cmd)}\n{"="*60}')
    t0 = time.time()
    result = subprocess.run(cmd, cwd=cwd, shell=False)
    dt = time.time() - t0
    if result.returncode != 0:
        print(f'❌ FAILED: {label} (exit code {result.returncode}, took {dt:.1f}s)')
        sys.exit(result.returncode)
    print(f'✅ DONE: {label} ({dt:.1f}s)')


steps = [
    (['node', 'scripts/export_charts.js'],          '[1/7] 导出 20 张图表 PNG'),
    (['node', 'scripts/gen_qr.js'],                  '[2/7] 生成 17 张二维码'),
    (['node', 'scripts/gen_photo_placeholders.js'],  '[3/7] 生成 18 张照片占位图'),
    (['node', 'scripts/gen_icons.js'],               '[4/7] 生成 PWA icon'),
    (['python', 'scripts/update_docx.py'],           '[5/7] 写入 docx 附录与图表'),
    (['python', 'scripts/build_combined.py'],        '[6/7] 生成合订本 docx'),
    (['python', 'scripts/export_pdf.py'],            '[7/7] 把 docx 转为 PDF'),
]

if __name__ == '__main__':
    print('开始一键构建中国制博会调研报告全部产物…')
    t_total = time.time()
    for cmd, label in steps:
        run(cmd, label=label)
    dt_total = time.time() - t_total
    print(f'\n🎉 全部 {len(steps)} 步完成，总耗时 {dt_total:.1f}s')
