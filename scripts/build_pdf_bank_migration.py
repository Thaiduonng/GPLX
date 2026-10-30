"""Generate append-only Flyway data from the validated PDF and official annexes."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DATA=ROOT/'data/gplx/question-bank/pdf-2025-6a6dab85';MIG=ROOT/'backend/src/main/resources/db/migration'
def sql(v):
    if v is None:return 'NULL'
    return "'"+str(v).replace('\\','\\\\').replace("'","''")+"'"
def generate():
    qs=json.loads((DATA/'questions.json').read_text(encoding='utf-8'));m=json.loads((DATA/'applicability.json').read_text(encoding='utf-8'))
    assert [q['questionNumber'] for q in qs]==list(range(1,601))
    cars='B C1 C D1 D2 D BE C1E CE D1E D2E DE'.split()
    # Legacy B1 auto courses retain their original foreign keys and distinct identity.
    s=["-- Article 57(1), 59(1), 89 Law 36/2024/QH15. Keep legacy B1 history intact.","UPDATE license_categories SET code='B1_LEGACY', name='B1 ô tô (danh mục trước 2025)', is_active=0 WHERE code='B1' AND (description LIKE '%tự động%' OR name LIKE '%tự động%');","UPDATE courses c JOIN license_categories l ON l.id=c.category_id SET c.is_active=0 WHERE l.code='B1_LEGACY';"]
    desc={
    'A1':'Mô tô hai bánh đến 125 cm³ hoặc động cơ điện đến 11 kW.',
    'A':'Mô tô hai bánh trên 125 cm³ hoặc động cơ điện trên 11 kW; bao gồm hạng A1.',
    'B1':'Mô tô ba bánh; bao gồm hạng A1.',
    'B':'Ô tô chở người đến 08 chỗ không kể người lái; ô tô tải, chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg; kéo rơ moóc đến 750 kg.',
    'C1':'Ô tô tải, chuyên dùng trên 3.500 đến 7.500 kg khối lượng toàn bộ theo thiết kế; kéo rơ moóc đến 750 kg; bao gồm hạng B.',
    'C':'Ô tô tải, chuyên dùng trên 7.500 kg khối lượng toàn bộ theo thiết kế; kéo rơ moóc đến 750 kg; bao gồm B, C1.',
    'D1':'Ô tô chở trên 08 đến 16 chỗ không kể người lái; kéo rơ moóc đến 750 kg; bao gồm B, C1, C.',
    'D2':'Ô tô chở người, kể cả xe buýt, trên 16 đến 29 chỗ không kể người lái; kéo rơ moóc đến 750 kg; bao gồm B, C1, C, D1.',
    'D':'Ô tô chở người, kể cả xe buýt, trên 29 chỗ không kể người lái; xe giường nằm; kéo rơ moóc đến 750 kg; bao gồm B, C1, C, D1, D2.',
    'BE':'Xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.',
    'C1E':'Xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.',
    'CE':'Xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; ô tô đầu kéo kéo sơ mi rơ moóc.',
    'D1E':'Xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.',
    'D2E':'Xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.',
    'DE':'Xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; ô tô chở khách nối toa.'}
    ages={'C':21,'BE':21,'D1':24,'D2':24,'C1E':24,'CE':24,'D':27,'D1E':27,'D2E':27,'DE':27}
    names={'A1':'Mô tô hai bánh đến 125 cm³ / 11 kW','A':'Mô tô hai bánh trên 125 cm³ / 11 kW','B1':'Mô tô ba bánh','B':'Ô tô đến 08 chỗ không kể lái xe','C1':'Ô tô tải trên 3.500 đến 7.500 kg','C':'Ô tô tải trên 7.500 kg','D1':'Ô tô trên 08 đến 16 chỗ','D2':'Ô tô trên 16 đến 29 chỗ','D':'Ô tô trên 29 chỗ, giường nằm'}
    for c,d in desc.items():
        name='Hạng '+c+' - '+names.get(c,'Kéo rơ moóc trên 750 kg')
        s.append(f"INSERT INTO license_categories (code,name,description,min_age,tuition_fee,is_active) VALUES ({sql(c)},{sql(name)},{sql(d)},{ages.get(c,18)},0,1) ON DUPLICATE KEY UPDATE name={sql(name)}, description={sql(d)}, min_age={ages.get(c,18)}, is_active=1;")
    s.append("UPDATE license_categories SET is_active=0 WHERE code IN ('A2','A3','A4','B2','E','F','FB2','FC','FD','FE');")
    (MIG/'V15__normalize_license_categories_2025.sql').write_text('\n'.join(s)+'\n',encoding='utf-8')
    s=["-- Archive question IDs and answers: old exam/practice foreign keys remain valid.","ALTER TABLE theory_questions ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1, ADD COLUMN applicable_categories VARCHAR(255) NULL, ADD COLUMN paralysis_categories VARCHAR(255) NULL, ADD COLUMN source_hash CHAR(64) NULL, ADD COLUMN source_page INT NULL, ADD INDEX idx_question_active_number (is_active,question_number);","ALTER TABLE theory_topics ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1;","UPDATE theory_questions SET is_active=0;","UPDATE theory_topics SET is_active=0;"]
    chapters=['Quy định chung và quy tắc giao thông đường bộ','Văn hóa giao thông, đạo đức, phòng cháy chữa cháy, cứu hộ cứu nạn','Kỹ thuật lái xe','Cấu tạo và sửa chữa','Báo hiệu đường bộ','Giải thế sa hình và kỹ năng xử lý tình huống giao thông']
    for i,title in enumerate(chapters,1):
        subset=[q for q in qs if q['chapter']==i];crit=sum(q['questionNumber'] in m['criticalCar'] for q in subset)
        s.append(f"INSERT INTO theory_topics (code,name,order_index,total_questions,paralysis_questions) VALUES ('PDF25_CH{i}',{sql(title)},{i},{len(subset)},{crit});")
    for q in qs:
        n=q['questionNumber'];assert len(q['correctOptionIndices'])==1
        cats=cars+[c for c in ['A1','A','B1'] if n in m[c]]
        critical=(cars if n in m['criticalCar'] else [])+(['A1','A'] if n in m['criticalA'] else [])+(['B1'] if n in m['criticalB1'] else [])
        image=q['imagePaths'][0] if q['imagePaths'] else None
        assert len(q['imagePaths'])<=1, 'Implement multi-page diagram before import'
        values=[sql('ALL'),f"(SELECT id FROM theory_topics WHERE code='PDF25_CH{q['chapter']}')",str(n),sql(q['questionText']),sql(image),'NULL',str(int(bool(critical))),sql(m['version']),sql('VERIFIED'),sql('PDF người dùng; CV 2262/CSGT-P5 (07/05/2025), PL1–3'), '1',sql(','+','.join(cats)+','),sql(','+','.join(critical)+','),sql(m['sourceHash']),str(q['sourcePages'][0])]
        s.append('INSERT INTO theory_questions (category_code,topic_id,question_number,content,image_url,explanation,is_paralysis,version,verification_status,legal_reference,is_active,applicable_categories,paralysis_categories,source_hash,source_page) VALUES ('+','.join(values)+');')
        for a in q['options']:
            s.append(f"INSERT INTO theory_answers (question_id,answer_text,is_correct,order_index) SELECT id,{sql(a['text'])},{int(a['isCorrect'])},{a['index']} FROM theory_questions WHERE version={sql(m['version'])} AND question_number={n};")
    s.append('UPDATE exam_configurations SET is_active=0;')
    specs={'A1':(25,19,21),'A':(25,19,23),'B1':(25,19,23),'B':(30,20,27),'C1':(35,22,32),'C':(40,24,36),'D1':(45,26,41),'D2':(45,26,41),'D':(45,26,41)}
    configs=[]
    for c,(total,duration,passing) in specs.items():
        struct={'paralysis':1,'rules':8 if total<=30 else 10,'culture':1}
        if total==25:struct.update(techniqueOrRepair=1,signs=8,scenarios=6)
        else:struct.update(technique=1 if c=='B' else 2,repair=1,signs={'B':9,'C1':10,'C':14}.get(c,16),scenarios={'B':9,'C1':10,'C':11}.get(c,14))
        assert sum(struct.values())==total
        s.append(f"INSERT INTO exam_configurations (category_code,total_questions,duration_minutes,passing_score,rules_version,is_active,structure_json,legal_source) VALUES ({sql(c)},{total},{duration},{passing},'PDF25-TT108-TRANSITION',1,{sql(json.dumps(struct))},'TT12/2025/TT-BCA PLII, III, IV.A; TT108/2026/TT-BCA Điều 41; CV2262/CSGT-P5');")
    (MIG/'V16__import_versioned_pdf_question_bank.sql').write_text('\n'.join(s)+'\n',encoding='utf-8')
    catalog=[]
    for c,d in desc.items():
        v=specs.get(c) or ((45,26,41) if c.endswith('E') else None)
        catalog.append({'code':c,'name':'Hạng '+c,'fullName':'Hạng '+c+' ('+names.get(c,'Kéo rơ moóc trên 750 kg')+')','description':d,'minAge':ages.get(c,18),'totalQuestions':len(m[c]) if c in m else 600,'questionsPerExam':v[0] if v else None,'timeMinutes':v[1] if v else None,'passingScore':f'{v[2]}/{v[0]}' if v else 'Chờ xác minh quy trình','examVerified':v is not None})
    (ROOT/'frontend/src/data/licenseCategories2026.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Generated V15/V16 and 15-category catalog; archived rows preserved')
if __name__=='__main__':generate()
