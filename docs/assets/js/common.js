// 公共组件：顶部导航 + 主题切换 + 返回顶部 + 长页 TOC
(function () {
  // 主线（始终显示）
  const MAIN_NAV = [
    { href: 'index.html',     label: '首页' },
    { href: 'summary.html',   label: '摘要' },
    { href: 'overview.html',  label: '一·展会发展' },
    { href: 'problems.html',  label: '二·存在问题' },
    { href: 'solutions.html', label: '三·建议方案' },
    { href: 'conclusion.html', label: '结论' }
  ];

  // 支撑（更多菜单）
  const MORE_NAV = [
    { group: '研究支撑', items: [
      { href: 'context.html',      label: '战略上下文' },
      { href: 'dashboard.html',    label: '数据看板' },
      { href: 'methodology.html',  label: '调研方法论' },
      { href: 'cases.html',        label: '标杆案例' },
      { href: 'transparency.html', label: '数据透明度' },
      { href: 'gallery.html',      label: '图表画廊' }
    ]},
    { group: '执行落地', items: [
      { href: 'roadmap.html',      label: '产品蓝图' },
      { href: 'reading-paths.html', label: '阅读路径' }
    ]},
    { group: '工具与团队', items: [
      { href: 'appendix.html',     label: '附录工具' },
      { href: 'team.html',         label: '调研团队' },
      { href: 'photos.html',       label: '现场照片' },
      { href: 'report-pdf.html',   label: 'PDF 阅读' },
      { href: 'qr.html',           label: '扫码访问' },
      { href: 'mobile.html',       label: '移动版' }
    ]},
    { group: '资料', items: [
      { href: 'references.html',   label: '参考资料' },
      { href: 'faq.html',          label: 'FAQ' }
    ]}
  ];

  const AUTO_CHARTS = {
    'dashboard.html': {
      code: 'F19',
      title: '核心 KPI 仪表盘',
      desc: '把页面索引与目标追踪放在一起，先看全局，再回正文。',
      photo: '../img/figure-48.jpg',
      photoPosition: 'center',
      intro: '数据看板不只是目录，也可以直接给出一张可交互的目标图，帮助读者把页面入口和指标追踪连起来。',
      note: '这张图适合作为总览入口，先看当前值和目标值，再回到正文页核对来源与解释。',
      cards: [
        { title: '先看结构', text: '把 20 张图分散到相关正文页后，看板只保留索引和总览。' },
        { title: '再看目标', text: '当前值与目标值并列，便于判断下一届最该追踪什么。' },
        { title: '最后回页', text: '每个指标都能追溯到对应章节，避免只看图不看语境。' }
      ]
    },
    'data.html': {
      code: 'F18',
      title: '问卷回填满意度分布',
      desc: '把数据边界、等级与回填位置放在一张图里。',
      photo: '../img/figure-47.jpg',
      photoPosition: 'center top',
      intro: '数据口径页需要更直白地告诉读者：哪些是公开事实，哪些是团队推算，哪些留给后续回填。',
      note: '先看等级分层，再看指标口径，最后看哪些位置会在正式调研后回填。',
      cards: [
        { title: '分层阅读', text: '公开数据、衍生计算、研究评价、回填口径四类信息不要混读。' },
        { title: '看回填位', text: '满意度、NPS、KPI 等指标放进回填框架，后续调研就能直接替换。' },
        { title: '看证据链', text: '每个指标都能追到来源和用途，页面才会像正式报告。' }
      ]
    },
    'download.html': {
      code: 'F6',
      title: '问题与建议映射',
      desc: '把交付物、素材包和正文逻辑串起来。',
      photo: '../img/figure-49.jpg',
      photoPosition: 'center',
      intro: '下载页不该只是文件列表，它也应该告诉读者每份素材在报告中的位置和用途。',
      note: '交付物越完整，读者越容易理解这套作品不是单页展示，而是一整套报告体系。',
      cards: [
        { title: '主报告', text: 'Word、PDF、在线版三种形态，分别对应编辑、阅读和归档。' },
        { title: '素材包', text: '图表、照片、附录工具各自独立，又能互相回到正文。' },
        { title: '使用场景', text: '答辩、海报、展板、手机扫码和后续复用都能直接接上。' }
      ]
    },
    'faq.html': {
      code: 'F14',
      title: '战略判断与方法边界',
      desc: '把大家最常问的问题直接摆出来。',
      photo: '../img/figure-46.jpg',
      photoPosition: 'center',
      intro: 'FAQ 页本身就是一张问答地图，最适合把研究边界、数据口径和复用方式讲清楚。',
      note: '先看研究边界，再看数据来源，最后看怎么复用这套方法。',
      cards: [
        { title: '研究边界', text: '把公开资料、推算判断和后续现场回收清楚分开。' },
        { title: '写法边界', text: '正文里只保留团队完成的研究和可核对的证据。' },
        { title: '复用方式', text: '问卷、访谈、观察表都可以直接迁移到别的展会项目。' }
      ]
    },
    'gallery.html': {
      code: 'F15',
      title: '同类展会对比',
      desc: '图表画廊里再补一张交互图，方便横向查看。',
      photo: '../img/figure-45.jpg',
      photoPosition: 'center',
      intro: '图表画廊负责集中下载，交互图负责补足阅读时的动态细节，两者放一起更顺手。',
      note: '静态 PNG 适合答辩插图，交互版适合查看原始关系和数据分布。',
      cards: [
        { title: '先看缩略图', text: '快速浏览 20 张图的主题，找出最关心的章节。' },
        { title: '再打开交互版', text: '交互图更适合检查数值、层级和图例。' },
        { title: '最后下载', text: '高清 PNG 适合放进 PPT、海报和打印版资料。' }
      ]
    },
    'photos.html': {
      code: 'F20',
      title: '工业文旅联动路线',
      desc: '让现场照片页也多一张能互动的路线图。',
      photo: '../img/figure-50.jpg',
      photoPosition: 'center top',
      intro: '照片页本来就负责建立真实感，补一张路线图后，城市、展馆和产业空间的关系会更清楚。',
      note: '把展馆内外的参观动线串起来，照片不只是看现场，也是在看城市叙事。',
      cards: [
        { title: '看现场', text: '先用真实照片建立展会尺度和氛围。' },
        { title: '看延伸', text: '再把工厂、高校、博物馆和城市文化空间串起来。' },
        { title: '看品牌', text: '这条路线是把展会影响力延展到城市层面的关键证据。' }
      ]
    },
    'qr.html': {
      code: 'F1',
      title: '规模演进信息图',
      desc: '扫码页先给一张最容易看懂的总览图。',
      photo: '../img/figure-01.jpg',
      photoPosition: 'center',
      intro: '扫码页承担的是入口职责，补上一张总览图，可以让二维码和报告主线更有联系。',
      note: '扫完码后的第一步，最好先看项目规模和主线，再决定从哪一页切入。',
      cards: [
        { title: '单入口', text: '一个二维码串起首页、图表、PDF 和附录工具。' },
        { title: '先总览', text: '规模演进图适合做第一眼锚点。' },
        { title: '再分流', text: '读者可按角色进入摘要、问题、建议或工具页。' }
      ]
    },
    'reading-paths.html': {
      code: 'F11',
      title: '价值主张四象限',
      desc: '不同读者有不同关注点，先分角色再分页面。',
      photo: '../img/figure-47.jpg',
      photoPosition: 'center',
      intro: '阅读路径页最适合把不同角色的关注点拆开，不同身份看同一份报告，顺序会完全不一样。',
      note: '评委看严谨性，主办方看可执行性，参展商看转化，研究者看方法。',
      cards: [
        { title: '评委', text: '先看摘要、问题、方案，再看透明度页。' },
        { title: '主办方', text: '先看建议、蓝图、案例，再看执行路径。' },
        { title: '研究者', text: '先看方法、来源、术语，再看图表和附录。' }
      ]
    },
    'references.html': {
      code: 'F15',
      title: '同类展会对比',
      desc: '参考资料页把来源、术语和标杆放在一起。',
      photo: '../img/figure-44.png',
      photoPosition: 'center',
      intro: '参考资料页不只是堆来源，它也可以直接帮助读者建立“这份报告和别的展会怎么比”的判断框架。',
      note: '对标展会、政策文件和术语表一起看，才知道每条结论从哪来。',
      cards: [
        { title: '来源', text: '公开资料、行业报告、政策文件、媒体报道分开列。' },
        { title: '对标', text: 'CIIF、CIMT、CHTF、HMI、EMO 提供横向参照。' },
        { title: '术语', text: '把专业观众、意向成交、NPS 等术语先说清楚。' }
      ]
    },
    'report-pdf.html': {
      code: 'F6',
      title: '问题与建议映射',
      desc: 'PDF 阅读页也补一张逻辑图，方便比对正文。',
      photo: '../img/figure-48.jpg',
      photoPosition: 'center',
      intro: 'PDF 适合归档，交互图适合核对细节。把两种阅读方式放在同一页里，会更像一份完整交付物。',
      note: '读 PDF 时先看结构，再看图表，最后回到在线页核对交互细节。',
      cards: [
        { title: '单本版', text: '适合投屏、打印和离线阅读。' },
        { title: '合订本', text: '适合完整归档和提交。' },
        { title: '对照读', text: '需要核图时回到在线版查看交互细节。' }
      ]
    },
    'team.html': {
      code: 'F16',
      title: '调研方法论流程',
      desc: '协作流程和方法流程放在一起，更容易看出团队分工。',
      photo: '../img/figure-46.jpg',
      photoPosition: 'center',
      intro: '团队页最适合放一张流程图，因为分工和方法本来就是这份作品能跑起来的两条线。',
      note: '分工清晰，方法才会落地；方法清晰，分工才会稳定。',
      cards: [
        { title: '统稿', text: '保证章节语气、结构和术语统一。' },
        { title: '分工', text: '章节并行推进，附录和素材同步补齐。' },
        { title: '协同', text: '最终把 Word、网站、PDF 和海报整合到同一口径。' }
      ]
    },
    'transparency.html': {
      code: 'F18',
      title: '问卷回填满意度分布',
      desc: '透明度页最适合把回填口径和当前局限说清楚。',
      photo: '../img/figure-47.jpg',
      photoPosition: 'center top',
      intro: '透明度页不是附录，而是整份报告可信度的说明书。把边界讲清楚，读者更容易信任后面的判断。',
      note: '公开数据、团队推算、回填口径和已知局限都要分别标出来。',
      cards: [
        { title: '等级', text: 'A-E 五级分类帮助读者快速判断可信度。' },
        { title: '局限', text: '哪些地方还等着真实问卷和访谈回填，要直接写出来。' },
        { title: '改进', text: '下一届如何补数据，应该单独列成行动清单。' }
      ]
    },
    'charts.html': {
      code: 'F15',
      title: '同类展会对比',
      desc: '静态图总览页也补一张交互图，方便做快速定位。',
      photo: '../img/figure-45.jpg',
      photoPosition: 'center',
      intro: '图表总览页负责把全套图谱铺开，补一张交互图后，读者能更快找到自己要看的段落。',
      note: '静态图看全景，交互图看细节，两种方式互相补位。',
      cards: [
        { title: '六类分组', text: '先看图表属于哪一类，再决定往哪一章走。' },
        { title: '快速定位', text: '交互图适合做首屏锚点。' },
        { title: '下载备用', text: '静态图依旧适合答辩和打印。' }
      ]
    }
  };

  const here = (location.pathname.split('/').pop() || 'index.html');

  function isActive(href) { return href === here; }

  function topbar() {
    const mainHtml = MAIN_NAV.map(n =>
      `<a href="${n.href}" class="${isActive(n.href) ? 'active' : ''}">${n.label}</a>`
    ).join('');

    const moreHtml = MORE_NAV.map(g => `
      <div class="nav-group">
        <div class="nav-group-title">${g.group}</div>
        ${g.items.map(i =>
          `<a href="${i.href}" class="${isActive(i.href) ? 'active' : ''}">${i.label}</a>`
        ).join('')}
      </div>
    `).join('');

    const html = `
      <div class="topbar">
        <div class="inner">
          <a class="brand" href="index.html" style="text-decoration:none;">
            <div class="logo"></div>
            <span>中国制博会调研</span>
          </a>
          <nav>
            ${mainHtml}
            <div class="nav-more-wrap">
              <button class="nav-more-btn" aria-haspopup="true" aria-expanded="false">更多 ▾</button>
              <div class="nav-more-panel">
                ${moreHtml}
              </div>
            </div>
          </nav>
          <div class="actions">
            <button id="btn-print" title="打印 / 保存PDF" aria-label="打印">🖨️</button>
            <button id="btn-theme" title="切换深色/浅色模式" aria-label="主题切换">🌓</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);

    document.getElementById('btn-print').addEventListener('click', () => window.print());
    document.getElementById('btn-theme').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hz-theme', next);
      window.dispatchEvent(new CustomEvent('hz-theme-change', { detail: next }));
    });

    // "更多"菜单的点击切换
    const moreBtn = document.querySelector('.nav-more-btn');
    const morePanel = document.querySelector('.nav-more-panel');
    if (moreBtn && morePanel) {
      moreBtn.addEventListener('click', e => {
        e.stopPropagation();
        const open = morePanel.classList.toggle('open');
        moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', () => {
        morePanel.classList.remove('open');
        moreBtn.setAttribute('aria-expanded', 'false');
      });
      morePanel.addEventListener('click', e => e.stopPropagation());
    }

    // 如果当前页在更多菜单里，把按钮也高亮
    const allMore = MORE_NAV.flatMap(g => g.items);
    if (allMore.some(i => i.href === here) && moreBtn) {
      moreBtn.classList.add('active');
    }
  }

  function footer() {
    const html = `
      <div class="footer">
        <div class="footer-brand">中国制博会调研</div>
        <div>第二十三届中国国际装备制造业博览会调研报告 · 在线版 · 2026</div>
        <div class="footer-meta">
          源代码与数据：<a href="https://github.com/2711944586/hz" target="_blank">github.com/2711944586/hz</a>
          &nbsp;·&nbsp;
          在线版：<a href="https://2711944586.github.io/hz/">2711944586.github.io/hz</a>
          &nbsp;·&nbsp;
          <a href="faq.html">FAQ</a>
          &nbsp;·&nbsp;
          <a href="reading-paths.html">阅读路径</a>
        </div>
      </div>
      <button class="to-top" id="to-top" aria-label="返回顶部">↑</button>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const btn = document.getElementById('to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btn.classList.add('show');
      else btn.classList.remove('show');
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function pageToc() {
    const sections = document.querySelectorAll('.container .section h2, .container .section h3.toc');
    if (sections.length < 4) return;
    const toc = document.createElement('aside');
    toc.className = 'page-toc';
    toc.innerHTML = '<div class="toc-title">本页目录</div>' +
      Array.from(sections).map((h, i) => {
        const id = 'toc-' + i;
        h.id = id;
        return `<a href="#${id}" data-id="${id}">${h.textContent}</a>`;
      }).join('');
    document.body.appendChild(toc);
    const links = toc.querySelectorAll('a');
    window.addEventListener('scroll', () => {
      const y = window.scrollY + 140;
      let active = null;
      sections.forEach(s => { if (s.offsetTop <= y) active = s.id; });
      links.forEach(l => l.classList.toggle('active', l.dataset.id === active));
    });
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-hz-src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === '1') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.hzSrc = src;
      script.addEventListener('load', () => {
        script.dataset.loaded = '1';
        resolve();
      }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function ensureChartKit() {
    if (!window.echarts) {
      await loadScriptOnce('assets/js/echarts.min.js?v=2026060504');
    }
    if (!window.renderChart) {
      await loadScriptOnce('assets/js/charts.js?v=2026060504');
    }
  }

  async function autoChartPanel() {
    const key = (location.pathname.split('/').pop() || 'index.html');
    const config = AUTO_CHARTS[key];
    if (!config) return;
    if (document.querySelector('[data-auto-chart-panel]')) return;
    if (document.querySelector('.chart-panel, .chart-workbench')) return;

    const container = document.querySelector('.container');
    if (!container) return;

    const section = document.createElement('section');
    section.className = 'section';
    section.setAttribute('data-auto-chart-panel', '1');
    const chartId = `auto-chart-${config.code.toLowerCase()}`;
    section.innerHTML = `
      <div class="eyebrow">Interactive Chart</div>
      <h2>${config.title}</h2>
      <p class="lede">${config.intro}</p>
      <div class="photo-strip" style="--photo-image:url('${config.photo}'); --photo-position:${config.photoPosition || 'center'}; margin-top: 26px;">
        <div>
          <h3>${config.title}</h3>
          <p>${config.note}</p>
        </div>
      </div>
      <div class="chart-panel" style="margin-top: 20px;">
        <div class="panel-head">
          <div>
            <h3>${config.title}</h3>
            <p>${config.desc}</p>
          </div>
          <span class="tag">${config.code}</span>
        </div>
        <div id="${chartId}" class="chart tall"></div>
        <div class="panel-note">${config.note}</div>
      </div>
      <div class="insight-grid" style="margin-top: 22px;">
        ${config.cards.map((card, idx) => `
          <article class="insight-card">
            <div class="kicker">Read ${String(idx + 1).padStart(2, '0')}</div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </article>
        `).join('')}
      </div>
    `;
    container.insertBefore(section, container.firstElementChild);

    try {
      await ensureChartKit();
      if (typeof window.renderChart === 'function') {
        window.renderChart(chartId, config.code);
      }
    } catch (err) {
      console.warn('[hz] auto chart failed', key, err);
    }
  }

  // 初始化主题
  const saved = localStorage.getItem('hz-theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    topbar();
    footer();
    autoChartPanel();
    pageToc();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  });
})();
