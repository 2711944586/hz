# 贡献指南

> 给团队成员、合作者或后续维护者的二次开发指南

## 一、本地环境

需要：

- Node.js 16+（用于图表导出、二维码、占位图、PWA icon 生成）
- Python 3.10+（用于 docx 处理、PDF 转换）
- 本机 Chrome 或 Edge（headless 渲染图表）
- Microsoft Word 2016+（docx → PDF）

安装依赖：

```bash
npm install
pip install python-docx docxcompose docx2pdf qrcode
```

## 二、目录约定

```
hz/
├── docs/                 ← GitHub Pages 部署源（最终用户访问）
│   ├── *.html            ← 19 个页面
│   ├── assets/           ← 静态资源
│   │   ├── css/          ← 单一 style.css
│   │   ├── js/           ← charts.js / common.js
│   │   ├── img/          ← 20 张图表 PNG（脚本生成，勿手改）
│   │   ├── qr/           ← 17 张二维码 PNG（脚本生成）
│   │   ├── photos/       ← 18 张占位图 PNG（脚本生成）
│   │   ├── icons/        ← PWA icon
│   │   ├── report.pdf
│   │   └── report-combined.pdf
│   └── ...
├── scripts/              ← 自动化脚本
│   ├── style_helper.py   ← docx 样式公共库
│   ├── update_docx.py    ← 写入调研报告
│   ├── build_combined.py ← 合订本
│   ├── export_pdf.py     ← docx → PDF
│   ├── export_charts.js  ← ECharts 渲染 PNG
│   ├── gen_qr.js         ← 二维码
│   ├── gen_photo_placeholders.js
│   ├── gen_icons.js      ← PWA icon
│   └── build_all.py      ← 一键构建
├── README.md
├── CHANGELOG.md          ← 版本变更
├── CONTRIBUTING.md       ← 本文件
└── LICENSE
```

## 三、常见任务

### 1. 修改某张图表

文件：`docs/assets/js/charts.js`

每张图都是一个 `CHART_F<n>` 工厂函数。改完后：

```bash
node scripts/export_charts.js
```

或单图重导（暂不支持，需自行修改脚本）。然后看 `docs/assets/img/F<n>.png` 是否更新。

页面会自动加载新图（浏览器缓存可能要硬刷新 Ctrl+F5）。

### 2. 修改文字内容

直接编辑对应 HTML：

| 文件 | 内容 |
|---|---|
| `docs/index.html` | 首页 hero、KPI、入口卡片 |
| `docs/summary.html` | 报告摘要 |
| `docs/overview.html` | 第一部分 |
| `docs/problems.html` | 第二部分 |
| `docs/solutions.html` | 第三部分 |
| `docs/conclusion.html` | 结论展望 |
| `docs/transparency.html` | 数据透明度 |
| 等等 | 见仓库 |

修改后**不需要构建**，直接 `git push` 就生效。

### 3. 修改 Word 报告附录

编辑 `scripts/update_docx.py`，找到 "附录 A 专业观众问卷" 附近修改后：

```bash
python scripts/update_docx.py
python scripts/build_combined.py    # 合订本同步
python scripts/export_pdf.py        # PDF 同步
```

### 4. 增加一个新页面

1. 复制 `docs/conclusion.html` 改为 `docs/yourname.html`
2. 在 `docs/assets/js/common.js` 顶部 `NAV` 数组里加一项
3. 在 `docs/sitemap.xml` 加一行
4. 在 `scripts/gen_qr.js` 的 `pages` 数组加一项（如果需要二维码）

### 5. 调整品牌色

修改 `docs/assets/css/style.css` 顶部的 CSS 变量（`--primary` / `--accent` / 等），同时修改 `docs/assets/js/charts.js` 顶部的 `PALETTE` 对象，保持一致。

### 6. 一键构建全部产物

```bash
python scripts/build_all.py
```

按顺序执行：图表 → 二维码 → 占位图 → icon → docx → 合订本 → PDF。

## 四、开发约定

- 所有用户可见文字使用中文，注释可中英混用
- 提交信息用 `type(scope): description` 格式：`feat / fix / chore / docs / style`
- 修改图表数据时同步更新 `docs/transparency.html` 的数据等级表
- 添加示例数据时**必须**在标题或副标题中标注"示例数据"

## 五、问题反馈

如发现 bug 或有改进建议，请：

1. 提 GitHub Issue：<https://github.com/2711944586/hz/issues>
2. 或在团队群里联系王璐（主理人）

---

> 本作品仅用于参赛与学术研究。如需商业使用，请先联系作者团队。
