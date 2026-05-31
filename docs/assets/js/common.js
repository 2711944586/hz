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

  // 初始化主题
  const saved = localStorage.getItem('hz-theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    topbar();
    footer();
    pageToc();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  });
})();
