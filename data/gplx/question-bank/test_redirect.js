const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function getUrl(url, callback) {
  const client = url.startsWith('https') ? https : http;
  client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      let nextUrl = res.headers.location;
      if (!nextUrl.startsWith('http')) {
        const parsed = new URL(url);
        nextUrl = parsed.origin + nextUrl;
      }
      console.log('Redirecting to:', nextUrl);
      return getUrl(nextUrl, callback);
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, data));
  }).on('error', callback);
}

getUrl('https://hoatieu.vn/theo-huong-mui-ten-nhung-huong-nao-xe-gan-may-duoc-phep-di-209214', (err, html) => {
  if (err) return console.error(err);
  console.log('Final HTML length:', html.length);
  const regex = /https?:\/\/[^\s"']+\.(?:png|jpg|jpeg)/gi;
  const matches = html.match(regex) || [];
  console.log('Found media URLs:', matches.slice(0, 10));
});
