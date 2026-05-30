// 公共组件：顶部导航、页脚渲染
(function () {
  const NAV = [
    { href: 'index.html', label: '首页' },
    { href: 'overview.html', label: '一·展会发展情况' },
    { href: 'problems.html', label: '二·存在问题' },
    { href: 'solutions.html', label: '三·建议方案' },
    { href: 'appendix.html', label: '附录·调研工具' }
  ];

  const here = (location.pathname.split('/').pop() || 'index.html');

  function topbar() {
    const html = `
      <div class="topbar">
        <div class="inner">
          <div class="brand">
            <div class="logo"></div>
            <span>第二十三届中国制博会调研报告</span>
          </div>
          <nav>
            ${NAV.map(n => `<a href="${n.href}" class="${n.href === here ? 'active' : ''}">${n.label}</a>`).join('')}
          </nav>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  function footer() {
    const html = `
      <div class="footer">
        <div>第二十三届中国国际装备制造业博览会调研报告 · 在线版 · 2026</div>
        <div style="margin-top:6px;">配套源代码与数据：<a href="https://github.com/2711944586/hz" target="_blank">github.com/2711944586/hz</a></div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  document.addEventListener('DOMContentLoaded', () => {
    topbar();
    footer();
  });
})();
