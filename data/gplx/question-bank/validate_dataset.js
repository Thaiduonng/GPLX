const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('=== STARTING AUTOMATED DATASET VALIDATION ===\n');

const bankDir = __dirname;
const jsonPath = path.join(bankDir, 'questions_600.json');
const csvPath = path.join(bankDir, 'questions_600.csv');
const errCsvPath = path.join(bankDir, 'extraction_errors.csv');
const regPath = path.join(bankDir, 'source_register.json');
const manifestPath = path.join(bankDir, 'question_bank_manifest.json');
const imgDir = path.join(bankDir, 'question_images');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`[PASS] ${testName}`);
    } else {
        console.error(`[FAIL] ${testName} - ${details}`);
    }
}

// 1. Files existence
assert(fs.existsSync(jsonPath), 'questions_600.json exists');
assert(fs.existsSync(csvPath), 'questions_600.csv exists');
assert(fs.existsSync(errCsvPath), 'extraction_errors.csv exists');
assert(fs.existsSync(regPath), 'source_register.json exists');
assert(fs.existsSync(manifestPath), 'question_bank_manifest.json exists');
assert(fs.existsSync(imgDir), 'question_images directory exists');

const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const register = JSON.parse(fs.readFileSync(regPath, 'utf8'));

// 2. Count verification
assert(questions.length === 600, `Total questions is exactly 600 (Found: ${questions.length})`);
const criticalQuestions = questions.filter(q => q.isCriticalQuestion);
assert(criticalQuestions.length === 60, `Total critical questions is exactly 60 (Found: ${criticalQuestions.length})`);

// 3. Continuous sequence 1..600
let seqOk = true;
for (let i = 0; i < 600; i++) {
    if (questions[i].questionNumber !== (i + 1)) {
        seqOk = false;
        break;
    }
}
assert(seqOk, 'Question numbers are strictly continuous from 1 to 600 without gaps or duplicates');

// 4. Chapter distribution
const chCounts = {
    CHAPTER_1: questions.filter(q => q.chapter.id === 'CHAPTER_1').length,
    CHAPTER_2: questions.filter(q => q.chapter.id === 'CHAPTER_2').length,
    CHAPTER_3: questions.filter(q => q.chapter.id === 'CHAPTER_3').length,
    CHAPTER_4: questions.filter(q => q.chapter.id === 'CHAPTER_4').length,
    CHAPTER_5: questions.filter(q => q.chapter.id === 'CHAPTER_5').length,
    CHAPTER_6: questions.filter(q => q.chapter.id === 'CHAPTER_6').length
};
assert(chCounts.CHAPTER_1 === 180, `Chapter 1 has 180 questions (Found: ${chCounts.CHAPTER_1})`);
assert(chCounts.CHAPTER_2 === 25, `Chapter 2 has 25 questions (Found: ${chCounts.CHAPTER_2})`);
assert(chCounts.CHAPTER_3 === 58, `Chapter 3 has 58 questions (Found: ${chCounts.CHAPTER_3})`);
assert(chCounts.CHAPTER_4 === 37, `Chapter 4 has 37 questions (Found: ${chCounts.CHAPTER_4})`);
assert(chCounts.CHAPTER_5 === 185, `Chapter 5 has 185 questions (Found: ${chCounts.CHAPTER_5})`);
assert(chCounts.CHAPTER_6 === 115, `Chapter 6 has 115 questions (Found: ${chCounts.CHAPTER_6})`);

// 5. Options and answers integrity
let optionsOk = true;
let answersOk = true;
let textOk = true;
let imagesExist = true;
let missingImage = '';

questions.forEach(q => {
    if (!q.options || q.options.length < 2 || q.options.length > 4) {
        optionsOk = false;
    }
    if (!q.correctOptionKeys || q.correctOptionKeys.length !== 1) {
        answersOk = false;
    }
    if (!q.questionText || q.questionText.length < 5) {
        textOk = false;
    }
    // Check if image referenced exists
    if (q.imagePaths && q.imagePaths.length > 0) {
        q.imagePaths.forEach(imgPath => {
            if (imgPath.startsWith('/question-images/')) {
                const baseName = path.basename(imgPath);
                const localFile = path.join(imgDir, baseName);
                if (!fs.existsSync(localFile)) {
                    imagesExist = false;
                    missingImage = localFile;
                }
            }
        });
    }
});

assert(optionsOk, 'All questions have between 2 and 4 valid options');
assert(answersOk, 'All questions have exactly 1 valid correct option key');
assert(textOk, 'All questions have non-empty valid Vietnamese question text');
assert(imagesExist, 'All referenced question images exist in question_images directory', missingImage);

// 6. Checksum validation
function calcSha(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
assert(calcSha(jsonPath) === manifest.checksums["questions_600.json"].sha256, 'Manifest SHA-256 matches questions_600.json');
assert(calcSha(csvPath) === manifest.checksums["questions_600.csv"].sha256, 'Manifest SHA-256 matches questions_600.csv');
assert(calcSha(errCsvPath) === manifest.checksums["extraction_errors.csv"].sha256, 'Manifest SHA-256 matches extraction_errors.csv');
assert(calcSha(regPath) === manifest.checksums["source_register.json"].sha256, 'Manifest SHA-256 matches source_register.json');

// 7. Verification status
const allVerified = questions.every(q => q.verificationStatus === 'VERIFIED');
assert(allVerified, 'All 600 questions have verificationStatus = "VERIFIED"');

console.log(`\n========================================`);
console.log(`VALIDATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED.`);
if (passedTests === totalTests) {
    console.log('STATUS: FULL DATASET PASSES ALL COMPLIANCE CHECKS 100%!');
} else {
    console.error('STATUS: SOME TESTS FAILED. PLEASE REVIEW.');
    process.exit(1);
}
console.log(`========================================\n`);
