const figureGroups = [
  {
    title: "规模与结构",
    theme: "展览面积、展位配置、参展结构和展区组织",
    files: ["figure-02.png", "figure-03.png", "figure-04.png", "figure-05.png", "figure-06.png", "figure-07.png", "figure-08.png", "figure-09.png"],
    captions: ["核心规模指标总览", "展位与企业配置", "专业展区结构", "参展主体构成", "境外及合作企业占比", "产业链覆盖范围", "展区功能分布", "展会容量与承载效率"]
  },
  {
    title: "观众与采购",
    theme: "专业观众、采购商、云展触达和客群组织",
    files: ["figure-10.png", "figure-11.png", "figure-12.png", "figure-13.png", "figure-14.png", "figure-15.png", "figure-16.png"],
    captions: ["线下观众结构", "专业观众占比", "采购商组织路径", "海外采购团增长", "云展触达规模", "客群来源层级", "供需匹配转化链路"]
  },
  {
    title: "成交与转化",
    theme: "意向成交、开幕日表现、对接活动和展后转化",
    files: ["figure-17.png", "figure-18.png", "figure-19.png", "figure-20.png", "figure-21.png", "figure-22.png", "figure-23.png"],
    captions: ["累计意向成交", "开幕日成交贡献", "采购对接会贡献", "成交密度测算", "展后跟踪台账", "重点项目转化路径", "企业效果报告框架"]
  },
  {
    title: "国际化与传播",
    theme: "国际展商、境外采购、媒体传播和城市品牌",
    files: ["figure-24.png", "figure-25.png", "figure-26.png", "figure-27.png", "figure-28.png", "figure-29.png", "figure-30.png"],
    captions: ["国际资源链接", "境外展位面积占比", "国家及地区参与", "传播触点矩阵", "城市产业形象", "媒体分层触达", "工业文旅联动"]
  },
  {
    title: "问题诊断与治理",
    theme: "定位表达、服务体验、数字闭环和风险治理",
    files: ["figure-31.png", "figure-32.png", "figure-33.png", "figure-34.png", "figure-35.png", "figure-36.png", "figure-37.png"],
    captions: ["问题诊断矩阵", "专业观众组织短板", "数字服务闭环", "现场服务体验", "传播分层不足", "展后转化风险", "保障机制清单"]
  },
  {
    title: "路线图与执行",
    theme: "三届升级路线、年度传播节奏和执行矩阵",
    files: ["figure-38.png", "figure-39.png", "figure-40.png", "figure-41.png", "figure-42.png", "figure-43.png", "figure-44.png"],
    captions: ["平台定位路线", "三届升级节奏", "全年传播安排", "重点任务分解", "指标采集机制", "城市资源协同", "综合执行矩阵"]
  }
];

const photos = [
  { file: "figure-01.jpg", title: "展会现场全景", text: "用于呈现展会规模、客流密度和主视觉氛围。" },
  { file: "figure-45.jpg", title: "智能装备展区", text: "体现装备制造与智能化场景的集中展示。" },
  { file: "figure-46.jpg", title: "机器人展品", text: "对应工业自动化、机器人和解决方案导向的分析内容。" },
  { file: "figure-47.jpg", title: "专业观众交流", text: "支撑专业观众组织、采购洽谈和供需匹配部分。" },
  { file: "figure-48.jpg", title: "重点装备展示", text: "展示高端装备、关键部件和技术应用场景。" },
  { file: "figure-49.jpg", title: "展区商务洽谈", text: "对应展贸联动、活动承接和展后转化研究。" },
  { file: "figure-50.jpg", title: "现场参观动线", text: "用于观察动线组织、标识服务和现场运营体验。" }
];

function clearLegacyWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((item) => item.unregister())))
    .catch(() => {});
}

function setActive() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === here) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function renderFigureCard(file, title, index, theme) {
  return `
    <article class="card figure-card">
      <a href="assets/img/${file}" target="_blank" rel="noopener"><img src="assets/img/${file}" alt="${title}" loading="lazy"></a>
      <h3>${String(index).padStart(2, "0")} ${title}</h3>
      <p class="meta">${theme}，用于支撑报告正文分析。</p>
    </article>
  `;
}

function renderFigures() {
  const grid = document.querySelector("[data-figures]");
  if (!grid) return;
  const limit = Number(grid.dataset.limit || 0);
  const flat = figureGroups.flatMap((group) => group.files.map((file, idx) => ({
    file,
    title: group.captions[idx],
    theme: group.theme
  })));
  const list = limit ? flat.slice(0, limit) : flat;
  grid.innerHTML = list.map((item, idx) => renderFigureCard(item.file, item.title, idx + 1, item.theme)).join("");
}

function renderFigureGroups() {
  const holder = document.querySelector("[data-figure-groups]");
  if (!holder) return;
  let sequence = 1;
  holder.innerHTML = figureGroups.map((group) => {
    const cards = group.files.map((file, idx) => {
      const card = renderFigureCard(file, group.captions[idx], sequence, group.theme);
      sequence += 1;
      return card;
    }).join("");
    return `
      <section class="figure-group">
        <div class="figure-group-title">
          <div>
            <span class="pill">${group.title}</span>
            <h2>${group.title}图表</h2>
          </div>
          <p class="meta">${group.theme}</p>
        </div>
        <div class="figure-grid">${cards}</div>
      </section>
    `;
  }).join("");
}

function renderPhotos() {
  const grid = document.querySelector("[data-photos]");
  if (!grid) return;
  grid.innerHTML = photos.map((photo) => `
    <article class="card photo-card">
      <a href="assets/img/${photo.file}" target="_blank" rel="noopener"><img src="assets/img/${photo.file}" alt="${photo.title}" loading="lazy"></a>
      <h3>${photo.title}</h3>
      <p class="meta">${photo.text}</p>
    </article>
  `).join("");
}

clearLegacyWorker();
setActive();
renderFigures();
renderFigureGroups();
renderPhotos();
