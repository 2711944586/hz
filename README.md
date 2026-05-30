# 第二十三届中国国际装备制造业博览会调研报告

> 全国大学生文化旅游与会展竞赛参赛作品 · 配套网站与可视化图表

本仓库是配套 word 调研报告的在线展示与图表生成工具。

## 在线访问

部署到 GitHub Pages 后，访问地址：

**https://2711944586.github.io/hz/**

| 页面 | 内容 |
|---|---|
| `index.html` | 项目封面 + 关键数据卡片 |
| `overview.html` | 第一部分 · 会展发展情况（含图F2/F3/F4） |
| `problems.html` | 第二部分 · 存在问题（含图F5） |
| `solutions.html` | 第三部分 · 建议方案（含图F6/F7/F8/F9/F10/F11/F12） |
| `appendix.html` | 附录 · 在线问卷 + 访谈提纲 + 观察表 + 11 张图合集 |

## 仓库结构

```
hz/
├── docs/                ← GitHub Pages 部署目录
│   ├── index.html
│   ├── overview.html
│   ├── problems.html
│   ├── solutions.html
│   ├── appendix.html
│   ├── charts/chart.html  ← 单图导出页
│   └── assets/
│       ├── css/style.css
│       ├── js/charts.js   ← 全部 11 张 ECharts 图表配置
│       ├── js/common.js   ← 公共导航/页脚
│       └── img/F*.png     ← 高清 PNG（1600×1000，供 docx 使用）
├── scripts/
│   ├── export_charts.js   ← 用 headless Chrome 导出 PNG
│   └── update_docx.py     ← 把图与完善后的附录写入 docx
├── package.json
└── README.md
```

## 重新生成图表

需要 Node 16+ 与本机已安装 Chrome 或 Edge：

```bash
npm install
npm run export
```

输出到 `docs/assets/img/F*.png`。

## 重新写入 docx 附录

需要 Python 3 + python-docx：

```bash
pip install python-docx
python scripts/update_docx.py
```

脚本会自动备份原文件为 `第二十三届中国国际装备制造业博览会调研报告_原版.docx`，然后：

1. 删除旧附录与原表 13
2. 在正文末尾追加"图表合集"章节（11 张高清 PNG）
3. 重写附录 A/B/C，按完善方案补全所有字段

## 11 张可视化图表

| 编号 | 图名 | 类型 | 对应正文 |
|---|---|---|---|
| F2  | 12 个专业展区构成 | 玫瑰图 | 表3 |
| F3  | 展会发展五大成效 | 横向条形 | 表4 |
| F4  | 展会发展时间脉络 | 双轴时序 | 二（一） |
| F5  | 九大问题优先级雷达 | 雷达图 | 表5 |
| F6  | 问题—建议对应桑基图 | 桑基图 | 表6 |
| F7  | 影响×可行性矩阵 | 散点矩阵 | 第三部分 |
| F8  | 数字化服务三阶段闭环 | 旭日图 | 表8 |
| F9  | 五阶段实施甘特图 | 甘特图 | 表12 |
| F10 | 评估指标体系树 | 树图 | 表10 |
| F11 | 分对象价值主张四象限 | 散点 | 表7 |
| F12 | 分层传播渠道矩阵 | 热力图 | 表9 |

## 部署到 GitHub Pages

1. push 本仓库到 `2711944586/hz`
2. Settings → Pages → Source 选择 `Deploy from a branch`
3. Branch 选择 `main`，目录选择 `/docs`
4. 保存后等待 1-2 分钟，访问 `https://2711944586.github.io/hz/`

## License

仅用于参赛展示与学术研究。
