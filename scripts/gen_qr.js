// 生成主站二维码（单一入口，扫码后通过站内导航访问全部页面）
const fs = require('fs');
const path = require('path');
const QR = require('qrcode');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'assets', 'qr');
fs.mkdirSync(OUT, { recursive: true });

const URL = 'https://2711944586.github.io/hz/';

(async () => {
  const file = path.join(OUT, 'main.png');
  await QR.toFile(file, URL, {
    errorCorrectionLevel: 'M',  // M 级容错够用，码图更简洁好扫
    width: 800,                  // 大尺寸更清晰
    margin: 4,                   // 标准静默区 4 模块
    color: { dark: '#000000', light: '#FFFFFF' }  // 纯黑白，扫描器最友好
  });
  const size = fs.statSync(file).size;
  console.log(`✓ ${URL} -> ${file} (${(size / 1024).toFixed(1)} KB)`);
})();
