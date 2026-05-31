// 为照片墙生成高质量占位图（SVG → PNG）
// 风格：制博会主题色 + 几何机械元素 + 中英文标签
// 用 headless Chrome 渲染 SVG，导出 PNG 备用

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'assets', 'photos');
const TMP_DIR = path.join(ROOT, '.tmp_photos');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

const BROWSER_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
];
const BROWSER = BROWSER_CANDIDATES.find(p => fs.existsSync(p));

const photos = [
  // 一、展馆与入口
  { id: 'venue-exterior', label: '展馆外景', en: 'Venue Exterior', tag: '外景',
    accent: '#1E40AF', icon: 'building' },
  { id: 'venue-entrance', label: '主入口签到', en: 'Main Entrance & Check-in', tag: '入场',
    accent: '#3B82F6', icon: 'gate' },
  { id: 'venue-banner', label: '展会主视觉', en: 'Theme: Smart Equipment, New Productivity', tag: '主题',
    accent: '#0F1F4F', icon: 'banner' },

  // 二、主要展区
  { id: 'zone-machine-tool', label: '工业母机展区', en: 'Machine Tool Zone', tag: '机床',
    accent: '#1E40AF', icon: 'gear' },
  { id: 'zone-robot', label: '机器人现场演示', en: 'Robotics Live Demo', tag: '机器人',
    accent: '#F59E0B', icon: 'robot' },
  { id: 'zone-software', label: '工业互联网', en: 'Industrial Internet', tag: '智能软件',
    accent: '#8B5CF6', icon: 'circuit' },
  { id: 'zone-green', label: '绿色装备', en: 'Green & Energy-saving Equipment', tag: '绿色装备',
    accent: '#10B981', icon: 'leaf' },
  { id: 'zone-international', label: '国际展团', en: 'International Pavilion', tag: '国际',
    accent: '#06B6D4', icon: 'globe' },
  { id: 'zone-tourism', label: '工业文旅', en: 'Industrial Tourism', tag: '文旅',
    accent: '#EC4899', icon: 'star' },

  // 三、洽谈与活动
  { id: 'event-business', label: '商务洽谈区', en: 'Business Negotiation Area', tag: '洽谈',
    accent: '#1E40AF', icon: 'handshake' },
  { id: 'event-forum', label: '智能制造论坛', en: 'Smart Manufacturing Forum', tag: '论坛',
    accent: '#F59E0B', icon: 'mic' },
  { id: 'event-launch', label: '新品发布', en: 'Product Launch', tag: '发布',
    accent: '#EF4444', icon: 'rocket' },

  // 四、调研工作
  { id: 'research-observe', label: '动线观察', en: 'On-site Observation', tag: '观察',
    accent: '#3B82F6', icon: 'eye' },
  { id: 'research-survey', label: '问卷收集', en: 'Survey Collection', tag: '问卷',
    accent: '#10B981', icon: 'clipboard' },
  { id: 'research-interview', label: '展商访谈', en: 'Exhibitor Interview', tag: '访谈',
    accent: '#8B5CF6', icon: 'chat' },

  // 五、文旅延伸
  { id: 'shenyang-museum', label: '中国工业博物馆', en: 'China Industrial Museum', tag: '文化',
    accent: '#92400E', icon: 'museum' },
  { id: 'shenyang-factory', label: '沈阳机床', en: 'Shenyang Machine Tool', tag: '工厂',
    accent: '#1E40AF', icon: 'factory' },
  { id: 'shenyang-univ', label: '产学研对接', en: 'Industry-University Collaboration', tag: '高校',
    accent: '#10B981', icon: 'academy' }
];

const ICONS = {
  building: '<rect x="60" y="40" width="40" height="120" fill="rgba(255,255,255,0.18)" rx="2"/><rect x="68" y="60" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="80" y="60" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="68" y="80" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="80" y="80" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="68" y="100" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="80" y="100" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="68" y="120" width="6" height="8" fill="rgba(255,255,255,0.5)"/><rect x="80" y="120" width="6" height="8" fill="rgba(255,255,255,0.5)"/>',
  gate: '<path d="M50,160 L50,80 Q50,40 80,40 L120,40 Q150,40 150,80 L150,160" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/><rect x="60" y="100" width="80" height="60" fill="rgba(255,255,255,0.15)" rx="2"/>',
  banner: '<rect x="40" y="60" width="120" height="80" fill="rgba(255,255,255,0.2)" rx="4"/><line x1="100" y1="40" x2="100" y2="60" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>',
  gear: '<g transform="translate(100,100)"><circle r="35" fill="rgba(255,255,255,0.18)"/><circle r="14" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/><g><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(45)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(90)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(135)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(180)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(225)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(270)"/><rect x="-3" y="-46" width="6" height="14" fill="rgba(255,255,255,0.6)" transform="rotate(315)"/></g></g>',
  robot: '<rect x="70" y="55" width="60" height="50" rx="6" fill="rgba(255,255,255,0.2)"/><circle cx="85" cy="78" r="5" fill="rgba(255,255,255,0.7)"/><circle cx="115" cy="78" r="5" fill="rgba(255,255,255,0.7)"/><rect x="80" y="105" width="40" height="60" fill="rgba(255,255,255,0.18)" rx="3"/><rect x="60" y="115" width="14" height="40" fill="rgba(255,255,255,0.18)"/><rect x="126" y="115" width="14" height="40" fill="rgba(255,255,255,0.18)"/>',
  circuit: '<rect x="55" y="55" width="90" height="90" rx="6" fill="rgba(255,255,255,0.15)"/><circle cx="80" cy="80" r="4" fill="rgba(255,255,255,0.7)"/><circle cx="120" cy="80" r="4" fill="rgba(255,255,255,0.7)"/><circle cx="80" cy="120" r="4" fill="rgba(255,255,255,0.7)"/><circle cx="120" cy="120" r="4" fill="rgba(255,255,255,0.7)"/><line x1="80" y1="80" x2="120" y2="80" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><line x1="80" y1="120" x2="120" y2="120" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><line x1="80" y1="80" x2="80" y2="120" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><line x1="120" y1="80" x2="120" y2="120" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>',
  leaf: '<path d="M100,40 Q60,80 60,130 Q60,160 100,160 Q140,160 140,130 Q140,80 100,40 Z" fill="rgba(255,255,255,0.2)"/><path d="M100,40 L100,160" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><path d="M100,80 L70,110" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><path d="M100,80 L130,110" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><path d="M100,110 L75,135" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><path d="M100,110 L125,135" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>',
  globe: '<circle cx="100" cy="100" r="50" fill="rgba(255,255,255,0.18)"/><circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2"/><ellipse cx="100" cy="100" rx="50" ry="20" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/><ellipse cx="100" cy="100" rx="20" ry="50" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/><line x1="50" y1="100" x2="150" y2="100" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>',
  star: '<polygon points="100,45 113,85 155,85 122,108 134,148 100,124 66,148 78,108 45,85 87,85" fill="rgba(255,255,255,0.22)"/>',
  handshake: '<path d="M50,90 L75,80 L100,90 L125,80 L150,90 L150,120 L120,135 L100,125 L80,135 L50,120 Z" fill="rgba(255,255,255,0.2)"/><circle cx="100" cy="105" r="6" fill="rgba(255,255,255,0.65)"/>',
  mic: '<rect x="88" y="55" width="24" height="50" rx="12" fill="rgba(255,255,255,0.22)"/><path d="M70,100 Q70,130 100,130 Q130,130 130,100" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/><line x1="100" y1="130" x2="100" y2="155" stroke="rgba(255,255,255,0.6)" stroke-width="3"/><line x1="80" y1="155" x2="120" y2="155" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>',
  rocket: '<path d="M100,40 Q120,60 120,110 L120,150 L80,150 L80,110 Q80,60 100,40 Z" fill="rgba(255,255,255,0.22)"/><circle cx="100" cy="85" r="6" fill="rgba(255,255,255,0.7)"/><path d="M80,150 L60,170 L80,140 Z" fill="rgba(255,255,255,0.5)"/><path d="M120,150 L140,170 L120,140 Z" fill="rgba(255,255,255,0.5)"/>',
  eye: '<path d="M50,100 Q100,60 150,100 Q100,140 50,100 Z" fill="rgba(255,255,255,0.2)"/><circle cx="100" cy="100" r="20" fill="rgba(255,255,255,0.3)"/><circle cx="100" cy="100" r="8" fill="rgba(255,255,255,0.7)"/>',
  clipboard: '<rect x="65" y="50" width="70" height="100" rx="6" fill="rgba(255,255,255,0.2)"/><rect x="80" y="40" width="40" height="20" rx="3" fill="rgba(255,255,255,0.5)"/><line x1="78" y1="80" x2="122" y2="80" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="78" y1="100" x2="122" y2="100" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="78" y1="120" x2="115" y2="120" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>',
  chat: '<path d="M50,70 Q50,55 65,55 L135,55 Q150,55 150,70 L150,120 Q150,135 135,135 L100,135 L80,155 L80,135 L65,135 Q50,135 50,120 Z" fill="rgba(255,255,255,0.2)"/><circle cx="80" cy="95" r="4" fill="rgba(255,255,255,0.7)"/><circle cx="100" cy="95" r="4" fill="rgba(255,255,255,0.7)"/><circle cx="120" cy="95" r="4" fill="rgba(255,255,255,0.7)"/>',
  museum: '<polygon points="100,40 50,70 150,70" fill="rgba(255,255,255,0.22)"/><rect x="55" y="70" width="90" height="80" fill="rgba(255,255,255,0.18)"/><rect x="65" y="80" width="10" height="60" fill="rgba(255,255,255,0.4)"/><rect x="85" y="80" width="10" height="60" fill="rgba(255,255,255,0.4)"/><rect x="105" y="80" width="10" height="60" fill="rgba(255,255,255,0.4)"/><rect x="125" y="80" width="10" height="60" fill="rgba(255,255,255,0.4)"/><rect x="50" y="150" width="100" height="8" fill="rgba(255,255,255,0.3)"/>',
  factory: '<rect x="55" y="80" width="90" height="80" fill="rgba(255,255,255,0.18)"/><rect x="65" y="50" width="14" height="30" fill="rgba(255,255,255,0.3)"/><rect x="85" y="50" width="14" height="30" fill="rgba(255,255,255,0.3)"/><polygon points="55,80 100,60 100,80" fill="rgba(255,255,255,0.25)"/><polygon points="100,80 145,60 145,80" fill="rgba(255,255,255,0.25)"/><rect x="65" y="120" width="14" height="20" fill="rgba(255,255,255,0.4)"/><rect x="85" y="120" width="14" height="20" fill="rgba(255,255,255,0.4)"/><rect x="105" y="120" width="14" height="20" fill="rgba(255,255,255,0.4)"/><rect x="125" y="120" width="14" height="20" fill="rgba(255,255,255,0.4)"/>',
  academy: '<polygon points="100,50 50,80 100,110 150,80" fill="rgba(255,255,255,0.22)"/><polygon points="100,50 50,80 100,110 150,80" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="100" y1="110" x2="100" y2="150" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><circle cx="100" cy="150" r="4" fill="rgba(255,255,255,0.7)"/><line x1="65" y1="93" x2="65" y2="125" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/><line x1="135" y1="93" x2="135" y2="125" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>'
};

function buildSvg(p) {
  const W = 1280, H = 800;
  const accentDark = p.accent;
  const icon = ICONS[p.icon] || '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accentDark}" stop-opacity="1"/>
      <stop offset="60%" stop-color="${accentDark}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0F1F4F" stop-opacity="0.95"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
    <radialGradient id="spot" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="rgba(245,158,11,0.5)"/>
      <stop offset="100%" stop-color="rgba(245,158,11,0)"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#spot)"/>

  <!-- 大图标 -->
  <g transform="translate(${W/2 - 100},${H/2 - 200})">${icon}</g>

  <!-- 标签 -->
  <rect x="60" y="60" width="160" height="36" rx="18" fill="rgba(255,255,255,0.95)"/>
  <text x="140" y="84" text-anchor="middle"
        font-family="PingFang SC, Microsoft YaHei, sans-serif"
        font-size="16" font-weight="700" fill="${accentDark}">${p.tag}</text>

  <!-- 主标题 -->
  <text x="${W/2}" y="${H/2 + 80}" text-anchor="middle"
        font-family="PingFang SC, Microsoft YaHei, sans-serif"
        font-size="56" font-weight="800" fill="rgba(255,255,255,0.98)"
        letter-spacing="3">${p.label}</text>

  <!-- 英文副标题 -->
  <text x="${W/2}" y="${H/2 + 130}" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif"
        font-size="20" fill="rgba(255,255,255,0.7)"
        letter-spacing="2">${p.en}</text>

  <!-- 角标 -->
  <text x="${W - 60}" y="${H - 60}" text-anchor="end"
        font-family="Helvetica, sans-serif"
        font-size="14" fill="rgba(255,255,255,0.45)">CIEME · 2025 · SHENYANG</text>
  <text x="60" y="${H - 60}"
        font-family="Helvetica, sans-serif"
        font-size="14" fill="rgba(255,255,255,0.45)">PHOTO PLACEHOLDER · 待替换为现场实拍</text>

  <!-- 装饰 dots -->
  <g fill="rgba(245,158,11,0.7)">
    <circle cx="${W - 60}" cy="80" r="4"/>
    <circle cx="${W - 80}" cy="80" r="4"/>
    <circle cx="${W - 100}" cy="80" r="4"/>
  </g>
</svg>`;
}

(async () => {
  console.log('Generating', photos.length, 'placeholder photos…');
  for (const p of photos) {
    const svgPath = path.join(TMP_DIR, p.id + '.svg');
    const htmlPath = path.join(TMP_DIR, p.id + '.html');
    const pngPath = path.join(OUT_DIR, p.id + '.png');
    const svg = buildSvg(p);
    fs.writeFileSync(svgPath, svg, 'utf8');

    // 用 chrome 把 svg 渲成 png（直接把 svg 内联进 html，避免外部资源加载延迟）
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:1280px;height:800px;overflow:hidden;}svg{display:block;}</style></head><body>${svg}</body></html>`;
    fs.writeFileSync(htmlPath, html, 'utf8');

    if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
    const args = [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--virtual-time-budget=2000',
      '--window-size=1280,800',
      `--screenshot=${pngPath}`,
      `file:///${htmlPath.replace(/\\/g, '/')}`
    ];
    execSync(`"${BROWSER}" ${args.map(a => a.includes(' ') ? `"${a}"` : a).join(' ')}`, { stdio: 'pipe' });
    if (!fs.existsSync(pngPath)) {
      console.error('FAIL', p.id);
      continue;
    }
    console.log(`✓ ${p.id.padEnd(20)} -> ${(fs.statSync(pngPath).size / 1024).toFixed(1)} KB`);
  }
  // 写索引
  fs.writeFileSync(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify(photos, null, 2),
    'utf8'
  );
  console.log('Done.');
})();
