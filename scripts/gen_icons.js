// 生成 PWA icons (192 / 512)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ICON_DIR = path.join(ROOT, 'docs', 'assets', 'icons');
fs.mkdirSync(ICON_DIR, { recursive: true });
const TMP = path.join(ROOT, '.tmp_icons');
fs.mkdirSync(TMP, { recursive: true });

const BROWSER = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']
                .find(p => fs.existsSync(p));

const SVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E40AF"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)"/>
  <text x="32" y="42" font-family="PingFang SC, Microsoft YaHei, sans-serif"
        font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">制</text>
</svg>`;

const sizes = [192, 512];
for (const size of sizes) {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden;}</style></head><body>${SVG(size)}</body></html>`;
  const htmlPath = path.join(TMP, `icon-${size}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  const out = path.join(ICON_DIR, `icon-${size}.png`);
  if (fs.existsSync(out)) fs.unlinkSync(out);
  const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--virtual-time-budget=2000', `--window-size=${size},${size}`,
    `--screenshot=${out}`, `file:///${htmlPath.replace(/\\/g, '/')}`];
  execSync(`"${BROWSER}" ${args.map(a => a.includes(' ') ? `"${a}"` : a).join(' ')}`, { stdio: 'pipe' });
  console.log(`✓ icon-${size}.png (${(fs.statSync(out).size/1024).toFixed(1)} KB)`);
}
