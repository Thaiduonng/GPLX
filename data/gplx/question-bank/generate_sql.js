const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'questions_600.json');
const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    const s = String(str)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
    return `'${s}'`;
}

function getTopicId(qNum) {
    if (qNum >= 1 && qNum <= 180) {
        return 1; // Khái niệm & Quy tắc giao thông
    } else if (qNum >= 181 && qNum <= 205) {
        return 3; // Văn hóa giao thông & Đạo đức
    } else if (qNum >= 206 && qNum <= 263) {
        return 4; // Kỹ thuật lái xe
    } else if (qNum >= 264 && qNum <= 300) {
        return 5; // Cấu tạo và sửa chữa
    } else if (qNum >= 301 && qNum <= 485) {
        return 6; // Biển báo
    } else if (qNum >= 486 && qNum <= 600) {
        return 7; // Sa hình
    }
    return 1;
}

const sqlLines = [];
sqlLines.push('SET NAMES utf8mb4;');
sqlLines.push('SET FOREIGN_KEY_CHECKS = 0;');
sqlLines.push('START TRANSACTION;');

// For each of the 600 questions:
// Check if question with question_number exists, else insert
// Then insert or replace answers
for (const q of questions) {
    const qNum = q.questionNumber;
    const topicId = getTopicId(qNum);
    const content = escapeSql(q.questionText);
    const explanation = escapeSql(q.explanation);
    const imgUrl = (q.imagePaths && q.imagePaths.length > 0) ? escapeSql(q.imagePaths[0]) : 'NULL';
    const isParalysis = q.isCriticalQuestion ? 1 : 0;
    const version = escapeSql('VN-600-2025');
    const legalRef = escapeSql(q.source);
    const verificationStatus = escapeSql(q.verificationStatus);
    const categoryCode = escapeSql('ALL');

    // UPSERT question logic with explicit id = qNum
    sqlLines.push(`
-- Question ${qNum}
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (${qNum}, ${categoryCode}, ${topicId}, ${qNum}, ${content}, ${imgUrl}, ${explanation}, ${isParalysis}, ${version}, ${verificationStatus}, ${legalRef}, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = ${qNum};
`);

    // Insert answers
    for (const opt of q.options) {
        const ansText = escapeSql(opt.text);
        const isCorrect = q.correctOptionKeys.includes(opt.key) ? 1 : 0;
        const orderIdx = opt.index;
        sqlLines.push(`INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (${qNum}, ${ansText}, ${isCorrect}, ${orderIdx});`);
    }
}

sqlLines.push('SET FOREIGN_KEY_CHECKS = 1;');
sqlLines.push('COMMIT;');

const sqlOutPath = path.join(__dirname, 'import_600_questions.sql');
fs.writeFileSync(sqlOutPath, sqlLines.join('\n'), 'utf8');
console.log(`Generated SQL script: ${sqlOutPath} (${fs.statSync(sqlOutPath).size} bytes)`);
