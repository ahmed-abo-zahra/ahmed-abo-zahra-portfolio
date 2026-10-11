from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
import shutil
OUT=Path(__file__).resolve().parents[2]/'output/cv'
OUT.mkdir(parents=True, exist_ok=True)
PUBLIC=OUT.parent.parent/'site/public'
INK=HexColor('#163d35')
body=ParagraphStyle('body',fontName='Helvetica',fontSize=9.3,leading=12.7,spaceAfter=4,textColor=HexColor('#202020'))
small=ParagraphStyle('small',parent=body,fontSize=8.8,leading=11.8)
heading=ParagraphStyle('heading',parent=body,fontName='Helvetica-Bold',fontSize=10.3,textColor=INK,spaceBefore=9,spaceAfter=5)
name=ParagraphStyle('name',parent=body,fontName='Helvetica-Bold',fontSize=24,leading=28,textColor=INK)
title=ParagraphStyle('title',parent=body,fontName='Helvetica-Bold',fontSize=12,leading=17,spaceAfter=6)
def link(label,url):return f'<link href="{url}" color="#163d35"><u>{label}</u></link>'
story=[]
def p(text,style=body):story.append(Paragraph(text,style))
def section(text):p(text,heading)
def bullet(text):p('- '+text)
p('Ahmed Abo Zahra',name)
p('Full-Stack Web Developer | React &amp; Next.js',title)
p('Giza, Egypt | +20 101 075 2614 | '+link('ahmedabozahra68@gmail.com','mailto:ahmedabozahra68@gmail.com'),small)
p(link('Portfolio','https://ahmedabozahra.me')+' | '+link('LinkedIn','https://www.linkedin.com/in/ahmed-abo-zahra/')+' | '+link('GitHub','https://github.com/ahmed-abo-zahra'),small)
section('PROFILE')
p('Full-stack web developer working with React, Next.js, and TypeScript. Independently builds responsive Arabic RTL interfaces, backend APIs, authenticated dashboards, and validated commerce workflows. Computer Science &amp; Engineering student seeking a full-stack or frontend development role; expected graduation 2028.')
section('TECHNICAL SKILLS')
p('<b>Frontend:</b> React, Next.js, TypeScript, JavaScript, HTML, CSS, responsive design, Arabic RTL')
p('<b>Backend:</b> REST APIs, Next.js route handlers, signed cookie sessions, ownership checks, server-side validation')
p('<b>Data &amp; cloud:</b> Supabase database/storage integration (ASO), product/order models, Vercel deployment, localStorage')
p('<b>Interaction &amp; delivery:</b> GSAP, ScrollTrigger, Lenis, Git/GitHub, Vercel, semantic HTML, SEO structure, debugging and browser testing')
section('EXPERIENCE')
p('<b>Independent Web Developer | Freelance | 2025 - Present</b>')
bullet('Own client requirements, content structure, visual design, implementation, responsive testing, and release checks for independently delivered websites.')
section('SELECTED PROJECTS')
p('<b>ASO CLO | E-commerce storefront &amp; partner dashboard</b> - '+link('Case study','https://ahmedabozahra.me/work/aso-clo'))
p('Next.js, React, TypeScript, backend APIs, Supabase integration | Solo design and development',small)
bullet('Built bilingual product browsing, search/filter/sort, size/color selection, persistent cart, and demo checkout with server-derived prices and stock/variant validation.')
bullet('Built one shared dashboard for three partner accounts: signed sessions, server-scoped products/orders, stock, balances, tracking, and CSV reports. Implemented Supabase database/storage adapters; verified workflows locally with sample data and hidden identities. Live cloud persistence is not independently verified; payment is disabled. Public preview is frontend-only.')
p('<b>Easylink Telecom | Business website | Client project</b> - '+link('Live website','https://easylink-eg.com/'))
p('Next.js, React, TypeScript, GSAP | Independently designed and developed',small)
bullet('Designed and developed the published communications/security website: company, product, service, and contact pages, Arabic/English content, responsive navigation, SEO page structure, and direct email/phone/WhatsApp enquiry routes.')
p('<b>Qalb Zaker | Arabic RTL landing page | Client project</b> - '+link('Live page','https://qalb-zaker.vercel.app/'))
p('HTML, CSS, JavaScript, GSAP, ScrollTrigger, Lenis | Independently designed and developed',small)
bullet('Built the Arabic landing page from scratch: visual direction, RTL hierarchy, desktop/mobile layouts, product/feature/FAQ sections, and scroll-driven motion. App download links are coming soon; this project demonstrates the landing page.')
section('EDUCATION &amp; TRAINING')
p('<b>New Mansoura University | Computer Science &amp; Engineering</b><br/>Bachelor\'s degree | October 2024 - Expected graduation 2028')
p('<b>Creativa | Full-Stack Web Development Summer Training | 2024</b>')
section('PROFESSIONAL SKILLS &amp; LANGUAGES')
p('Requirements analysis, independent project ownership, problem-solving, and attention to interface detail.')
p('Arabic: Native | English: Good working proficiency; comfortable with conversation and discussion.')
file=OUT/'Ahmed_Abo_Zahra_CV.pdf'
SimpleDocTemplate(str(file),pagesize=A4,leftMargin=38,rightMargin=38,topMargin=28,bottomMargin=28,title='Ahmed Abo Zahra - Full-Stack Web Developer - React and Next.js',author='Ahmed Abo Zahra').build(story)
r=PdfReader(file);assert len(r.pages)==1,f'Expected one page, got {len(r.pages)}'
urls=[a.get_object().get('/A',{}).get('/URI') for page in r.pages for a in page.get('/Annots',[])]
assert len(urls)==7 and all(urls),urls
for dst in [OUT/'Ahmed_Abo_Zahra_Jobs_CV.pdf',PUBLIC/file.name,PUBLIC/'Ahmed_Abo_Zahra_Jobs_CV.pdf']:shutil.copy2(file,dst)
print('PASS: one-page jobs CV, seven link annotations',urls)
