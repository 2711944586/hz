// 使用 headless Chrome 把 12 张图渲染成 PNG
// 不需要 puppeteer，直接调用本机 Chrome 的命令行截图能力。
//
// 另外提供一个 "self-contained HTML" 模式：把 charts.js + 单图模板写成一份独立 html，
// chrome 直接打开 file:// 渲染并截图。

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'assets', 'img');
const TMP_DIR = path.join(ROOT, '.tmp_charts');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

// 找 chrome / edge
function findBrowser() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  throw new Error('未找到 Chrome 或 Edge');
}

const BROWSER = findBrowser();
console.log('Using browser:', BROWSER);

// 加载 echarts 与 charts.js 源码，内嵌到模板里
const echartsSrc = fs.readFileSync(
  path.join(ROOT, 'node_modules', 'echarts', 'dist', 'echarts.min.js'),
  'utf8'
);
const chartsSrc = fs.readFileSync(
  path.join(ROOT, 'docs', 'assets', 'js', 'charts.js'),
  'utf8'
);

const codes = ['F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

function buildHtml(code) {
  return `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"/>
<style>
  html,body{margin:0;padding:0;background:#fff;}
  #chart{width:1600px;height:1000px;}
  body{font-family:"Microsoft YaHei","PingFang SC","Source Han Sans CN",system-ui,sans-serif;}
</style>
</head><body>
<div id="chart"></div>
<script>${echartsSrc}</script>
<script>${chartsSrc}</script>
<script>
  (function(){
    const code = ${JSON.stringify(code)};
    const dom = document.getElementById('chart');
    const chart = echarts.init(dom, null, { renderer: 'canvas', devicePixelRatio: 2 });
    const opt = window.CHART_BUILDERS[code]();
    chart.setOption(opt);
    document.title = 'READY_' + code;
  })();
</script>
</body></html>`;
}

function snapshot(code) {
  const htmlPath = path.join(TMP_DIR, `${code}.html`);
  fs.writeFileSync(htmlPath, buildHtml(code), 'utf8');
  const outPath = path.join(OUT_DIR, `${code}.png`);
  if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--default-background-color=00000000',
    '--virtual-time-budget=4000',
    '--window-size=1600,1000',
    `--screenshot=${outPath}`,
    `file:///${htmlPath.replace(/\\/g, '/')}`
  ];
  const cmd = `"${BROWSER}" ${args.map(a => a.includes(' ') ? `"${a}"` : a).join(' ')}`;
  execSync(cmd, { stdio: 'inherit' });
  if (!fs.existsSync(outPath)) throw new Error('截图未生成: ' + code);
  const size = fs.statSync(outPath).size;
  console.log(`✓ ${code} -> ${outPath} (${(size/1024).toFixed(1)} KB)`);
}

(async () => {
  for (const code of codes) {
    try {
      snapshot(code);
    } catch (e) {
      console.error('FAIL', code, e.message);
    }
  }
  console.log('All done. Output dir:', OUT_DIR);
})();
