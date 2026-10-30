const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://chogia.vn/theo-huong-mui-ten-nhung-huong-nao-xe-gan-may-duoc-phep-di-cau-507-600-cau-hoi-thi-bang-lai-xe-b2-a4290.html';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const imgs = [];
    while ((match = regex.exec(html)) !== null) {
      if (match[1].includes('507') || match[1].includes('upload') || match[1].includes('cau-hoi')) {
        imgs.push(match[1]);
      }
    }
    console.log('Chogia images:', imgs);
    if (imgs.length > 0) {
      const imgUrl = imgs[0].startsWith('http') ? imgs[0] : 'https://chogia.vn' + imgs[0];
      const dest = path.join(__dirname, 'question_images', 'q507.jpg');
      const file = fs.createWriteStream(dest);
      https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
        r.pipe(file);
        file.on('finish', () => file.close(() => console.log('Downloaded q507.jpg from chogia, size:', fs.statSync(dest).size)));
      });
    }
  });
}).on('error', err => console.error(err.message));
