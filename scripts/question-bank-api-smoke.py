"""End-to-end API checks using an isolated upgrade verification container only."""
import json,secrets,subprocess
from collections import Counter
from pathlib import Path
R=Path(__file__).resolve().parents[1];DOCKER='C:/Users/admin/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe';CONTAINER='gplx-bank-upgrade-verify'
def run(args,input=None):
 p=subprocess.run([DOCKER]+args,input=input,encoding='utf-8',capture_output=True)
 if p.returncode:raise RuntimeError('Verification command failed (sensitive response suppressed)')
 return p.stdout
# Guard against accidentally using the live database.
assert run(['inspect',CONTAINER,'--format','{{range .Config.Env}}{{println .}}{{end}}']).find('DB_NAME=gplx_pdf_upgrade_20261029\n')>=0
token=None
def api(path,data=None):
 args=['exec',CONTAINER,'curl','--silent','--show-error','--fail-with-body','-H','Content-Type: application/json']
 if token:args+=['-H','Authorization: Bearer '+token]
 if data is not None:args+=['-d',json.dumps(data,ensure_ascii=True)]
 args+=['http://localhost:8080/api/v1'+path]
 response=json.loads(run(args));assert response['success'];return response['data']
uid=secrets.token_hex(5)
auth=api('/auth/register',{'username':'pdfverify_'+uid,'email':'pdfverify_'+uid+'@example.invalid','password':secrets.token_urlsafe(24),'fullName':'Kiểm thử ngân hàng PDF','phone':None})
token=auth['accessToken']
rows=run(['exec','-i','gplx-mysql','sh','-c','MYSQL_PWD="$MYSQL_PASSWORD" mysql -u "$MYSQL_USER" gplx_pdf_upgrade_20261029 -N -B'],"SELECT q.id,a.id FROM theory_questions q JOIN theory_answers a ON a.question_id=q.id WHERE q.is_active=1 AND a.is_correct=1;")
correct={int(q):int(a) for q,a in (row.split('\t') for row in rows.strip().splitlines())}
m=json.loads((R/'data/gplx/question-bank/pdf-2025-6a6dab85/applicability.json').read_text(encoding='utf-8'))
qs=json.loads((R/'data/gplx/question-bank/pdf-2025-6a6dab85/questions.json').read_text(encoding='utf-8'));chapters={q['questionNumber']:q['chapter'] for q in qs}
catalog=json.loads((R/'frontend/src/data/licenseCategories2026.json').read_text(encoding='utf-8'))
assert len(api('/license-categories'))==15
assert len(api('/theory/topics'))==6
for c in catalog:
 code=c['code'];allq=api('/theory/questions?category='+code);assert len(allq)==c['totalQuestions'],code
 session=api('/theory/mock-exam/start',{'categoryCode':code});questions=session['questions']
 assert len(questions)==c['questionsPerExam'] and len({q['id'] for q in questions})==len(questions)
 assert session['durationMinutes']==c['timeMinutes'] and session['passingScore']==int(c['passingScore'].split('/')[0])
 scope=set(m.get(code,range(1,601)));critical=set(m['criticalA' if code in ['A','A1'] else 'criticalB1' if code=='B1' else 'criticalCar'])
 assert sum(q['isParalysis'] for q in questions)==1
 for q in questions:
  assert q['questionNumber'] in scope and q['isParalysis']==(q['questionNumber'] in critical)
  assert all('isCorrect' not in a for a in q['options'])
 counts=Counter(chapters[q['questionNumber']] for q in questions if not q['isParalysis'])
 if code in ['A1','A','B1']:
  assert counts[1]==8 and counts[2]==1 and counts[3]+counts[4]==1 and counts[5]==8 and counts[6]==6
 else:
  assert counts=={1:8 if code=='B' else 10,2:1,3:1 if code=='B' else 2,4:1,5:{'B':9,'C1':10,'C':14}.get(code,16),6:{'B':9,'C1':10,'C':11}.get(code,14)}
 answers={str(q['id']):correct[q['id']] for q in questions}
 # Deliberately miss the critical question on B1, while exceeding its minimum score.
 if code=='B1':
  q=next(q for q in questions if q['isParalysis']);answers[str(q['id'])]=next(a['id'] for a in q['options'] if a['id']!=correct[q['id']])
 result=api('/theory/mock-exam/'+session['sessionCode']+'/submit',{'answers':answers})
 assert result['passed']==(code!='B1') and result['failedParalysis']==(code=='B1')
 assert result['score']==len(questions)-(1 if code=='B1' else 0)
 restored=api('/theory/mock-exam/'+session['sessionCode']+'/result');assert restored['score']==result['score']
 print('PASS',code,'scope, structure, critical rules, grading and persisted result')
print('PASS 15 classes; real registration/JWT; server answers hidden during exams; B1 critical mistake fails at 24/25')
