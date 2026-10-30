const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'src', 'pages', 'TheoryReviewPage.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Replace Icons.Zap with emoji ⚡
content = content.replace(/<Icons\.Zap size=\{18\} \/>/g, '⚡');

// 2. Replace Icons.Clock with ⏱️
content = content.replace(/<Icons\.Clock size=\{18\} \/>/g, '⏱️');

// 3. Replace currentQ.answers with currentQ.options
content = content.replace(
    /currentQ\.answers\.map\(\(ans, aIdx\) => \{/g,
    'currentQ.options.map((ans: any, aIdx: number) => {'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Icons and currentQ.options in TheoryReviewPage.tsx');
