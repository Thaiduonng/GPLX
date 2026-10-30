import json
from pathlib import Path
from PIL import Image
import unittest
R=Path(__file__).resolve().parents[1];D=R/'data/gplx/question-bank/pdf-2025-6a6dab85'
class PdfBankTest(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.q=json.loads((D/'questions.json').read_text(encoding='utf-8'));cls.m=json.loads((D/'applicability.json').read_text(encoding='utf-8'))
 def test_complete_numbering_chapters_and_single_answer(self):
  self.assertEqual([q['questionNumber'] for q in self.q],list(range(1,601)))
  self.assertEqual([sum(q['chapter']==i for q in self.q) for i in range(1,7)],[180,25,58,37,185,115])
  for q in self.q:
   self.assertEqual(len(q['correctOptionIndices']),1,q['questionNumber']);self.assertTrue(2<=len(q['options'])<=4)
   self.assertEqual([a['index'] for a in q['options']],list(range(1,len(q['options'])+1)))
 def test_annex_scope_and_critical_subsets(self):
  for key,count in [('A1',250),('A',250),('B1',300),('criticalCar',60),('criticalA',20),('criticalB1',30)]:
   self.assertEqual(len(set(self.m[key])),count)
  self.assertTrue(set(self.m['criticalA'])<=set(self.m['A1']))
  self.assertTrue(set(self.m['criticalB1'])<=set(self.m['B1']))
  # Q32 applies to motorcycles but is only critical in the car annex.
  self.assertIn(32,self.m['A1']);self.assertNotIn(32,self.m['criticalA']);self.assertIn(32,self.m['criticalCar'])
 def test_all_extracted_images_are_readable(self):
  self.assertEqual(sum(bool(q['imagePaths']) for q in self.q),318)
  for q in self.q:
   for url in q['imagePaths']:
    with Image.open(R/'frontend/public'/url.lstrip('/')) as image:
     self.assertGreater(image.width,10);self.assertGreater(image.height,10);image.verify()
 def test_append_only_import_preserves_history(self):
  sql=(R/'backend/src/main/resources/db/migration/V16__import_versioned_pdf_question_bank.sql').read_text(encoding='utf-8')
  self.assertNotIn('DELETE ',sql);self.assertNotIn('FOREIGN_KEY_CHECKS',sql)
  self.assertEqual(sql.count('INSERT INTO theory_questions ('),600)
  self.assertIn('UPDATE theory_questions SET is_active=0;',sql)
if __name__=='__main__':unittest.main()
