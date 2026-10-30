const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://hoatieu.vn/theo-huong-mui-ten-nhung-huong-nao-xe-gan-may-duoc-phep-di-209214';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers.location);
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    console.log('Snippet:', html.substring(0, 300));
    const regex = /<img[^>]+src="([^"]+)"/gi;
    let match;
    const imgs = [];
    while ((match = regex.exec(html)) !== null) {
      if (match[1].endsWith('.jpg') || match[1].endsWith('.png')) {
        imgs.push(match[1]);
      }
    }
    console.log('Candidate images:', imgs);
    if (imgs.length > 0) {
      const contentImg = imgs.find(u => !u.includes('logo') && !u.includes('icon')) || imgs[0];
      const imgUrl = contentImg.startsWith('http') ? contentImg : 'https://hoatieu.vn' + contentImg;
      console.log('Downloading image from:', imgUrl);
      const dest = path.join(__dirname, 'question_images', 'q507.jpg');
      const file = fs.createWriteStream(dest);
      const client = imgUrl.startsWith('https') ? require('https') : require('http');
      client.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
        r.pipe(file);
        file.on('finish', () => {
          file.close(() => console.log('Downloaded q507.jpg, size:', fs.statSync(dest).size));
        });
      });
    }
  });
}).on('error', err => console.error(err.message));
