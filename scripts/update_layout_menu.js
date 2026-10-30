const fs = require('fs');
const path = require('path');

const layoutFile = path.join(__dirname, '..', 'frontend', 'src', 'layouts', 'MainLayout.tsx');
let content = fs.readFileSync(layoutFile, 'utf8');

// 1. Replace nav link
const oldNavBlock = `<Link
                    to="/theory-exam"
                    className={\`\${styles.navLink} \${isActive('/theory-exam') ? styles.active : ''}\`}
                  >
                    <Icons.ClipboardList size={16} />
                    Thi thử 600 câu
                  </Link>`;

const newNavBlock = `<Link
                    to="/theory"
                    className={\`\${styles.navLink} \${isActive('/theory') || isActive('/theory-exam') ? styles.active : ''}\`}
                  >
                    <Icons.FileText size={16} />
                    Lý thuyết
                  </Link>`;

if (content.includes(oldNavBlock)) {
    content = content.replace(oldNavBlock, newNavBlock);
    console.log('Replaced oldNavBlock successfully.');
} else {
    console.log('oldNavBlock not found directly, using regex replacement.');
    content = content.replace(
        /<Link[\s\n\r]+to="\/theory-exam"[\s\n\r]+className=\{`\$\{styles\.navLink\}[\s\S]*?<\/Link>/,
        newNavBlock
    );
}

// 2. Replace drawer link 1
const oldDrawerTheory = `<Link to="/theory-exam" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                    <Icons.ClipboardList size={16} />
                    <span>Thi thử 600 câu lý thuyết</span>
                  </Link>`;

const newDrawerTheory = `<Link to="/theory" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.FileText size={16} />
                  <span>Học lý thuyết (600 câu)</span>
                </Link>`;

if (content.includes(oldDrawerTheory)) {
    content = content.replace(oldDrawerTheory, newDrawerTheory);
    console.log('Replaced oldDrawerTheory successfully.');
} else {
    content = content.replace(
        /<Link to="\/theory-exam" className=\{styles\.drawerLink\}[\s\S]*?<\/Link>/,
        newDrawerTheory
    );
}

// 3. Replace drawer link 2
const oldDrawerReview = `<Link to="/theory-review" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                    <Icons.RefreshCw size={16} />
                    <span>Ôn tập thông minh & Spaced Repetition</span>
                  </Link>`;

const newDrawerReview = `<Link to="/student/review" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.RefreshCw size={16} />
                  <span>Ôn tập & Thi thử 20 đề mẫu</span>
                </Link>`;

if (content.includes(oldDrawerReview)) {
    content = content.replace(oldDrawerReview, newDrawerReview);
    console.log('Replaced oldDrawerReview successfully.');
} else {
    content = content.replace(
        /<Link to="\/theory-review" className=\{styles\.drawerLink\}[\s\S]*?<\/Link>/,
        newDrawerReview
    );
}

fs.writeFileSync(layoutFile, content, 'utf8');
console.log('Updated MainLayout.tsx successfully.');
