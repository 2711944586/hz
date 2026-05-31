// 公共组件：顶部导航 + 主题切换 + 返回顶部 + 长页 TOC
(function () {
  const NAV = [
    { href: 'index.html', label: '首页' },
    { href: 'summary.html', label: '摘要' },
    { href: 'overview.html', label: '一·展会发展' },
    { href: 'problems.html', label: '二·存在问题' },
    { href: 'solutions.html', label: '三·建议方案' },
    { href: 'cases.html', label: '案例库' },
    { href: 'dashboard.html', label: '数据看板' },
    { href: 'methodology.html', label: '方法论' },
    { href: 'gallery.html', label: '图表画廊' },
    { href: 'appendix.html', label: '附录工具' },
    { href: 'team.html', label: '团队' },
    { href: 'conclusion.html', label: '结论' },
    { href: 'references.html', label: '参考' }
  ];

  const here = (location.pathname.split('/').pop() || 'index.html');

  function topbar() {
    const html = `
      <div class="topbar">
        <div class="inner">
          <div class="brand">
            <div class="logo"></div>
            <span>中国制博会调研</span>
          </div>
          <nav>
            ${NAV.map(n => `<a href="${n.href}" class="${n.href === here ? 'active' : ''}">${n.label}</a>`).join('')}
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
      // 通知图表重绘
      window.dispatchEvent(new CustomEvent('hz-theme-change', { detail: next }));
    });
  }

  function footer() {
    const html = `
      <div class="footer">
        <div>第二十三届中国国际装备制造业博览会调研报告 · 在线版 · 2026</div>
        <div style="margin-top:6px;">
          源代码与数据：<a href="https://github.com/2711944586/hz" target="_blank">github.com/2711944586/hz</a>
          · 在线版：<a href="https://2711944586.github.io/hz/">2711944586.github.io/hz</a>
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

  // 长页 TOC：自动收集页面 .section h2 / .section h3 生成右侧目录
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
    // 滚动同步高亮
    const links = toc.querySelectorAll('a');
    window.addEventListener('scroll', () => {
      const y = window.scrollY + 140;
      let active = null;
      sections.forEach(s => {
        if (s.offsetTop <= y) active = s.id;
      });
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
  });
})();
