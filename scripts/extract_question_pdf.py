"""Read supplied PDF as data; extract visible text and vector-underlined answers. No answer inference."""
import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path
import pymupdf as fitz

ROOT=Path(__file__).resolve().parents[1]
CHAPTERS=[(1,180,"Quy định chung và quy tắc giao thông đường bộ"),(181,205,"Văn hóa giao thông, đạo đức người lái xe, PCCC và cứu hộ, cứu nạn"),(206,263,"Kỹ thuật lái xe"),(264,300,"Cấu tạo và sửa chữa"),(301,485,"Báo hiệu đường bộ"),(486,600,"Giải thế sa hình và kỹ năng xử lý tình huống giao thông")]

def visible_lines(page):
    drawings=page.get_drawings()
    masks=[d for d in drawings if d.get("fill") and all(c>.96 for c in d['fill']) and d['rect'].height>2]
    chars=[]
    for span in page.get_texttrace():
        if span['type']==3: continue
        for code,_,origin,bbox in span['chars']:
            center=fitz.Point((bbox[0]+bbox[2])/2,(bbox[1]+bbox[3])/2)
            if any(d['seqno']>span['seqno'] and center in d['rect'] for d in masks):continue
            if code<32:continue
            chars.append({'text':chr(code),'x':origin[0],'y':origin[1],'bbox':bbox,'seq':span['seqno']})
    groups=[]
    for char in sorted(chars,key=lambda c:(c['y'],c['x'])):
        candidates=[g for g in groups[-5:] if abs(g['y']-char['y'])<2.6]
        if candidates: candidates[-1]['chars'].append(char)
        else: groups.append({'y':char['y'],'chars':[char]})
    lines=[]
    for group in groups:
        ordered=sorted(group['chars'],key=lambda c:(c['x'],c['seq']))
        chunks=[[]]
        for char in ordered:
            if chunks[-1] and char['x']-chunks[-1][-1]['bbox'][2]>28:chunks.append([])
            chunks[-1].append(char)
        expanded=[]
        for chunk in chunks:
            raw=''.join(c['text'] for c in chunk)
            cuts=[0]+[m.end() for m in re.finditer(r'\s{3,}(?=[1-4]\.\s)',raw)]+[len(chunk)]
            expanded.extend(chunk[a:b] for a,b in zip(cuts,cuts[1:]) if a<b)
        for chunk in expanded:
            text=''.join(c['text'] for c in chunk).strip()
            if not text:continue
            x0=min(c['bbox'][0] for c in chunk);x1=max(c['bbox'][2] for c in chunk)
            y=group['y']
            underlined=any(d['rect'].height<2 and d['rect'].width>4 and d.get('fill') and max(d['fill'])<.4 and abs(d['rect'].y0-y)<3.5 and min(d['rect'].x1,x1)-max(d['rect'].x0,x0)>min(12,(x1-x0)*.3) for d in drawings)
            lines.append({'text':text,'bbox':[x0,min(c['bbox'][1] for c in chunk),x1,max(c['bbox'][3] for c in chunk)],'y':y,'underline':underlined})
    return sorted(lines,key=lambda l:(round(l['y']/3),l['bbox'][0]))

def extract(pdf_path,output):
    source=Path(pdf_path);digest=hashlib.sha256(source.read_bytes()).hexdigest()
    if digest != "6a6dab8543eb334b36ac9de6abcd938e864f2e0e915be27c3a2157ee6e518575":
        raise ValueError("Unexpected PDF hash: create a separate reviewed import version for another source")
    doc=fitz.open(source)
    output=Path(output);output.mkdir(parents=True,exist_ok=True)
    questions=[];current=None;option=None;starts=[]
    for pi in range(4,len(doc)):
        page=doc[pi]
        for line in visible_lines(page):
            text=line['text']
            if re.fullmatch(r'\d+',text) and (line['bbox'][1]<55 or line['bbox'][1]>770):continue
            if text.startswith('CHƯƠNG') or text.startswith('Chương '):continue
            match=re.match(r'^Câu\s+(\d+)[.:]\s*(.*)',text)
            if match:
                number=int(match[1]);current={'questionNumber':number,'questionText':match[2],'options':[],'correctOptionIndices':[],'sourcePages':[pi+1],'imagePaths':[],'sourceHash':digest,'version':'PDF-2025-'+digest[:8],'_start':(pi,line['bbox'][1]),'_firstOption':None}
                questions.append(current);option=None;starts.append((pi,line['bbox'][1],current));continue
            if current is None:continue
            if pi+1 not in current['sourcePages']:current['sourcePages'].append(pi+1)
            match=re.match(r'^([1-4])\.\s*(.*)',text)
            if match:
                option={'index':int(match[1]),'text':match[2],'isCorrect':line['underline']};current['options'].append(option)
                current['_firstOption']=current['_firstOption'] or (pi,line['bbox'][1]);continue
            if option:
                option['text']+=' '+text
                option['isCorrect']=option['isCorrect'] or line['underline']
            else:current['questionText']+=' '+text
    issues=[]
    for qi,q in enumerate(questions):
        number=q['questionNumber'];start_page,start_y=q['_start'];end_page,end_y=questions[qi+1]['_start'] if qi+1<len(questions) else (len(doc)-1,800)
        chapter=next((i+1 for i,(lo,hi,_) in enumerate(CHAPTERS) if lo<=number<=hi),None);q['chapter']=chapter
        q['options'].sort(key=lambda a:a['index'])
        q['correctOptionIndices']=[a['index'] for a in q['options'] if a['isCorrect']]
        for opt in q['options']:opt['text']=re.sub(r'\s+',' ',opt['text']).strip()
        q['questionText']=re.sub(r'\s+',' ',q['questionText']).strip()
        if len(q['correctOptionIndices'])!=1 or len(q['options'])<2 or [a['index'] for a in q['options']]!=list(range(1,len(q['options'])+1)):issues.append({'question':number,'correct':q['correctOptionIndices'],'options':[a['index'] for a in q['options']]})
        for pi in range(start_page,end_page+1):
            page=doc[pi];top=start_y if pi==start_page else 55;bottom=end_y if pi==end_page else 790
            images=[fitz.Rect(im['bbox']) for im in page.get_image_info() if top<=fitz.Rect(im['bbox']).y0<bottom and fitz.Rect(im['bbox']).width>5 and fitz.Rect(im['bbox']).height>5]
            if not images:continue
            first_option=q['_firstOption'];box=images[0]
            for rect in images[1:]:box|=rect
            # Include diagram captions only before options; never export answer underlines as a test image.
            if first_option and pi==first_option[0] and box.y1<first_option[1]:box=fitz.Rect(70,box.y0-3,550,first_option[1]-3)
            else:box=fitz.Rect(box.x0-2,box.y0-2,box.x1+2,box.y1+2)&page.rect
            image_dir=ROOT/'frontend/public/question-images/pdf-2025-6a6dab85';image_dir.mkdir(parents=True,exist_ok=True)
            name=f'q{number:03d}-p{pi+1}.png';page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),clip=box).save(image_dir/name)
            q['imagePaths'].append('/question-images/pdf-2025-6a6dab85/'+name)
        q.pop('_start');q.pop('_firstOption')
    numbers=[q['questionNumber'] for q in questions]
    if numbers!=list(range(1,601)):issues.append({'numbers':'must be exactly 1..600','count':len(numbers)})
    report={'source':str(source),'sourceHash':digest,'pages':len(doc),'questions':len(questions),'chapters':dict(Counter(q['chapter'] for q in questions)),'questionsWithImages':sum(bool(q['imagePaths']) for q in questions),'issues':issues}
    (output/'questions.json').write_text(json.dumps(questions,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (output/'extraction-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False))
    return 1 if issues else 0

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--pdf',required=True);parser.add_argument('--output',default=str(ROOT/'data/gplx/question-bank/pdf-2025-6a6dab85'));args=parser.parse_args();raise SystemExit(extract(args.pdf,args.output))
