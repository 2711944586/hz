"""通用排版样式工具：用于 update_docx.py 与 build_combined.py
统一定义：
- 标题样式（一二三级）
- 正文样式
- 表格样式
- 页眉页脚页码
- 段落格式（首行缩进、行距、段前段后）
"""

from docx.shared import Cm, Pt, Mm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn, nsmap
from docx.oxml import OxmlElement


PRIMARY = (30, 64, 175)
PRIMARY_DARK = (15, 31, 79)
ACCENT = (245, 158, 11)
INK = (15, 23, 42)
MUTED = (100, 116, 139)
LINE = (226, 232, 240)


def _ce(name):
    return OxmlElement(name)


def set_cell_bg(cell, hex_color):
    """设置单元格背景色"""
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = _ce('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    # 删除旧的
    for old in tc_pr.findall(qn('w:shd')):
        tc_pr.remove(old)
    tc_pr.append(shd)


def set_cell_borders(cell, color='1E40AF', size='6'):
    """设置单元格边框"""
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_borders = _ce('w:tcBorders')
    for edge in ('top', 'left', 'bottom', 'right'):
        b = _ce(f'w:{edge}')
        b.set(qn('w:val'), 'single')
        b.set(qn('w:sz'), size)
        b.set(qn('w:color'), color)
        tc_borders.append(b)
    for old in tc_pr.findall(qn('w:tcBorders')):
        tc_pr.remove(old)
    tc_pr.append(tc_borders)


def configure_styles(doc):
    """全局样式配置：正文 / 标题 / 表格"""
    styles = doc.styles

    # 默认正文 Normal：宋体小四，1.5 倍行距，首行缩进 2 字符
    normal = styles['Normal']
    normal.font.name = '宋体'
    normal.font.size = Pt(12)  # 小四
    normal.font.color.rgb = RGBColor(*INK)
    rpr = normal.element.get_or_add_rPr()
    rfonts = rpr.find(qn('w:rFonts'))
    if rfonts is None:
        rfonts = _ce('w:rFonts')
        rpr.append(rfonts)
    rfonts.set(qn('w:eastAsia'), '宋体')
    rfonts.set(qn('w:ascii'), 'Times New Roman')
    rfonts.set(qn('w:hAnsi'), 'Times New Roman')
    pf = normal.paragraph_format
    pf.line_spacing = 1.5
    pf.space_before = Pt(0)
    pf.space_after = Pt(0)

    # Heading 1：黑体二号居中，段前段后留白
    if 'Heading 1' in styles:
        h1 = styles['Heading 1']
        h1.font.name = '黑体'
        h1.font.size = Pt(22)  # 二号
        h1.font.bold = True
        h1.font.color.rgb = RGBColor(*PRIMARY_DARK)
        rpr1 = h1.element.get_or_add_rPr()
        rf1 = rpr1.find(qn('w:rFonts'))
        if rf1 is None:
            rf1 = _ce('w:rFonts')
            rpr1.append(rf1)
        rf1.set(qn('w:eastAsia'), '黑体')
        rf1.set(qn('w:ascii'), 'Times New Roman')
        rf1.set(qn('w:hAnsi'), 'Times New Roman')
        pf1 = h1.paragraph_format
        pf1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        pf1.line_spacing = 1.5
        pf1.space_before = Pt(24)
        pf1.space_after = Pt(18)
        pf1.page_break_before = False

    # Heading 2：黑体三号
    if 'Heading 2' in styles:
        h2 = styles['Heading 2']
        h2.font.name = '黑体'
        h2.font.size = Pt(16)
        h2.font.bold = True
        h2.font.color.rgb = RGBColor(*PRIMARY)
        rpr2 = h2.element.get_or_add_rPr()
        rf2 = rpr2.find(qn('w:rFonts'))
        if rf2 is None:
            rf2 = _ce('w:rFonts')
            rpr2.append(rf2)
        rf2.set(qn('w:eastAsia'), '黑体')
        rf2.set(qn('w:ascii'), 'Times New Roman')
        rf2.set(qn('w:hAnsi'), 'Times New Roman')
        pf2 = h2.paragraph_format
        pf2.alignment = WD_ALIGN_PARAGRAPH.LEFT
        pf2.line_spacing = 1.5
        pf2.space_before = Pt(18)
        pf2.space_after = Pt(10)

    # Heading 3：黑体四号
    if 'Heading 3' in styles:
        h3 = styles['Heading 3']
        h3.font.name = '黑体'
        h3.font.size = Pt(14)
        h3.font.bold = True
        h3.font.color.rgb = RGBColor(*INK)
        rpr3 = h3.element.get_or_add_rPr()
        rf3 = rpr3.find(qn('w:rFonts'))
        if rf3 is None:
            rf3 = _ce('w:rFonts')
            rpr3.append(rf3)
        rf3.set(qn('w:eastAsia'), '黑体')
        rf3.set(qn('w:ascii'), 'Times New Roman')
        rf3.set(qn('w:hAnsi'), 'Times New Roman')
        pf3 = h3.paragraph_format
        pf3.line_spacing = 1.5
        pf3.space_before = Pt(14)
        pf3.space_after = Pt(8)


def configure_page(doc, with_page_number=True, header_text=None):
    """页面设置：A4 / 上下边距 / 页眉页脚 / 页码"""
    section = doc.sections[0]
    section.page_height = Mm(297)
    section.page_width = Mm(210)
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)
    section.header_distance = Cm(1.2)
    section.footer_distance = Cm(1.2)

    # 页眉
    if header_text:
        header = section.header
        para = header.paragraphs[0]
        para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        run = para.add_run(header_text)
        run.font.name = '宋体'
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(*MUTED)
        rpr = run._element.get_or_add_rPr()
        rf = rpr.find(qn('w:rFonts'))
        if rf is None:
            rf = _ce('w:rFonts')
            rpr.append(rf)
        rf.set(qn('w:eastAsia'), '宋体')

        # 加页眉下边线
        pPr = para._p.get_or_add_pPr()
        pBdr = _ce('w:pBdr')
        bottom = _ce('w:bottom')
        bottom.set(qn('w:val'), 'single')
        bottom.set(qn('w:sz'), '6')
        bottom.set(qn('w:space'), '4')
        bottom.set(qn('w:color'), '1E40AF')
        pBdr.append(bottom)
        pPr.append(pBdr)

    # 页脚 + 页码
    if with_page_number:
        footer = section.footer
        para = footer.paragraphs[0]
        para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = para.add_run()
        # 字段：PAGE
        fldChar1 = _ce('w:fldChar')
        fldChar1.set(qn('w:fldCharType'), 'begin')
        instrText = _ce('w:instrText')
        instrText.text = 'PAGE'
        fldChar2 = _ce('w:fldChar')
        fldChar2.set(qn('w:fldCharType'), 'end')
        run._r.append(fldChar1)
        run._r.append(instrText)
        run._r.append(fldChar2)
        run.font.name = '宋体'
        run.font.size = Pt(10)
        run.font.color.rgb = RGBColor(*MUTED)


def styled_run(run, *, eastasia='宋体', ascii_font='Times New Roman',
               size=None, bold=False, italic=False, color=None):
    """为 run 应用统一字体设置（中文宋体，西文 Times New Roman）"""
    run.font.name = ascii_font
    if size:
        run.font.size = Pt(size)
    if bold:
        run.bold = True
    if italic:
        run.italic = True
    if color:
        run.font.color.rgb = RGBColor(*color)
    rpr = run._element.get_or_add_rPr()
    rf = rpr.find(qn('w:rFonts'))
    if rf is None:
        rf = _ce('w:rFonts')
        rpr.append(rf)
    rf.set(qn('w:eastAsia'), eastasia)
    rf.set(qn('w:ascii'), ascii_font)
    rf.set(qn('w:hAnsi'), ascii_font)


def style_table(table, *, header_bg='1E40AF', alt_bg='F8FAFC',
                border_color='CBD5E1', font_size=10):
    """统一表格样式：深色表头 + 隔行变色 + 细边框"""
    if len(table.rows) == 0:
        return
    # 表头
    header_cells = table.rows[0].cells
    for cell in header_cells:
        set_cell_bg(cell, header_bg)
        set_cell_borders(cell, color=border_color, size='6')
        for para in cell.paragraphs:
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for run in para.runs:
                run.bold = True
                run.font.size = Pt(font_size + 1)
                run.font.color.rgb = RGBColor(255, 255, 255)
                styled_run(run, size=font_size + 1, bold=True, color=(255, 255, 255))
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

    # 数据行
    for ri, row in enumerate(table.rows[1:], start=1):
        for cell in row.cells:
            set_cell_borders(cell, color=border_color, size='4')
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            if ri % 2 == 0:
                set_cell_bg(cell, alt_bg)
            for para in cell.paragraphs:
                for run in para.runs:
                    styled_run(run, size=font_size, color=INK)


def add_indented_para(doc, text, *, size=12, bold=False, color=None,
                      first_line_indent=True, line_spacing=1.5,
                      space_before=0, space_after=0, italic=False,
                      align=None):
    """带首行缩进的标准段落"""
    p = doc.add_paragraph()
    pf = p.paragraph_format
    if align is not None:
        p.alignment = align
    if first_line_indent:
        pf.first_line_indent = Cm(0.74)  # 2 字符
    pf.line_spacing = line_spacing
    if space_before:
        pf.space_before = Pt(space_before)
    if space_after:
        pf.space_after = Pt(space_after)
    run = p.add_run(text)
    styled_run(run, size=size, bold=bold, italic=italic, color=color)
    return p


def add_centered_caption(doc, text, *, size=10, color=MUTED):
    """图表说明：居中、灰色、斜体"""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(12)
    run = p.add_run(text)
    styled_run(run, size=size, italic=True, color=color)
    return p


def add_image(doc, img_path, caption=None, width_cm=14.5):
    """居中图 + 标题"""
    import os
    if not os.path.exists(img_path):
        return None
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run()
    run.add_picture(img_path, width=Cm(width_cm))
    if caption:
        add_centered_caption(doc, caption)


def add_toc(doc, max_level=3):
    """插入 Word 自动目录字段（打开后右键更新）"""
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.line_spacing = 1.5
    run = p.add_run()

    fldChar1 = _ce('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')
    instrText = _ce('w:instrText')
    instrText.text = f'TOC \\o "1-{max_level}" \\h \\z \\u'
    fldChar2 = _ce('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'separate')
    fldChar3 = _ce('w:t')
    fldChar3.text = '右键此处选"更新域"以生成目录'
    fldChar4 = _ce('w:fldChar')
    fldChar4.set(qn('w:fldCharType'), 'end')

    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)
    run._r.append(fldChar4)
    return p
