"""生成合订本 docx：用 docxcompose 把封面、调研报告、扩展章节合并。
应用统一样式（与 update_docx.py 同源）。
"""

import os
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml.ns import qn
from docxcompose.composer import Composer

from style_helper import (
    configure_styles, configure_page,
    style_table, add_indented_para, add_centered_caption, add_image,
    styled_run, INK, MUTED, PRIMARY, PRIMARY_DARK, ACCENT
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"D:\文件\项目\会展\第二十三届中国国际装备制造业博览会调研报告.docx"
OUT = r"D:\文件\项目\会展\第二十三届中国制博会调研_合订本.docx"
TMP_DIR = os.path.join(ROOT, ".tmp_combined")
os.makedirs(TMP_DIR, exist_ok=True)
PREFACE = os.path.join(TMP_DIR, "preface.docx")
APPENDIX = os.path.join(TMP_DIR, "appendix.docx")
QR_DIR = os.path.join(ROOT, "docs", "assets", "qr")
IMG_DIR = os.path.join(ROOT, "docs", "assets", "img")


def make_doc(*, with_header='中国制博会调研报告 · 合订本'):
    d = Document()
    configure_styles(d)
    configure_page(d, with_page_number=True, header_text=with_header)
    return d


def H(doc, text, level=1):
    return doc.add_heading(text, level=level)


def P(doc, text, **kw):
    return add_indented_para(doc, text, **kw)


def IMG(doc, filename, caption, dir_=IMG_DIR, width_cm=14.5):
    add_image(doc, os.path.join(dir_, filename), caption, width_cm=width_cm)


def TABLE(doc, headers, rows, widths=None):
    t = doc.add_table(rows=1+len(rows), cols=len(headers))
    for i, h in enumerate(headers):
        t.rows[0].cells[i].text = h
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            t.rows[ri+1].cells[ci].text = str(val)
    if widths:
        for r in t.rows:
            for i, w in enumerate(widths):
                r.cells[i].width = Cm(w)
    style_table(t)
    doc.add_paragraph()


def PB(doc):
    p = doc.add_paragraph()
    p.add_run().add_break(WD_BREAK.PAGE)


# ============== 前言部分（封面 + 使用说明 + 在线扩展三章） ==============
preface = make_doc()

# 封面
for _ in range(3):
    preface.add_paragraph()

title_p = preface.add_paragraph()
title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
tr = title_p.add_run('第二十三届中国国际装备制造业\n博览会调研报告')
styled_run(tr, eastasia='黑体', size=28, bold=True, color=PRIMARY_DARK)

preface.add_paragraph()

sub_p = preface.add_paragraph()
sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
sr = sub_p.add_run('—— 合订本 ——')
styled_run(sr, eastasia='黑体', size=18, color=ACCENT)

preface.add_paragraph()
preface.add_paragraph()

slog = preface.add_paragraph()
slog.alignment = WD_ALIGN_PARAGRAPH.CENTER
sg = slog.add_run('从规模型展会到智能制造产业链服务平台')
styled_run(sg, size=14, italic=True, color=MUTED)

preface.add_paragraph()

kpi = preface.add_paragraph()
kpi.alignment = WD_ALIGN_PARAGRAPH.CENTER
kr = kpi.add_run('9 万㎡  ·  912 家  ·  3056 个展位  ·  15.8 亿意向成交')
styled_run(kr, size=12, bold=True, color=PRIMARY)

for _ in range(2):
    preface.add_paragraph()

main_qr = os.path.join(QR_DIR, 'main.png')
if os.path.exists(main_qr):
    qp = preface.add_paragraph()
    qp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qrun = qp.add_run()
    qrun.add_picture(main_qr, width=Cm(5))
    qcap = preface.add_paragraph()
    qcap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qc = qcap.add_run('扫码访问完整在线版')
    styled_run(qc, size=10, italic=True, color=MUTED)

preface.add_paragraph()
url = preface.add_paragraph()
url.alignment = WD_ALIGN_PARAGRAPH.CENTER
ur = url.add_run('https://2711944586.github.io/hz/')
styled_run(ur, size=11, color=PRIMARY)

for _ in range(3):
    preface.add_paragraph()

team_p = preface.add_paragraph()
team_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
tm = team_p.add_run('全国大学生文化旅游与会展竞赛参赛作品')
styled_run(tm, size=12, color=INK)

team_p2 = preface.add_paragraph()
team_p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
tm2 = team_p2.add_run('王璐 · 宋鹏慧 · 周心杨 · 高昊宇 · 庄颂')
styled_run(tm2, size=11, color=MUTED)

date_p = preface.add_paragraph()
date_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
dr = date_p.add_run('2026 年')
styled_run(dr, size=11, color=MUTED)

PB(preface)

# 使用说明
H(preface, '使用说明', level=1)

P(preface, '本合订本将“Word 调研报告”与“在线网站”两份成果合二为一，包含：')
P(preface, '· 调研报告完整正文（三段主体 + 延伸分析 + 案例对照）', first_line_indent=False)
P(preface, '· 在线扩展内容（摘要 / 结论 / 透明度声明）', first_line_indent=False)
P(preface, '· 七个附录（问卷 / 访谈 / 观察 / 方法论 / 参考 / 团队 / 致谢）', first_line_indent=False)
P(preface, '· 20 张高清可视化图表合集', first_line_indent=False)
P(preface, '· 17 个页面的二维码导航', first_line_indent=False)

H(preface, '在线版与文档版的关系', level=2)
P(preface, '两份成果同源，互为补充：')
P(preface, '· 文档版（本合订本）：适合系统阅读、答辩存档、纸质打印', first_line_indent=False)
P(preface, '· 在线版（GitHub Pages）：适合移动浏览、交互查询、扫码扩散，含可填写在线问卷', first_line_indent=False)
P(preface, '扫描封面或合订本最后一节的二维码均可在线访问。')

H(preface, '章节速查', level=2)
TABLE(preface, ['卷', '内容'], [
    ['第一卷', '在线扩展（报告摘要 / 结论展望 / 数据透明度声明）'],
    ['第二卷', '调研报告完整正文（三段 + 延伸分析 + 案例对照 + 图表 + 附录）'],
    ['第三卷', '展示资源（图表索引 + 二维码导航 + 版本记录）'],
], widths=[3, 13])

PB(preface)

# 第一卷：在线扩展
H(preface, '第一卷  在线扩展', level=1)

H(preface, '一、报告摘要', level=2)
P(preface, '本报告以第二十三届中国国际装备制造业博览会为调研对象，'
  '围绕“会展发展情况、存在问题、优化建议”三个部分系统研究，'
  '识别九类结构性问题，提出“北方智能制造产业链服务平台”的战略升级路径与十一项可执行优化建议。')

H(preface, '（一）核心数据', level=3)
TABLE(preface, ['指标', '本届数值', '说明'], [
    ['展览面积', '约 9 万平方米', '达大型专业展会规模'],
    ['展位数量', '3056 个', '分布于 12 个专业展区'],
    ['参展企业', '912 家', '海内外厂商集聚'],
    ['开幕日意向成交额', '15.8 亿元', '体现经贸撮合价值'],
    ['持续届次', '第 23 届', '从 2002 年首届至 2025 年'],
    ['项目属性', '国家级', '经国务院批准的大型经贸展览活动'],
], widths=[4, 4, 8])

H(preface, '（二）三段研究框架', level=3)
P(preface, '第一部分 · 会展发展情况：从行业背景、项目基础、第二十三届运行情况、综合价值四个维度，'
  '确认中国制博会已从规模扩张走向产业深化阶段。')
P(preface, '第二部分 · 9 大存在问题：战略定位、专业观众组织、数字化服务闭环、宣传分层、活动联动、'
  '国际化、现场服务、展后转化、高校参与。')
P(preface, '第三部分 · 11 项优化建议：明确平台定位、观众精准组织、数字化全流程、场景分区、主题活动链、'
  '现场服务专业化、分层传播、国际采购、展后转化、产教融合、绿色低碳。')

H(preface, '（三）调研规模', level=3)
TABLE(preface, ['方法', '规模', '说明'], [
    ['问卷调查', 'N ≥ 300', '33 题专业观众问卷，6 维度分层抽样'],
    ['深度访谈', '≥ 24 场', '龙头/中小/首次参展三类各 8 家'],
    ['现场观察', '4 天 × 2 段', '至少 2 名独立观察员，8 个时段'],
], widths=[3, 4, 9])

H(preface, '（四）主要判断', level=3)
P(preface, '第二十三届中国制博会在规模、参展企业、展区设置和意向成交等维度均表现稳健，'
  '展会已具备国家级专业展会的基础能力。但放在会展业从规模恢复转向质量提升、'
  '制造业向智能化与新质生产力跃迁、东北全面振兴战略持续推进的多重背景下，'
  '项目当前面临的不是“做不做大”的问题，而是“做得专不专、转化深不深、服务远不远”的问题。')
P(preface, '本报告判断，项目已走完“规模扩张”与“产业深化”两个阶段，正进入“平台升级”阶段。'
  '继续以扩展位、加论坛、增观众的旧路径推进，边际效应将明显递减。'
  '展会需要从“展示场所”升级为“产业链服务平台”——以数据撮合替代偶遇式洽谈，'
  '以精准画像替代粗放邀请，以展后跟踪替代展中冲刺。')
P(preface, '基于上述判断，本报告提出把项目重新定位为“北方智能制造产业链服务平台”，'
  '把专业观众质量、供需匹配效率、展后转化机制、数字化服务能力作为四大核心突破口，'
  '配以分层传播、国际合作、城市联动、产教融合、绿色低碳等九项支撑措施。')

PB(preface)

H(preface, '二、结论与展望', level=2)
H(preface, '（一）调研发现', level=3)
for line in [
    '1. 规模与产业基础扎实：第二十三届展会 9 万平方米、3056 个展位、912 家参展企业、'
    '开幕日 15.8 亿元意向成交，达到大型专业展会规模。',
    '2. 展区结构覆盖产业链：12 个专业展区从基础件到工业母机、机器人、自动化与智能软件，'
    '体现产业链协同能力。',
    '3. 从规模扩张到平台升级：历届演进可分为规模扩张、产业深化、平台升级三阶段，'
    '目前正进入第三阶段。',
    '4. 九类结构性问题：定位表达、专业观众、数字化、宣传分层、活动联动、国际化、现场体验、'
    '展后转化、高校参与。',
]:
    P(preface, line)

H(preface, '（二）核心建议', level=3)
P(preface, '建议把项目重新定位为“北方智能制造产业链服务平台”，分对象形成差异化价值表达，'
  '围绕专业观众精准组织、数字化全流程平台、主题活动链条、展后转化机制四大核心工程进行系统优化。'
  '同时通过分层传播体系、国际采购组织、现场服务专业化、产教融合、绿色低碳会展等措施形成完整建议矩阵。')

H(preface, '（三）对沈阳与东北振兴的意义', level=3)
P(preface, '中国制博会不只是一场展览，更是沈阳产业品牌、东北振兴战略与新质生产力政策的集中表达窗口。'
  '展会的升级与城市的产业升级、东北的振兴战略本质上是同向同行：')
P(preface, '· 对城市：通过展示先进制造、智能装备、机器人、工业互联网等内容，更新外界对沈阳的产业形象认知',
  first_line_indent=False)
P(preface, '· 对东北：作为东北最大装备制造类专业展会，是连接产业资源、招商资源和品牌资源的重要平台',
  first_line_indent=False)
P(preface, '· 对国家：作为国家级展会，承担着促进装备制造业高质量发展、产业链供应链协同的政策功能',
  first_line_indent=False)

H(preface, '（四）研究局限与展望', level=3)
for line in [
    '1. 数据局限：受限于公开资料范围，部分指标（如观众满意度、复展意愿）以示例数据呈现，'
    '待正式问卷调研完成后回填。',
    '2. 对标局限：与 CIIF/CIMT/CHTF 的对比基于综合判断，未做严格量化对比，'
    '未来可通过定量评分体系深化。',
    '3. 研究边界：本作品聚焦中国制博会本体，对会展业整体趋势、东北其他展会的横向研究待后续展开。',
]:
    P(preface, line)
P(preface, '下一阶段团队希望把真实问卷调研数据、展商访谈实录、多届对比数据纳入研究，'
  '进一步把本作品从“基于公开资料的调研报告”升级为“持续跟踪的会展项目研究”。')

PB(preface)

H(preface, '三、数据透明度声明', level=2)
P(preface, '为方便评委与读者判断本作品研究结论的可信度，本节明确说明各类数据的来源、加工方式与已知局限。'
  '原则：能引就引、能算就算、不可知即不臆断。')

H(preface, '（一）数据来源分级', level=3)
TABLE(preface, ['等级', '说明', '本报告占比', '处理方式'], [
    ['A · 官方数据', '展会主办方、政府主管部门、官方媒体公开发布的数据', '约 35%', '直接引用'],
    ['B · 行业报告', '中国贸促会、中国会展经济研究会等行业机构公开报告', '约 20%', '注明来源后引用'],
    ['C · 媒体报道', '主流媒体报道', '约 15%', '多源交叉验证后引用'],
    ['D · 团队推算', '基于公开信息和行业一般规律的推算估算', '约 20%', '明确标注“基于…推算”'],
    ['E · 示例数据', '用于展示数据呈现方式的示例数据', '约 10%', '明确标注“示例数据”'],
], widths=[3, 6, 2.5, 4.5])

H(preface, '（二）20 张图表数据来源逐项说明', level=3)
TABLE(preface, ['图', '名称', '等级', '说明'], [
    ['F1', '规模演进', 'A', '历届公开数据汇总，含 2020 疫情节点说明'],
    ['F2', '展区构成', 'D', '基于产业链结构推算，最终以官方为准'],
    ['F3', '发展成效评分', 'D', '5 维度综合评分，基于公开资料判断'],
    ['F4', '功能阶段演进', 'B', '三阶段划分基于会展业发展规律'],
    ['F5', '问题优先级', 'D', '基于第二部分诊断的影响×紧迫性评估'],
    ['F6', '问题—建议桑基', 'A', '结构性映射，逻辑严谨'],
    ['F7', '影响×可行性矩阵', 'D', '团队对 11 项建议的相对评估'],
    ['F8', '数字化闭环', 'A', '结构性框架'],
    ['F9', '实施甘特图', 'A', '基于会展项目筹办周期的标准建议'],
    ['F10', '评估指标体系', 'A', '结构性框架'],
    ['F11', '价值主张四象限', 'D', '团队基于五类对象的需求强度判断'],
    ['F12', '传播渠道矩阵', 'D', '渠道适配度的相对判断'],
    ['F13', '产业链辐射网络', 'A', '城市坐标真实，参展占比为示意'],
    ['F14', 'SWOT 分析', 'B', '基于公开资料归纳判断'],
    ['F15', '同类展会对比', 'D', '8 维度综合判断，非精确测量'],
    ['F16', '方法论流程', 'A', '研究方法说明'],
    ['F17', '经济乘数效应', 'B', '基于会展经济文献的相对单位'],
    ['F18', '满意度模拟', 'E', '示例数据，待问卷调研后回填'],
    ['F19', 'KPI 仪表盘', 'E', '当前值为示例，目标值为团队建议'],
    ['F20', '工业文旅路线', 'A', '沈阳真实场所与制博会主会场连线'],
], widths=[1.5, 4, 1.5, 9])

H(preface, '（三）已知局限与改进路径', level=3)
for line in [
    '1. 问卷调研未实施：附录 A 已设计完成，正式调研需配合下届展会现场开展，'
    '本次报告中涉及满意度等指标使用示例数据。',
    '2. 访谈数据有限：附录 B 提纲已完成，正式访谈需配合现场开展。',
    '3. 对标对比为综合判断：与五个标杆展会的对比以八维相对评分呈现，非精确量化测量。',
    '4. 城市辐射图为示意：图F13 城市坐标真实，但各城市参展占比为示意。',
    '5. 经济乘数为相对单位：图F17 基于会展经济文献的一般倍数估算。',
    '6. 现场照片占位：本作品照片墙采用 18 张定制主题占位图（与作品视觉风格统一），'
    '团队赴展期间将拍摄真实照片替换。',
]:
    P(preface, line)

H(preface, '（四）改进方向', level=3)
P(preface, '下一阶段团队将重点从以下方面提升数据可信度：')
for line in [
    '· 正式赴展开展问卷调研，回收 N≥300 份，替换 F18 与 F19 示例数据',
    '· 完成 ≥24 场展商访谈，将访谈结论纳入 F5 影响—紧迫性评估的修正',
    '· 申请展会方公开来源地分布数据，用真实数据替换 F13 的城市辐射示意',
    '· 引入第三方调研机构数据（如沈阳市统计局、辽宁省商务厅）佐证经济乘数',
    '· 开展多届对比，把第 21、22、23 届的关键指标进行连续追踪',
]:
    P(preface, line, first_line_indent=False)

PB(preface)

H(preface, '第二卷  调研报告完整正文', level=1)
P(preface, '以下为调研报告完整正文，包括摘要、目录、第一部分、第二部分、第三部分、'
  '第四部分延伸分析、第五部分案例对照、图表合集与七个附录。'
  '完整内容来自配套 word 调研报告。')

preface.save(PREFACE)
print(f'preface saved -> {PREFACE}')


# ============== 附加部分（图表索引 + 二维码导航 + 版本记录） ==============
appx = make_doc()

H(appx, '第三卷  展示资源', level=1)

H(appx, '一、20 张可视化图表索引', level=2)
P(appx, '本作品共配套 20 张高清可视化图表（1600×1000 PNG），完整版已嵌入第二卷“图表合集”章节。'
  '本节作为速查索引：')

charts_index = [
    ('F1',  '规模演进信息图（含疫情节点）', '双轴折线 + markPoint', '第四部分'),
    ('F2',  '12 个专业展区构成', '玫瑰图', '表 3'),
    ('F3',  '展会发展五大成效', '横向条形', '表 4'),
    ('F4',  '功能阶段演进', '阶段甘特 + 关键节点', '第四部分'),
    ('F5',  '九大问题影响×紧迫性', '背靠背条形', '表 5'),
    ('F6',  '问题—建议桑基图', '桑基图', '表 6'),
    ('F7',  '影响×可行性矩阵', '散点矩阵', '第三部分'),
    ('F8',  '数字化三阶段闭环', '旭日图', '表 8'),
    ('F9',  '五阶段实施甘特图', '自定义甘特', '表 12'),
    ('F10', '评估指标体系树', '树图', '表 10'),
    ('F11', '价值主张四象限', '散点图', '表 7'),
    ('F12', '传播渠道适配热力图', '热力图', '表 9'),
    ('F13', '沈阳产业链辐射网络', '散点 + 连线动效', '第四部分'),
    ('F14', 'SWOT 战略分析', 'graphic 四象限', '第四部分'),
    ('F15', '同类展会对比', '雷达图', '第四部分'),
    ('F16', '调研方法论六阶段', '流程图', '附录 D'),
    ('F17', '经济乘数效应分解', '树图', '第四部分'),
    ('F18', '满意度模拟分布', '堆叠条形', '第四部分'),
    ('F19', '核心 KPI 仪表盘', '6 进度环', '第四部分'),
    ('F20', '工业文旅联动路线', '散点 + 连线动效', '第四部分'),
]
TABLE(appx, ['图号', '图名', '类型', '对应正文'], charts_index, widths=[1.5, 7, 4, 3.5])

PB(appx)

H(appx, '二、扫码访问', level=2)
P(appx, '本作品采用单一主二维码入口设计。扫码后进入主站首页，'
  '通过页面顶部导航或卡片入口可一键跳转到全部 20 个页面（摘要 / 三段主体 / 数据看板 / '
  '方法论 / 案例库 / 图表画廊 / 附录工具 / 团队 / 数据透明度 / PDF / 现场扫码版等）。'
  '相比多二维码方案，单一入口更便于在海报、展板、胸卡、PPT 等场景印制使用，扫一次即可。')

# 居中放大主二维码
main_qr_path = os.path.join(QR_DIR, 'main.png')
if os.path.exists(main_qr_path):
    qp = appx.add_paragraph()
    qp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qrun = qp.add_run()
    qrun.add_picture(main_qr_path, width=Cm(7))
    cap = appx.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cr = cap.add_run('主站二维码  ·  https://2711944586.github.io/hz/')
    styled_run(cr, size=11, italic=True, color=MUTED)

P(appx, '二维码规格：800×800 像素 / 纯黑白 / M 级纠错 / 4 模块静默区，适配主流扫描器。'
  '建议打印尺寸不小于 25mm × 25mm，30cm 内可识别。')

PB(appx)

H(appx, '三、答辩海报与展示资源', level=2)
P(appx, '本作品同时设计了 A1 答辩海报与现场扫码版页面，资源清单如下：')
TABLE(appx, ['资源', '尺寸', '用途', '路径'], [
    ['答辩海报', '1200×1697 px (A1)', '现场展示、可打印', 'docs/poster.html'],
    ['现场扫码版', '响应式手机页', '现场观众扫码访问', 'docs/mobile.html'],
    ['图表 PNG', '1600×1000 px', '答辩、报告插图', 'docs/assets/img/F*.png'],
    ['二维码 PNG', '800×800 px', '海报、展板、胸卡', 'docs/assets/qr/main.png'],
    ['favicon', 'SVG', '浏览器图标', 'docs/favicon.svg'],
    ['完整 PDF', '约 2 MB', '存档、阅读', 'docs/assets/report.pdf'],
], widths=[3, 4, 4.5, 4.5])

H(appx, '版本记录', level=2)
TABLE(appx, ['版本', '更新内容'], [
    ['v0.1', '初稿：三段调研报告框架完成'],
    ['v0.5', '附录 ABC 完善 + 11 张可视化图表 + 配套网站 5 个页面'],
    ['v1.0', '扩展至 20 张图表 + 9 个网页 + 第四部分延伸分析 + 第五部分案例对照'],
    ['v1.5', '审计升级：图表重做 + 深色模式 + 打印样式 + 数据透明度页 + 团队介绍页'],
    ['v2.0', '二维码 ×17 + A1 海报 + 现场扫码版 + 照片墙 + 透明度 + 合订本 + PDF 导出'],
    ['v2.5', '18 张定制占位图 + PWA + sitemap + robots + 详细 README'],
    ['v3.0', '统一排版样式：标题 / 正文 / 表格 / 页眉页脚 / 页码全面规范化'],
], widths=[2.5, 13.5])

P(appx, '在线版与文档版同步更新，所有变更可在 GitHub 仓库 https://github.com/2711944586/hz '
  '的提交历史中查看。')

PB(appx)

H(appx, '尾页', level=1)
P(appx, '本作品至此结束。')
P(appx, '感谢全国大学生文化旅游与会展竞赛组委会提供的展示平台，'
  '感谢中国制博会主办方公开资料的支持，感谢院校相关教师在选题与方法上的指导。')
P(appx, '本作品所有数据均基于公开资料整理与调研判断，结论仅代表作者团队的研究观点。')

appx.add_paragraph()
appx.add_paragraph()
if os.path.exists(main_qr):
    qp = appx.add_paragraph()
    qp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qrun = qp.add_run()
    qrun.add_picture(main_qr, width=Cm(4))
    qcap = appx.add_paragraph()
    qcap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qc = qcap.add_run('扫码访问完整在线版 · https://2711944586.github.io/hz/')
    styled_run(qc, size=10, italic=True, color=MUTED)

appx.save(APPENDIX)
print(f'appendix saved -> {APPENDIX}')


# ============== 用 docxcompose 合并 ==============
master = Document(PREFACE)
composer = Composer(master)
composer.append(Document(SRC))
composer.append(Document(APPENDIX))
composer.save(OUT)

# 清理
import shutil as _shutil
_shutil.rmtree(TMP_DIR, ignore_errors=True)

# 统计
out_doc = Document(OUT)
print(f'\n✅ 合订本生成完毕：{OUT}')
print(f'   段落: {len(out_doc.paragraphs)}')
print(f'   表格: {len(out_doc.tables)}')
print(f'   图片: {sum(1 for r in out_doc.part.rels.values() if "image" in r.target_ref)}')
print(f'   大小: {os.path.getsize(OUT)/1024/1024:.2f} MB')
