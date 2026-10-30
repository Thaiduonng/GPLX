"""Read-only verification against a MySQL container; credentials stay inside it."""
import argparse,json,re,subprocess
from pathlib import Path
DOCKER='C:/Users/admin/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe'
def verify(database):
 assert re.fullmatch(r'[A-Za-z0-9_]+',database)
 command=[DOCKER,'exec','-i','gplx-mysql','sh','-c',f'MYSQL_PWD="$MYSQL_PASSWORD" mysql --default-character-set=utf8mb4 -u "$MYSQL_USER" {database} -N -B']
 def query(sql):
  r=subprocess.run(command,input=sql,encoding='utf-8',capture_output=True,check=True)
  return [line.split('\t') for line in r.stdout.strip().splitlines()]
 counts=query("SELECT COUNT(*),SUM(is_active),COUNT(DISTINCT CASE WHEN is_active THEN question_number END) FROM theory_questions;")[0]
 assert counts==['1200','600','600'],counts
 assert query('SELECT COUNT(*) FROM license_categories WHERE is_active=1;')[0]==['15']
 assert query('SELECT COUNT(*) FROM theory_topics WHERE is_active=1;')[0]==['6']
 for cat,total,critical in [('A1',250,20),('A',250,20),('B1',300,30),('B',600,60),('C1',600,60),('C',600,60),('D1',600,60),('D2',600,60),('D',600,60),('BE',600,60),('C1E',600,60),('CE',600,60),('D1E',600,60),('D2E',600,60),('DE',600,60)]:
  actual=query(f"SELECT COUNT(*),SUM(LOCATE(',{cat},',paralysis_categories)>0) FROM theory_questions WHERE is_active=1 AND LOCATE(',{cat},',applicable_categories)>0;")[0]
  assert actual==[str(total),str(critical)],(cat,actual)
 invalid=query('SELECT COUNT(*) FROM (SELECT q.id FROM theory_questions q JOIN theory_answers a ON a.question_id=q.id WHERE q.is_active=1 GROUP BY q.id HAVING SUM(a.is_correct)<>1 OR COUNT(*)<2 OR COUNT(*)>4) invalid;')[0]
 assert invalid==['0'],invalid
 assert query('SELECT COUNT(*) FROM theory_questions WHERE is_active=1 AND image_url IS NOT NULL;')[0]==['318']
 assert query("SELECT COUNT(*) FROM theory_questions WHERE is_active=1 AND (source_hash <> '6a6dab8543eb334b36ac9de6abcd938e864f2e0e915be27c3a2157ee6e518575' OR source_page IS NULL);")[0]==['0']
 assert query('SELECT COUNT(*) FROM flyway_schema_history WHERE success=0;')[0]==['0']
 report={'database':database,'totalQuestionsIncludingHistory':1200,'activeQuestions':600,'activeCategories':15,'activeChapters':6,'images':318,'categoryScopeChecks':15,'invalidAnswerSets':0,'passed':True}
 print(json.dumps(report))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--database',default='gplx_db');verify(p.parse_args().database)
