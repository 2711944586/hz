# 第二十三届中国国际装备制造业博览会调研报告

> 全国大学生文化旅游与会展竞赛参赛作品 · 配套网站、20 张可视化图表、Word 调研报告

[![GitHub Pages](https://img.shields.io/badge/在线版-2711944586.github.io%2Fhz-blue)](https://2711944586.github.io/hz/)
[![Charts](https://img.shields.io/badge/图表-20%20张-orange)](docs/assets/img/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ 在线访问

**https://2711944586.github.io/hz/**

13 个页面构成完整闭环：

| 类别 | 页面 |
|---|---|
| 主线 | `index.html` 首页 · `summary.html` 摘要 · `overview.html` 一·展会发展 · `problems.html` 二·存在问题 · `solutions.html` 三·建议方案 · `conclusion.html` 结论 |
| 支撑 | `dashboard.html` 数据看板 · `methodology.html` 方法论 · `cases.html` 案例库 · `gallery.html` 图表画廊 · `appendix.html` 附录工具 · `team.html` 团队 · `references.html` 参考资料 |

## 🎨 网站特性

- 深色 / 浅色主题切换（顶栏右上角 🌓）
- 一键打印（顶栏右上角 🖨️）
- 长页右侧 TOC + 底部返回顶部
- 响应式布局，移动端友好
- favicon、OG meta、关键词 SEO 完整
- 附录 A 在线问卷可填写、本地保存、导出 CSV

## 📊 20 张可视化图表

| ID | 图名 | 类型 | 对应正文 |
|---|---|---|---|
| F1  | 规模演进信息图（含疫情节点） | 双轴折线 + markPoint | 第四部分 |
| F2  | 12 个专业展区构成 | 玫瑰图 | 表3 |
| F3  | 展会发展五大成效 | 横向条形 | 表4 |
| F4  | 功能阶段演进 | 阶段甘特 + 关键节点 | 第四部分 |
| F5  | 九大问题影响×紧迫性 | 背靠背条形 | 表5 |
| F6  | 问题—建议桑基图 | 桑基图 | 表6 |
| F7  | 影响×可行性矩阵 | 散点矩阵 | 第三部分 |
| F8  | 数字化三阶段闭环 | 旭日图 | 表8 |
| F9  | 五阶段实施甘特图 | 自定义甘特 | 表12 |
| F10 | 评估指标体系树 | 树图 | 表10 |
| F11 | 价值主张四象限 | 散点图 | 表7 |
| F12 | 传播渠道适配热力图 | 热力图 | 表9 |
| F13 | 沈阳产业链辐射网络 | 散点+连线动效 | 第四部分 |
| F14 | SWOT 战略分析 | graphic 四象限 | 第四部分 |
| F15 | 同类展会对比（vs CIIF/CIMT/CHTF） | 雷达图 | 第四部分 |
| F16 | 调研方法论六阶段 | 自定义流程图 | 附录D |
| F17 | 经济乘数效应分解 | 树图 | 第四部分 |
| F18 | 满意度模拟分布 | 堆叠条形 | 第四部分 |
| F19 | 核心 KPI 仪表盘 | 6 进度环 | 第四部分 |
| F20 | 沈阳工业文旅联动路线 | 散点+连线动效 | 第四部分 |

## 🗂️ 仓库结构

```
hz/
├── docs/                    ← GitHub Pages 部署目录（13 个页面）
│   ├── index.html           ← 首页
│   ├── summary.html         ← 报告摘要
│   ├── overview.html        ← 第一部分
│   ├── problems.html        ← 第二部分
│   ├── solutions.html       ← 第三部分
│   ├── conclusion.html      ← 结论与展望
│   ├── dashboard.html       ← 数据看板
│   ├── methodology.html     ← 调研方法论
│   ├── cases.html           ← 国内外案例库
│   ├── gallery.html         ← 图表画廊
│   ├── appendix.html        ← 附录调研工具
│   ├── team.html            ← 团队介绍
│   ├── references.html      ← 参考资料与术语表
│   ├── charts/chart.html    ← 单图导出页
│   ├── favicon.svg          ← 站点图标
│   └── assets/
│       ├── css/style.css    ← 浅色 + 深色 + 打印样式
│       ├── js/charts.js     ← 20 张 ECharts 配置
│       ├── js/common.js     ← 顶栏 / 主题 / TOC / 回顶
│       └── img/F*.png       ← 高清 PNG（1600×1000）
├── scripts/
│   ├── export_charts.js     ← headless Chrome 批量导出 PNG
│   └── update_docx.py       ← 把图与附录写入 docx
├── package.json
├── LICENSE
└── README.md
```

## 🛠️ 重新生成

需要 Node 16+ 与本机 Chrome 或 Edge：

```bash
npm install
npm run export       # 输出到 docs/assets/img/F*.png
```

需要 Python 3 + python-docx：

```bash
pip install python-docx
python scripts/update_docx.py
```

## 📝 配套 Word 报告

完整 Word 报告位于本工作区父目录：`第二十三届中国国际装备制造业博览会调研报告.docx`

- 456 段正文与附录文本
- 21 张数据表
- 20 张高清图表
- 三段主体 + 第四部分延伸分析 + 第五部分案例对照 + 7 个附录（A 问卷 / B 访谈 / C 观察 / D 方法论 / E 参考 / F 团队 / G 致谢）

## 👥 调研团队

| 姓名 | 分工 |
|---|---|
| 王璐 | 主理人，内容统稿、摘要、格式 |
| 宋鹏慧 | 第一部分撰写 |
| 周心杨 | 第二部分撰写 |
| 高昊宇 | 第三部分撰写 |
| 庄颂 | 附录设计与素材整理 |

详见 [团队介绍页](https://2711944586.github.io/hz/team.html)。

## 部署到 GitHub Pages

1. push 到 `2711944586/hz`
2. Settings → Pages → Source 选 `Deploy from a branch`
3. Branch 选 `main`，目录选 `/docs`
4. 等 1-2 分钟，访问 `https://2711944586.github.io/hz/`

## License

[MIT](LICENSE) · 仅用于参赛展示与学术研究。
