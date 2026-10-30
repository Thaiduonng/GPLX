const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'src', 'pages', 'TheoryReviewPage.tsx');
let content = fs.readFileSync(file, 'utf8');

const target1 = `) : overview ? (
            {/* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật */}`;

const replace1 = `) : overview ? (
            <>
              {/* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật */}`;

if (content.includes(target1)) {
    content = content.replace(target1, replace1);
    console.log('Replaced open fragment.');
} else {
    console.log('target1 not found directly, using regex:');
    content = content.replace(
        /\) : overview \? \([\s\r\n]+\{\/\* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật \*\/\}/,
        `) : overview ? (\n            <>\n              {/* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật */}`
    );
}

const target2 = `variant="success"
              />
            </div>
          ) : null}`;

const replace2 = `variant="success"
              />
            </div>
          </>
          ) : null}`;

if (content.includes(target2)) {
    content = content.replace(target2, replace2);
    console.log('Replaced close fragment.');
} else {
    console.log('target2 not found directly, using regex:');
    content = content.replace(
        /variant="success"[\s\r\n]+\/>[\s\r\n]+<\/div>[\s\r\n]+\) : null\}/,
        `variant="success"\n              />\n            </div>\n          </>\n          ) : null}`
    );
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated TheoryReviewPage.tsx!');
