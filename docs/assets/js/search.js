// 全站搜索：基于本地索引的简单全文搜索
// 搜索数据：所有页面的标题 + 描述 + 关键词
(function () {
  const SEARCH_INDEX = [
    { title: '首页', url: 'index.html', tags: ['hero', 'kpi', '主线', '入口', '总览'], desc: '项目封面、核心数据、研究主线入口' },
    { title: '报告摘要', url: 'summary.html', tags: ['executive summary', '核心数据', '主要判断'], desc: '5 分钟读懂全报告 · 三段框架 + 调研规模' },
    { title: '一·会展发展情况', url: 'overview.html', tags: ['行业背景', '项目基础', '运行情况', '综合价值', '四股力量'], desc: '行业背景 / 项目基础 / 第二十三届运行情况 / 综合价值' },
    { title: '二·存在问题', url: 'problems.html', tags: ['9 大问题', '战略定位', '专业观众', '数字化', '展后转化'], desc: '九类结构性矛盾 + 影响×紧迫性优先级评估' },
    { title: '三·建议方案', url: 'solutions.html', tags: ['11 项建议', '北方智能制造产业链服务平台', '核心工程', '甘特图'], desc: '北方智能制造产业链服务平台定位 + 11 项建议' },
    { title: '结论与展望', url: 'conclusion.html', tags: ['调研发现', '局限', '展望'], desc: '调研发现 · 核心建议 · 局限与改进路径' },
    { title: '战略上下文', url: 'context.html', tags: ['新质生产力', '东北振兴', '沈阳产业', '政策'], desc: '把展会放回新质生产力 / 东北振兴 / 沈阳建设国家先进制造业基地' },
    { title: '数据看板', url: 'dashboard.html', tags: ['可视化', 'F1', 'F15', 'F17', 'F19', '同类对比'], desc: '7 张图汇总：规模演进 / 同类对比 / 经济乘数 / 满意度 / 文旅 / 辐射' },
    { title: '调研方法论', url: 'methodology.html', tags: ['六阶段', 'SWOT', '调研伦理', '数据分析'], desc: '六阶段方法论 + SWOT 战略分析 + 调研伦理实操' },
    { title: '标杆案例库', url: 'cases.html', tags: ['CIIF', 'CIMT', 'CHTF', 'HMI', 'EMO', '上海', '北京', '深圳'], desc: '五大国内外标杆展会做法摘录与对应建议' },
    { title: '数据透明度', url: 'transparency.html', tags: ['A-E 分级', '数据来源', '局限', '改进路径'], desc: 'A-E 五级数据分级 + 20 张图逐项说明 + 已知局限' },
    { title: '产品蓝图', url: 'roadmap.html', tags: ['18 项功能', '三条产品线', 'v1 v2 v3 版本', '执行清单'], desc: '把建议拆成 18 项可发布功能，分三届展会上线' },
    { title: '阅读路径', url: 'reading-paths.html', tags: ['评委', '主办方', '参展商', '研究者', '学生'], desc: '五类读者差异化阅读路径推荐' },
    { title: '常见问题', url: 'faq.html', tags: ['FAQ', '研究边界', '可信度', '复用', '团队'], desc: '关于本作品的 18 个常见问题' },
    { title: '图表画廊', url: 'gallery.html', tags: ['20 张图', '高清下载', 'F1-F20'], desc: '20 张可视化图表合集，可下载与交互查看' },
    { title: '附录工具', url: 'appendix.html', tags: ['问卷', '访谈', '观察', 'Likert', 'NPS'], desc: '专业观众问卷 + 参展商访谈 + 现场观察记录' },
    { title: '调研团队', url: 'team.html', tags: ['王璐', '宋鹏慧', '周心杨', '高昊宇', '庄颂', '分工'], desc: '5 位团队成员介绍与分工流程' },
    { title: '现场照片', url: 'photos.html', tags: ['展馆', '展区', '论坛', '调研', '文旅'], desc: '5 个分组 18 张照片墙' },
    { title: '参考资料', url: 'references.html', tags: ['行业报告', '政策文件', '术语表'], desc: '资料来源 5 类 + 对标展会 + 8 条术语表' },
    { title: '扫码访问', url: 'qr.html', tags: ['二维码', 'QR', '扫码'], desc: '主站二维码 + 规格说明 + 使用建议' },
    { title: 'PDF 阅读', url: 'report-pdf.html', tags: ['PDF', '调研报告', '合订本'], desc: '调研报告版 + 合订本版 PDF 在线阅读' },
    { title: '答辩海报', url: 'poster.html', tags: ['海报', 'A1', '答辩'], desc: 'A1 答辩海报，可一键打印 / 导出 PDF' },
    { title: '现场扫码版', url: 'mobile.html', tags: ['手机', '移动端', '现场'], desc: '专为手机优化的轻量页' }
  ];

  function score(item, query) {
    const q = query.toLowerCase();
    const title = item.title.toLowerCase();
    const desc = (item.desc || '').toLowerCase();
    const tags = (item.tags || []).join(' ').toLowerCase();
    if (title === q) return 100;
    if (title.startsWith(q)) return 80;
    if (title.includes(q)) return 60;
    if (tags.includes(q)) return 40;
    if (desc.includes(q)) return 20;
    return 0;
  }

  function search(query) {
    if (!query || query.length < 1) return [];
    return SEARCH_INDEX
      .map(item => ({ item, s: score(item, query) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10)
      .map(x => x.item);
  }

  function inject() {
    // 创建搜索 UI
    const html = `
      <div class="search-trigger" id="search-trigger" title="搜索 (按 / 唤起)">
        <span class="search-ico">🔍</span>
        <span class="search-key">/</span>
      </div>
      <div class="search-overlay" id="search-overlay">
        <div class="search-panel">
          <div class="search-input-wrap">
            <span class="search-prefix">🔍</span>
            <input type="text" id="search-input" placeholder="搜索页面、关键词、图表编号 (如 F5)…" autocomplete="off" />
            <button class="search-close" id="search-close" aria-label="关闭">ESC</button>
          </div>
          <div class="search-results" id="search-results"></div>
          <div class="search-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
            <span><kbd>Enter</kbd> 进入</span>
            <span><kbd>ESC</kbd> 关闭</span>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const trigger = document.getElementById('search-trigger');
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const closeBtn = document.getElementById('search-close');
    const results = document.getElementById('search-results');

    let activeIndex = -1;
    let currentResults = [];

    function open() {
      overlay.classList.add('show');
      setTimeout(() => input.focus(), 50);
      input.value = '';
      renderResults('');
    }
    function close() {
      overlay.classList.remove('show');
      input.blur();
    }

    function renderResults(query) {
      currentResults = search(query);
      activeIndex = currentResults.length > 0 ? 0 : -1;
      if (!query) {
        results.innerHTML = `
          <div class="search-empty">
            <p style="color: var(--ink-4); font-size: 13px; padding: 24px 4px;">输入页面名、关键词或图表编号开始搜索…</p>
            <div class="search-suggest">
              <div class="search-suggest-title">热门入口</div>
              ${['summary.html', 'problems.html', 'solutions.html', 'roadmap.html', 'reading-paths.html'].map(u => {
                const item = SEARCH_INDEX.find(i => i.url === u);
                return item ? `<a href="${item.url}" class="suggest-item"><b>${item.title}</b><span>${item.desc}</span></a>` : '';
              }).join('')}
            </div>
          </div>
        `;
        return;
      }
      if (currentResults.length === 0) {
        results.innerHTML = `<div class="search-empty"><p style="color: var(--ink-4); font-size: 14px; padding: 24px 4px;">没有找到与"${query}"相关的页面。试试 "建议" / "F5" / "团队" 等。</p></div>`;
        return;
      }
      results.innerHTML = currentResults.map((item, i) => `
        <a class="search-item ${i === activeIndex ? 'active' : ''}" href="${item.url}" data-idx="${i}">
          <div class="search-item-main">
            <div class="search-item-title">${item.title}</div>
            <div class="search-item-desc">${item.desc}</div>
          </div>
          <div class="search-item-url">${item.url}</div>
        </a>
      `).join('');
    }

    input.addEventListener('input', e => renderResults(e.target.value));

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
        updateActive();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActive();
      }
      if (e.key === 'Enter' && activeIndex >= 0 && currentResults[activeIndex]) {
        location.href = currentResults[activeIndex].url;
      }
    });

    function updateActive() {
      results.querySelectorAll('.search-item').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.idx) === activeIndex);
      });
      const active = results.querySelector('.search-item.active');
      if (active) active.scrollIntoView({ block: 'nearest' });
    }

    trigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    // 全局快捷键 / 唤起搜索
    document.addEventListener('keydown', e => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === '/' && !overlay.classList.contains('show')) {
        e.preventDefault();
        open();
      }
      if (e.key === 'Escape' && overlay.classList.contains('show')) {
        close();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', inject);
})();
