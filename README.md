# 第二十三届中国国际装备制造业博览会调研报告

本项目为公开版交付目录，包含完整报告文档、静态页面、图表图片素材与发布配置。页面内容与完整报告保持一致，可用于公开阅读和后续版本更新。

## 文件结构

| 路径 | 内容 |
|---|---|
| `第二十三届中国国际装备制造业博览会调研报告_最终版.docx` | 完整报告主文件 |
| `docs/index.html` | 首页与核心数据看板 |
| `docs/report.html` | 报告正文导读 |
| `docs/charts.html` | 图表库 |
| `docs/photos.html` | 现场图片资料 |
| `docs/data.html` | 数据口径 |
| `docs/download.html` | 完整报告获取页 |
| `docs/assets/doc/` | 页面获取用完整报告 |
| `docs/assets/img/` | 图表与现场图片素材 |
| `docs/assets/css/style.css` | 页面样式 |
| `docs/assets/js/main.js` | 图表与照片渲染脚本 |
| `.github/workflows/pages.yml` | 发布配置 |

## 本地预览

```bash
python -m http.server 8765 --directory docs
```

打开 `http://localhost:8765/` 查看页面。

## 更新流程

1. 更新根目录完整报告。
2. 将同名文档同步到 `docs/assets/doc/`。
3. 将新增图表或图片放入 `docs/assets/img/`。
4. 修改 `docs/` 下页面内容，并在 `docs/assets/js/main.js` 中同步图表或照片分组。
5. 本地预览并检查页面、图片、文档获取链接和移动端显示。
6. 提交并推送到远程仓库，由发布配置更新公开页面。

## 发布检查

```bash
python -m http.server 8765 --directory docs
```

确认页面、图片、文档获取链接、移动端显示和公开表达均无异常后再推送。
