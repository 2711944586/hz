// 为主站及各页面生成二维码 PNG
const fs = require('fs');
const path = require('path');
const QR = require('qrcode');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'assets', 'qr');
fs.mkdirSync(OUT, { recursive: true });

const BASE = 'https://2711944586.github.io/hz/';

const pages = [
  { name: 'main',          url: BASE,                       label: '主站首页' },
  { name: 'summary',       url: BASE + 'summary.html',      label: '报告摘要' },
  { name: 'overview',      url: BASE + 'overview.html',     label: '一·展会发展' },
  { name: 'problems',      url: BASE + 'problems.html',     label: '二·存在问题' },
  { name: 'solutions',     url: BASE + 'solutions.html',    label: '三·建议方案' },
  { name: 'conclusion',    url: BASE + 'conclusion.html',   label: '结论与展望' },
  { name: 'dashboard',     url: BASE + 'dashboard.html',    label: '数据看板' },
  { name: 'methodology',   url: BASE + 'methodology.html',  label: '调研方法论' },
  { name: 'cases',         url: BASE + 'cases.html',        label: '案例库' },
  { name: 'gallery',       url: BASE + 'gallery.html',      label: '图表画廊' },
  { name: 'appendix',      url: BASE + 'appendix.html',     label: '附录工具' },
  { name: 'team',          url: BASE + 'team.html',         label: '团队介绍' },
  { name: 'references',    url: BASE + 'references.html',   label: '参考资料' },
  { name: 'mobile',        url: BASE + 'mobile.html',       label: '现场扫码版' },
  { name: 'photos',        url: BASE + 'photos.html',       label: '现场照片' },
  { name: 'transparency',  url: BASE + 'transparency.html', label: '数据透明' },
  { name: 'github',        url: 'https://github.com/2711944586/hz', label: 'GitHub 仓库' }
];

(async () => {
  for (const p of pages) {
    const file = path.join(OUT, p.name + '.png');
    await QR.toFile(file, p.url, {
      errorCorrectionLevel: 'H',
      width: 600,
      margin: 2,
      color: { dark: '#0F1F4F', light: '#FFFFFF' }
    });
    const size = fs.statSync(file).size;
    console.log(`✓ QR ${p.name.padEnd(14)} -> ${(size / 1024).toFixed(1)} KB`);
  }
  // 同时生成一份索引 json，便于网页消费
  fs.writeFileSync(
    path.join(OUT, 'index.json'),
    JSON.stringify(pages, null, 2),
    'utf8'
  );
  console.log('All QR codes saved to', OUT);
})();
