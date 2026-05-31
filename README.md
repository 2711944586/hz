# 第二十三届中国国际装备制造业博览会调研报告

> 全国大学生文化旅游与会展竞赛参赛作品 · 数字化呈现版

[![GitHub Pages](https://img.shields.io/badge/在线版-2711944586.github.io%2Fhz-1E40AF?logo=github)](https://2711944586.github.io/hz/)
[![Pages](https://img.shields.io/badge/网页-20_个-3B82F6)](docs/)
[![Charts](https://img.shields.io/badge/图表-20_张-F59E0B)](docs/assets/img/)
[![QR](https://img.shields.io/badge/二维码-17_张-10B981)](docs/assets/qr/)
[![PDF](https://img.shields.io/badge/PDF-2_份-EC4899)](docs/assets/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 在线访问

🌐 **<https://2711944586.github.io/hz/>**

扫码查看：

<img src="docs/assets/qr/main.png" width="180" alt="主站二维码" />

---

## 作品概览

本作品研究对象是 **2025 年沈阳举办的第二十三届中国国际装备制造业博览会（中国制博会）**，从会展发展情况、存在问题、优化建议三个部分展开调研。

围绕一份调研报告，构建了完整的数字化作品体系：

| 形态 | 内容 |
|---|---|
| **Word 调研报告** | 含正式封面 + 自动目录 + 三段主体 + 第四部分延伸分析 + 第五部分案例对照 + 七个附录 |
| **GitHub Pages 在线版** | 20 个页面 / 深色模式 / PWA / 在线问卷 / 移动端优化 |
| **合订本** | 把调研报告与在线扩展整合的提交版（约 75 页） |
| **PDF** | 调研报告 PDF（≈60 页）+ 合订本 PDF（≈75 页） |
| **A1 答辩海报** | 1200×1697 px 答辩海报，可一键导出 PDF |
| **17 张二维码** | 覆盖所有页面，海报 / 展板 / 胸卡场景一键复用 |
| **18 张定制占位图** | 与作品视觉一致的现场照片占位图，便于团队赴展后无缝替换 |

---

## 研究主线

```
摘要
├── 一、会展发展情况：行业背景 / 项目基础 / 第二十三届运行情况 / 综合价值
├── 二、存在问题：9 类结构性矛盾，配影响 × 紧迫性优先级评估
├── 三、建议方案：以"北方智能制造产业链服务平台"为定位 + 11 项优化建议
├── 四、延伸分析：8 个专题（历届演进 / 同类对比 / SWOT / 经济乘数 / 文旅联动 / 产业链辐射 / KPI / 满意度）
├── 五、标杆案例对照：CIIF / CIMT / CHTF / HMI / EMO 五大案例
└── 附录 A-G：问卷 / 访谈 / 观察 / 方法论 / 参考资料 / 团队 / 致谢
```

完整 20 张可视化图表见 [图表画廊](https://2711944586.github.io/hz/gallery.html)，详细资料分级与局限说明见 [数据透明度](https://2711944586.github.io/hz/transparency.html)。

---

## 网站特性

- 🎨 **统一品牌色**：沈阳工业蓝 + 高亮橙
- 🌓 **深色模式**：顶栏一键切换，自动持久化
- 📱 **PWA**：可安装到手机主屏，service worker 离线缓存
- 🖨️ **打印样式**：所有页面适配 @media print
- 📑 **页内 TOC**：长页右侧自动生成目录
- 🏷️ **17 张二维码**：H 级容错，遮挡 30% 仍可识读
- 📝 **在线问卷**：附录 A 可现场填写，本地保存 + 导出 CSV

---

## 团队

| 姓名 | 分工 |
|---|---|
| 王璐 | 主理人 · 内容统稿 |
| 宋鹏慧 | 第一部分撰写 |
| 周心杨 | 第二部分撰写 |
| 高昊宇 | 第三部分撰写 |
| 庄颂 | 附录设计与素材整理 |

---

## 快速开始

### 在线浏览

直接访问 <https://2711944586.github.io/hz/>。

### 本地运行

```bash
git clone https://github.com/2711944586/hz.git
cd hz
python -m http.server 8765 --directory docs
# 浏览器打开 http://localhost:8765/
```

### 重新构建全部产物

需要 Node 16+、Python 3.10+、本机 Chrome、Microsoft Word：

```bash
npm install
pip install python-docx docxcompose docx2pdf qrcode
python scripts/build_all.py     # 一键构建：图表 + QR + 占位图 + icon + docx + 合订本 + PDF
```

二次开发请参考 [CONTRIBUTING.md](CONTRIBUTING.md)，完整迭代历史见 [CHANGELOG.md](CHANGELOG.md)。

---

## 部署到 GitHub Pages

1. push 到 `2711944586/hz`
2. Settings → Pages → Source 选 `Deploy from a branch`
3. Branch 选 `main`，目录选 `/docs`
4. 等 1-2 分钟，访问 `https://2711944586.github.io/hz/`

---

## License

[MIT](LICENSE) · 仅用于参赛展示与学术研究。

本作品所有数据均基于公开资料整理与调研判断，结论仅代表作者团队的研究观点。

## 致谢

感谢全国大学生文化旅游与会展竞赛组委会提供的展示平台，感谢中国制博会主办方公开资料的支持，感谢相关院校教师在选题与方法上的指导。
