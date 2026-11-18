from pathlib import Path
colors=['#b88b5a','#657865','#c3b394','#a96043','#c3b394','#657865','#b88b5a','#657865','#a96043','#c3b394']
shapes=[
'M210 170 Q300 200 390 170 L420 440 Q300 480 180 440Z',
'M230 220 L370 220 L410 430 L300 470 L190 430Z',
'M185 240 Q300 200 415 240 L390 430 Q300 475 210 430Z',
'M240 440 C100 290 260 120 340 180 C465 285 260 335 360 440Z',
'M150 345 Q300 290 450 345 L430 420 Q300 470 170 420Z',
'M250 270 L350 270 L375 370 L340 390 L330 450 L290 450 L280 390 L240 370Z M255 185 Q300 150 345 185 L345 250 Q300 280 255 250Z M240 280 L200 320 L210 380 L245 350Z M360 280 L400 320 L390 380 L355 350Z',
'M230 430 L230 290 L205 210 L280 250 Q310 235 340 255 L390 220 L365 310 L370 430Z',
'M210 430 L245 250 L275 240 L295 330 L360 300 L395 330 L350 390 L330 430Z',
'M180 340 Q180 300 220 300 L380 300 Q420 300 420 340 L420 390 L375 390 L375 345 L345 345 L345 390 L300 390 L300 345 L270 345 L270 390 L225 390 L225 345 L180 345Z',
'M210 435 L280 210 L330 210 L290 370 L390 370 L390 435Z']
for i,(shape,color) in enumerate(zip(shapes,colors)):
 lines=''.join(f'<path d="M{x} 140 Q{x-35} 300 {x+15} 470" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>' for x in range(160,445,6))
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><linearGradient id="v"><stop stop-color="{color}"/><stop offset=".6" stop-color="{color}"/><stop offset="1" stop-color="#645348"/></linearGradient><clipPath id="c"><path d="{shape}"/></clipPath></defs><path fill="#edeae2" d="M0 0h600v600H0z"/><ellipse cx="305" cy="464" rx="150" ry="16" fill="#342d23" opacity=".1"/><path d="{shape}" fill="url(#v)"/><g clip-path="url(#c)">{lines}</g></svg>'
 Path(f'public/images/study-{i}.svg').write_text(svg)
# Original editorial composition assembled from the catalog's vector studies.
parts=[]
for i,x,y,scale in [(2,310,130,.78),(0,30,0,1),(3,400,230,.55)]:
 s=Path(f'public/images/study-{i}.svg').read_text();inner=s[s.index('<defs>'):s.rindex('</svg>')].replace('id="v"',f'id="v{i}"').replace('id="c"',f'id="c{i}"').replace('url(#v)',f'url(#v{i})').replace('url(#c)',f'url(#c{i})').replace('<path fill="#edeae2" d="M0 0h600v600H0z"/>','')
 parts.append(f'<g transform="translate({x} {y}) scale({scale})">{inner}</g>')
Path('public/images/editorial.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><path fill="#e7e3d9" d="M0 0h900v700H0z"/><path fill="#ded8cb" d="M0 490L900 410V700H0Z"/>'+''.join(parts)+'</svg>')
