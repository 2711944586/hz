"""
更新调研报告 docx：
1. 删除原文件中"附录"及之后的全部内容
2. 重写附录 A/B/C，按完善方案补全所有字段，并在恰当位置插入 12 张图
3. 同时在第一/二/三部分对应位置插入相关图（F2/F3/F4 在第一部分；F5 在第二部分；F6/F7/F8/F9/F10/F11/F12 在第三部分）

策略：
- 用 python-docx 读旧文件
- 找到段落 "附录"（一级标题样式或纯文本）的位置，删除它及其后所有 paragraph
- 然后追加：在第一/二/三部分需要插入图的位置，重新 append 图（最简单方案：图全部放到附录新章节"可视化图表合集"内，正文表格保持不变）
  考虑到原文已有大量表格穿插，且修改正文风险较高，我们采用：
  正文不动，所有图集中插入到附录前的"可视化图表合集"章节，再写完善后的附录 A/B/C。
"""

import os
import shutil
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from copy import deepcopy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"D:\文件\项目\会展\第二十三届中国国际装备制造业博览会调研报告.docx"
BACKUP = r"D:\文件\项目\会展\第二十三届中国国际装备制造业博览会调研报告_原版.docx"
OUT = SRC  # 直接覆盖原文件
IMG_DIR = os.path.join(ROOT, "docs", "assets", "img")

# 1. 备份原文件
if not os.path.exists(BACKUP):
    shutil.copy(SRC, BACKUP)
    print("backup ->", BACKUP)

doc = Document(SRC)

# ---------------- 工具函数 ----------------
def find_paragraph_index(doc, predicate):
    for i, p in enumerate(doc.paragraphs):
        if predicate(p):
            return i
    return -1

def delete_paragraph(p):
    el = p._element
    el.getparent().remove(el)
    p._p = p._element = None

def add_heading(doc, text, level=1):
    # 优先用文档中已有的 Heading 样式，没有就用普通段落加粗
    try:
        h = doc.add_heading(text, level=level)
    except Exception:
        h = doc.add_paragraph()
        run = h.add_run(text)
        run.bold = True
        run.font.size = Pt(18 - level * 2)
    return h

def add_para(doc, text, bold=False, size=None, indent=False, color=None):
    p = doc.add_paragraph()
    if indent:
        p.paragraph_format.first_line_indent = Cm(0.74)  # 中文首行缩进 2 字符
    run = p.add_run(text)
    run.font.name = '宋体'
    r = run._element
    r.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    if size:
        run.font.size = Pt(size)
    if bold:
        run.bold = True
    if color:
        run.font.color.rgb = RGBColor(*color)
    return p

def add_image_with_caption(doc, img_filename, caption, width_cm=14.5):
    img_path = os.path.join(IMG_DIR, img_filename)
    if not os.path.exists(img_path):
        print("missing image:", img_path)
        return
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run()
    run.add_picture(img_path, width=Cm(width_cm))
    cap = doc.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cap_run = cap.add_run(caption)
    cap_run.font.size = Pt(9)
    cap_run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    cap_run.italic = True

def add_simple_table(doc, headers, rows, col_widths=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Light Grid Accent 1'
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = h
        for p in cell.paragraphs:
            for run in p.runs:
                run.bold = True
                run.font.size = Pt(10)
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            cell = table.rows[ri + 1].cells[ci]
            cell.text = str(val)
            for p in cell.paragraphs:
                for run in p.runs:
                    run.font.size = Pt(10)
    if col_widths:
        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = Cm(w)
    # 留一个空行
    doc.add_paragraph()
    return table


# ---------------- 第一步：找到旧"附录"位置，删除其后所有内容 ----------------
# 旧文档里"附录"是普通段落，文本就是"附录"
target_idx = -1
for i, p in enumerate(doc.paragraphs):
    if p.text.strip() == "附录":
        target_idx = i
        break

if target_idx >= 0:
    print(f"找到原'附录'位置: paragraph #{target_idx}")
    # 删除从 target_idx 开始的所有段落
    paras_to_delete = doc.paragraphs[target_idx:]
    for p in paras_to_delete:
        delete_paragraph(p)
    # 同时删除 target_idx 之后的所有表格（原 表13 现场观察记录表）
    # 注意：python-docx 的 paragraph 删除后，table 还在文档末尾
    # 我们通过 body 直接处理：删除最后一个 table（表13）
    body = doc.element.body
    tables = body.findall(qn('w:tbl'))
    if tables:
        # 表13 是最后一个表
        last_tbl = tables[-1]
        # 检查它是否是"现场观察记录表"
        last_text = ''.join(t.text for t in last_tbl.iter(qn('w:t')))
        if '观察项目' in last_text or '现场观察' in last_text or '入口与注册' in last_text:
            last_tbl.getparent().remove(last_tbl)
            print("已删除原 表13 现场观察记录表")
else:
    print("未找到原'附录'，将直接追加")


# ---------------- 第二步：插入"附录前导：可视化图表合集" ----------------
# 这一节作为新增章节，在附录之前插入

doc.add_page_break()
add_heading(doc, "图表合集", level=1)
add_para(doc,
    "本节集中呈现配合本报告调研工具与建议方案设计的 11 张可视化图表。"
    "图表与配套在线网站 https://github.com/2711944586/hz 中的展示版本同源，"
    "可点击在线版本进行交互查看，本文档中保留为静态高清版以便答辩与打印。",
    indent=True)

charts_in_chart_album = [
    ("F2.png",  "图F2  第二十三届中国制博会 12 个专业展区构成（玫瑰图）"),
    ("F3.png",  "图F3  展会发展五大成效综合评价（横向条形）"),
    ("F4.png",  "图F4  中国制博会发展阶段与关键节点（双轴时序）"),
    ("F5.png",  "图F5  九大问题影响×紧迫性优先级雷达图"),
    ("F6.png",  "图F6  问题—建议对应关系桑基图"),
    ("F7.png",  "图F7  优化建议影响×可行性四象限矩阵"),
    ("F8.png",  "图F8  数字化服务展前-展中-展后闭环模型"),
    ("F9.png",  "图F9  五阶段实施甘特图"),
    ("F10.png", "图F10 中国制博会效果评估指标体系树"),
    ("F11.png", "图F11 分对象价值主张四象限"),
    ("F12.png", "图F12 分层传播渠道—内容适配度热力矩阵"),
]
for fn, cap in charts_in_chart_album:
    add_image_with_caption(doc, fn, cap)


# ---------------- 第三步：附录 A 专业观众问卷 ----------------
doc.add_page_break()
add_heading(doc, "附录A  专业观众调查问卷", level=1)

add_para(doc,
    "本问卷服务于第二十三届中国国际装备制造业博览会专业观众满意度与需求画像调研。"
    "问卷采用现场扫码、线上云展弹窗、展后邮件三种渠道发放，预计填写时长约 5 分钟。"
    "建议有效样本不少于 300 份，按身份类型分层抽样，回收数据用于支撑正文表 5 问题诊断与表 9 评估指标体系。"
    "所有作答匿名处理，仅用于会展项目优化研究。",
    indent=True)
add_para(doc, "（在线版可直接填写并导出 CSV：https://2711944586.github.io/hz/appendix.html）",
    indent=True, size=10, color=(100, 100, 100))

# A 第一部分 基本信息
add_heading(doc, "第一部分  基本信息", level=2)
add_para(doc, "1. 您的身份类型（单选）：□采购负责人 □技术负责人 □企业管理者 □销售/渠道 □科研/高校 □学生 □其他 _______")
add_para(doc, "2. 您所在行业：□机床工具 □汽车与零部件 □能源与电力 □航空航天 □电子与半导体 □冶金/化工 □节能环保 □其他 _______")
add_para(doc, "3. 您所在企业的性质：□国企 □民企 □外企/合资 □科研院所 □高校 □其他 _______")
add_para(doc, "4. 您所在企业的规模（员工人数）：□<50 □50-300 □300-2000 □>2000")
add_para(doc, "5. 您所在的省份/城市：__________________________")

# A 第二部分 参观行为
add_heading(doc, "第二部分  参观行为", level=2)
add_para(doc, "6. 这是您第几次参观中国制博会：□首次 □第2-3次 □第4次及以上")
add_para(doc, "7. 您是通过何种渠道获知本届展会（可多选）：□行业协会/商会 □同行推荐 □行业媒体 □展会官网/微信 □短视频平台 □官方邮件邀请 □其他")
add_para(doc, "8. 您计划在本届展会停留：□半天 □1天 □2天 □3天及以上")
add_para(doc, "9. 您本次最关注的展区（可多选 ≤3 项）：□机床工具 □工业自动化/工业机器人 □通用及专用设备 □工业互联网与智能软件 □节能环保装备 □航空航天与高端装备 □汽车零部件与新能源 □基础件、材料与刀具 □检测仪器 □国际展区 □工业文旅 □产学研成果")
add_para(doc, "10. 您本次参观的主要目的（可多选）：□采购设备 □了解技术 □寻找供应商 □参加论坛 □考察市场 □学习交流 □其他")
add_para(doc, "11. 您是否计划参加同期论坛或对接活动：□是 □否")

# A 第三部分 采购与决策画像
add_heading(doc, "第三部分  采购与决策画像", level=2)
add_para(doc, "12. 您是否在本单位承担采购或选型相关职责：□是 □否")
add_para(doc, "13. 在采购决策中您的角色：□决策者 □影响者 □执行者 □信息收集者")
add_para(doc, "14. 您所在单位未来 12 个月是否有装备采购计划：□已明确预算 □正在评估 □待定 □暂无")
add_para(doc, "15. 您预计的采购预算区间（万元）：□<50 □50-200 □200-1000 □1000-5000 □>5000")
add_para(doc, "16. 您最关注的解决方案类型（可多选）：□智能产线 □工业机器人 □机床工具 □工业软件 □绿色节能装备 □检测仪器 □其他")

# A 第四部分 满意度
add_heading(doc, "第四部分  满意度评价（1=很不满意，5=很满意）", level=2)
satisfaction_items = [
    "17. 展前邀请与信息推送",
    "18. 注册流程与现场入场",
    "19. 展区导览与现场指引",
    "20. 展商质量与展品丰富度",
    "21. 专业观众密度",
    "22. 同期论坛与活动质量",
    "23. 洽谈环境与商务服务",
    "24. 餐饮、休息、交通服务",
    "25. 线上云展使用体验",
    "26. 展后跟进服务",
]
for it in satisfaction_items:
    add_para(doc, it + "    □1 □2 □3 □4 □5")

# A 第五部分 数字化服务体验
add_heading(doc, "第五部分  数字化服务体验", level=2)
add_para(doc, "27. 您是否使用过本届展会的以下数字化服务（可多选）：□线上云展 □数字导览 □预约洽谈 □电子名片 □直播观展 □均未使用")
add_para(doc, "28. 未使用数字化服务的主要原因：□不知道有此功能 □操作不便 □信息不全 □没有需要 □其他 _______")
add_para(doc, "29. 您最希望增加的数字化功能（可多选 ≤3）：□智能展商推荐 □智能路线规划 □一键预约洽谈 □展品询价 □展后线索回看 □同行交流社区 □其他 _______")

# A 第六部分 改进建议与意向
add_heading(doc, "第六部分  改进建议与意向", level=2)
add_para(doc, "30. 您认为展会最需要改进的方面（不超过 3 项）：□展商质量 □观众组织 □导览服务 □数字平台 □活动内容 □餐饮交通 □展后服务 □国际化 □其他 _______")
add_para(doc, "31. 您是否愿意推荐同行参观本届展会（NPS）：0 1 2 3 4 5 6 7 8 9 10")
add_para(doc, "32. 下一届您是否计划继续参观：□一定会 □可能会 □视情况 □不会")
add_para(doc, "33. 您对展会的开放式建议（可不填）：")
add_para(doc, "    ____________________________________________________________________")
add_para(doc, "    ____________________________________________________________________")

# 样本量与回收说明
add_heading(doc, "问卷实施说明", level=2)
add_para(doc,
    "1. 发放方式：现场扫码（出入口、洽谈区、休息区张贴问卷二维码）+ 线上云展弹窗 + 展后 7 日内邮件回收。",
    indent=True)
add_para(doc,
    "2. 样本量：建议有效样本不少于 300 份，按身份类型（采购/技术/管理/销售/科研/学生）分层抽样，确保各类身份不少于 30 份。",
    indent=True)
add_para(doc,
    "3. 数据用途：用于核算正文表 9 评估指标体系中的"
    "专业观众占比、采购决策者占比、观众满意度、复展意愿等关键指标。",
    indent=True)


# ---------------- 第四步：附录 B 参展商访谈提纲 ----------------
doc.add_page_break()
add_heading(doc, "附录B  参展商深度访谈提纲", level=1)

add_para(doc,
    "本访谈服务于参展商参展效果与复展意愿调研。采用半结构化访谈，每场访谈约 30-45 分钟，"
    "于现场展位或展后电话回访开展。建议覆盖三类企业、合计不少于 24 家：行业龙头/重点企业不少于 8 家、"
    "中小展商不少于 8 家、首次参展企业不少于 8 家。访谈过程录音并整理为结构化纪要。",
    indent=True)

add_heading(doc, "第一部分  暖场与企业基本情况", level=2)
add_para(doc, "1. 请简要介绍贵公司的主营业务、典型客户和产品矩阵。")
add_para(doc, "2. 这是贵公司第几次参加中国制博会，本届展位面积、参展人员配置如何？")
add_para(doc, "3. 本届展品的主要亮点是什么？是否有新品发布或专项展示？")

add_heading(doc, "第二部分  参展目标与预期", level=2)
add_para(doc, "4. 本届主要参展目标是什么？请按重要性排序：□品牌展示 □客户获取 □产品发布 □渠道合作 □政府/园区对接 □其他")
add_para(doc, "5. 对有效线索数量、意向成交额是否设定预期？预期值大约是多少？")
add_para(doc, "6. 与上一届相比，本届目标是否有调整？调整原因是什么？")
add_para(doc, "（追问）：上次参展未达成的目标是什么？这次是否做了针对性准备？")

add_heading(doc, "第三部分  现场效果评价", level=2)
add_para(doc, "7. 本届现场客流的数量、专业度和决策层级如何？")
add_para(doc, "8. 目标客户匹配度与洽谈深度是否符合预期？")
add_para(doc, "9. 新产品发布或现场演示的反响如何？")
add_para(doc, "10. 与往届相比，本届现场效果在哪些方面有提升、哪些方面有下降？")
add_para(doc, "（追问）：能否举一个让您印象深刻的洽谈或客户案例？")

add_heading(doc, "第四部分  主办方服务体验", level=2)
add_para(doc, "11. 招商沟通环节，最满意的一点是什么？最希望改进的一点是什么？")
add_para(doc, "12. 报名注册、布撤展环节是否顺畅？是否遇到过明显问题？")
add_para(doc, "13. 现场服务（导览、洽谈、餐饮、安保、应急）整体如何？")
add_para(doc, "14. 对宣传推广（行业媒体、新媒体、政府渠道）的评价？是否有效带来客流？")
add_para(doc, "15. 数字平台（云展、预约洽谈、电子名片、线索系统）使用感受如何？是否常用？")
add_para(doc, "16. 同期活动（论坛、发布会、对接会、考察）是否对参展效果有帮助？")

add_heading(doc, "第五部分  展后转化与复展意愿", level=2)
add_para(doc, "17. 展期内沟通的客户预计多久能转化为有效订单？转化路径大致是怎样的？")
add_para(doc, "18. 您希望主办方提供怎样的展后服务？（如线索回访、客户推荐、活动延展）")
add_para(doc, "19. 是否愿意接受主办方在展后 1 个月、3 个月、6 个月的跟踪回访？")
add_para(doc, "20. 下一届贵公司是否计划继续参展？展位面积或形式是否会调整？为什么？")

add_heading(doc, "第六部分  战略升级建议", level=2)
add_para(doc, "21. 对中国制博会战略定位的看法，是否赞同建设"
    "“北方智能制造产业链服务平台”的提法？")
add_para(doc, "22. 对国际化（国际采购团、跨境合作、英文服务）有何期待？")
add_para(doc, "23. 对产学研合作（高校观察团、青年工程师论坛、校企对接）有何建议？")
add_para(doc, "24. 对绿色低碳会展（可循环展台、电子资料、绿色展品标识）的态度与建议？")

add_heading(doc, "访谈实施要点", level=2)
add_para(doc, "1. 访谈技巧：采用 5why 追问、对比追问、举例追问，挖掘表层回答之下的真实诉求。", indent=True)
add_para(doc, "2. 记录字段：受访企业名称、受访人岗位、访谈日期与时长、关键观点、典型语句、信息可信度（高/中/低）、需复访问题。", indent=True)
add_para(doc, "3. 资料处理：访谈录音 1 周内整理为纪要，纪要结构遵循上述六个部分，重要观点摘录至引用素材库。", indent=True)


# ---------------- 第五步：附录 C 现场观察记录表 ----------------
doc.add_page_break()
add_heading(doc, "附录C  现场观察记录表", level=1)

add_para(doc,
    "本观察工具用于第三方视角下的现场动线、展商互动、服务质量与数字工具使用情况记录。"
    "建议至少 2 名观察员独立观察，覆盖 4 天展期，每天上午（09:00-12:00）与下午（13:00-17:00）"
    "各开展 1 个时段，观察方式可结合定点观察、动线巡查与跟随式观察三种。",
    indent=True)

# C-1
add_heading(doc, "表C-1  观察基本信息", level=2)
add_simple_table(doc,
    headers=["项目", "记录"],
    rows=[
        ["观察日期", "____ 年 ____ 月 ____ 日（星期 ____）"],
        ["天气", "________________"],
        ["观察员姓名", "________________"],
        ["观察时段", "□ 上午 09:00-12:00    □ 下午 13:00-17:00"],
        ["覆盖展区", "________________"],
        ["观察方式", "□ 定点    □ 动线    □ 跟随"],
    ],
    col_widths=[4, 12]
)

# C-2 现场动线
add_heading(doc, "表C-2  现场动线与人流观察", level=2)
add_simple_table(doc,
    headers=["时段", "入口排队人数", "主通道密度", "热门展区", "冷门展区", "拥堵点"],
    rows=[
        ["09:00-10:00", "", "疏/中/密", "", "", ""],
        ["10:00-11:00", "", "疏/中/密", "", "", ""],
        ["11:00-12:00", "", "疏/中/密", "", "", ""],
        ["13:00-14:00", "", "疏/中/密", "", "", ""],
        ["14:00-15:00", "", "疏/中/密", "", "", ""],
        ["15:00-16:00", "", "疏/中/密", "", "", ""],
        ["16:00-17:00", "", "疏/中/密", "", "", ""],
    ]
)

# C-3 展商互动
add_heading(doc, "表C-3  展商互动观察（抽样 30-50 个展位）", level=2)
add_simple_table(doc,
    headers=["展位编号", "展位面积", "接待人员数", "平均停留观众数", "洽谈人数", "扫码/递名片", "演示频次", "典型话术摘录"],
    rows=[
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
    ]
)

# C-4 现场服务与数字工具
add_heading(doc, "表C-4  现场服务与数字工具观察", level=2)
add_simple_table(doc,
    headers=["观察项目", "评分(1-5)", "观察记录"],
    rows=[
        ["导览牌清晰度", "", ""],
        ["咨询台响应时间(秒)", "", ""],
        ["志愿者专业度", "", ""],
        ["餐饮排队时长(分钟)", "", ""],
        ["休息区使用率", "", ""],
        ["商务洽谈区使用率", "", ""],
        ["线上云展现场看到的使用次数", "", ""],
        ["数字导览现场使用情况", "", ""],
        ["预约洽谈现场使用情况", "", ""],
        ["电子名片现场使用情况", "", ""],
        ["现场应急处置事件", "", ""],
    ],
    col_widths=[5, 3, 8]
)

# C-5 综合点评
add_heading(doc, "表C-5  观察员综合点评", level=2)
add_simple_table(doc,
    headers=["项目", "记录"],
    rows=[
        ["当日亮点 1", ""],
        ["当日亮点 2", ""],
        ["当日亮点 3", ""],
        ["当日问题 1", ""],
        ["当日问题 2", ""],
        ["当日问题 3", ""],
        ["典型场景速写（≤200 字）", ""],
        ["对下一时段观察的建议", ""],
    ],
    col_widths=[5, 11]
)

# 观察方法说明
add_heading(doc, "现场观察方法说明", level=2)
add_para(doc,
    "1. 观察员配置：建议至少 2 名独立观察员，分别承担定点观察与动线观察任务，"
    "覆盖入口、主通道、重点展区、洽谈区、休息区五类位置。",
    indent=True)
add_para(doc,
    "2. 时段选择：覆盖展期 4 天，每天上午、下午各一个时段，避免单一时点偏差。",
    indent=True)
add_para(doc,
    "3. 数据交叉：现场观察结果与附录 A 问卷数据、附录 B 访谈记录交叉核对，"
    "验证正文表 5 问题诊断的客观性。",
    indent=True)
add_para(doc,
    "4. 与正文指标对应：C-2 支撑"
    "“现场体验”问题；C-3 支撑“供需匹配”和“数字化服务”；C-4 支撑"
    "“现场服务精细化”和“数字化全流程平台”；C-5 提供典型场景素材。",
    indent=True)


# ---------------- 保存 ----------------
doc.save(OUT)
print("已保存 ->", OUT)
