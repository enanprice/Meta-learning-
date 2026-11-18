/* Diagram engine + every "explain, with the aid of a diagram" point in OCR H460.
   Coordinates are 0–10 on both axes. Keys are "<topic id>|<index in topic.diagram>". */
(function(){
const W=340,H=262,L=44,R=318,T=26,B=222;
const X=x=>+(L+x/10*(R-L)).toFixed(1), Y=y=>+(B-y/10*(B-T)).toFixed(1);
const COL={a:"var(--accent)",b:"var(--fg)",c:"var(--fig-c)",m:"var(--muted)",r:"var(--down)",g:"var(--up)"};
const e=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sample=(f,a,b,n)=>{n=n||60;const p=[];for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;p.push([x,f(x)])}return p};
const lin=p=>p.map((q,i)=>(i?"L":"M")+X(q[0])+" "+Y(q[1])).join("");
function smooth(p){const s=p.map(q=>[X(q[0]),Y(q[1])]);let d="M"+s[0][0]+" "+s[0][1];
  for(let i=0;i<s.length-1;i++){const p0=s[i-1]||s[i],p1=s[i],p2=s[i+1],p3=s[i+2]||p2;
    d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0]} ${p2[1]}`}
  return d}
const txt=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" fill="${COL[o.c||"b"]}" text-anchor="${o.a||"start"}">${e(t)}</text>`};
function arrow(f,t,c){const x1=X(f[0]),y1=Y(f[1]),x2=X(t[0]),y2=Y(t[1]),a=Math.atan2(y2-y1,x2-x1),h=7,col=COL[c||"m"];
  const p1=[x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45)],p2=[x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)];
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${col}" stroke-width="1.4" fill="none"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" fill="${col}"/>`}

window.FIG=function(s){
  let o=`<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(s.cap||(s.y+" against "+s.x))}">`;
  (s.areas||[]).forEach(a=>{o+=`<path d="${lin(a.p)}Z" fill="${COL[a.c||"a"]}" fill-opacity="${a.o||.22}"/>`});
  o+=`<path d="M${L} ${T-10}V${B}H${R+10}" fill="none" stroke="var(--muted)" stroke-width="1.2"/>`;
  o+=txt(L+6,T-12,s.y,{c:"m"})+txt(R+10,B+32,s.x,{c:"m",a:"end"})+txt(L-8,B+15,"O",{c:"m",a:"end"});
  (s.guides||[]).forEach(g=>{const x=X(g.p[0]),y=Y(g.p[1]);
    let d="";if(g.yl!==null)d+=`M${L} ${y}H${x}`;if(g.xl!==null)d+=`M${x} ${y}V${B}`;
    if(d)o+=`<path d="${d}" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"/>`;
    if(g.xl)o+=txt(x,B+15,g.xl,{c:"m",a:"middle"});
    if(g.yl)o+=txt(L-5,y+4,g.yl,{c:"m",a:"end"});});
  (s.lines||[]).forEach(l=>{const p=l.f?sample(l.f,l.x0,l.x1):l.p;
    o+=`<path d="${l.cv?smooth(p):lin(p)}" fill="none" stroke="${COL[l.c||"a"]}" stroke-width="${l.w||2}"${l.d?' stroke-dasharray="6 4"':""} stroke-linecap="round" stroke-linejoin="round"/>`;
    if(l.l){const q=l.lp||p[p.length-1];
      if(!l.lp&&X(q[0])+5+l.l.length*6.7>W-2)o+=txt(X(q[0])-4,Y(q[1])-8,l.l,{c:l.c||"a",a:"end"});
      else o+=txt(X(q[0])+(l.lp?0:5),Y(q[1])+(l.lp?0:4),l.l,{c:l.c||"a",a:l.la});}});
  (s.arrows||[]).forEach(a=>{o+=arrow(a.f,a.t,a.c)});
  (s.dots||[]).forEach(d=>{o+=`<circle cx="${X(d.p[0])}" cy="${Y(d.p[1])}" r="3.2" fill="var(--fg)"/>`;
    if(d.t)o+=txt(X(d.p[0])+(d.dx??6),Y(d.p[1])+(d.dy??-6),d.t,{a:d.a})});
  (s.text||[]).forEach(t=>{o+=txt(X(t.p[0]),Y(t.p[1]),t.t,{c:t.c||"b",a:t.a})});
  return o+"</svg>";
};

/* ---------- maths helpers ---------- */
const solve=(f,lo,hi)=>{let a=lo,b=hi,fa=f(a);for(let i=0;i<60;i++){const m=(a+b)/2,fm=f(m);if((fm>0)===(fa>0)){a=m;fa=fm}else b=m}return (a+b)/2};
const r2=v=>Math.round(v*100)/100;
const AVC=q=>6-1.2*q+.12*q*q, MC=q=>6-2.4*q+.36*q*q, AC=q=>6/q+AVC(q);
const qMin=solve(q=>MC(q)-AC(q),3.5,8), ACmin=AC(qMin);
const costs=avc=>{const c=[{f:MC,x0:.8,x1:7.85,l:"MC",c:"a"},{f:AC,x0:1.35,x1:9.2,l:"AC",c:"b"}];
  if(avc)c.push({f:AVC,x0:.6,x1:8.8,l:"AVC",c:"m",d:1});return c};
const pq=(x,y)=>[[x,y]];

/* firm in perfect competition at price P */
function firm(P,o){o=o||{};const q=solve(x=>MC(x)-P,3.4,7.85),c=AC(q);
  const s={x:"Output",y:"Price, cost, revenue",cap:o.cap,
    lines:[...costs(o.avc),{p:[[0,P],[9.3,P]],l:"AR = MR",c:"c",lp:[9.3,P+(o.below?-.6:.3)],la:"end"}],
    guides:[{p:[q,P],xl:"Q*",yl:"P"}],areas:[],dots:[],text:[]};
  if(c<P-.05){s.areas.push({p:[[0,c],[q,c],[q,P],[0,P]],c:"g",o:.22});s.guides.push({p:[q,c],yl:"AC",xl:null});s.text.push({p:[q/2,(P+c)/2-.15],t:"profit",a:"middle"})}
  if(c>P+.05){s.areas.push({p:[[0,P],[q,P],[q,c],[0,c]],c:"r",o:.25});s.guides.push({p:[q,c],yl:"AC",xl:null});s.text.push({p:[q/2,(P+c)/2-.15],t:"loss",a:"middle"})}
  if(o.mark==="alloc")s.dots.push({p:[q,P],t:"P = MC",dx:-8,dy:-8,a:"end"});
  if(o.mark==="mcmr")s.dots.push({p:[q,P],t:"MC = MR",dx:-8,dy:-8,a:"end"});
  if(o.mark==="prod")s.dots.push({p:[q,P],t:"min AC",dx:-8,dy:-8,a:"end"});
  return s}
/* industry in perfect competition */
function industry(o){o=o||{};const s={x:"Quantity",y:"Price",cap:o.cap||"Industry",
  lines:[{p:[[2,9],[9.3,1.7]],l:"D",c:"b"},{p:[[1,2],[8,9]],l:"S1",c:"a"}],guides:[{p:[5,6],xl:"Q1",yl:"P1"}],arrows:[]};
  if(o.lr){const P=o.lr,k=2*P-11;s.lines.push({p:[[1-k,1],[9.3,9.3+k]],l:"S2",c:"c"});s.guides.push({p:[11-P,P],xl:"Q2",yl:"P2"});s.arrows.push({f:[6.6,7.6],t:[8.2,7.6]})}
  return s}
/* monopoly-style firm: AR = a − b·q */
function mono(a,b,o){o=o||{};const AR=q=>a-b*q,MR=q=>a-2*b*q;
  const qm=solve(q=>MR(q)-MC(q),1,7),Pm=AR(qm),c=AC(qm);
  const s={x:"Output",y:"Price, cost, revenue",cap:o.cap,
    lines:[...costs(),{f:AR,x0:0,x1:Math.min(9.3,(a-.6)/b),l:"AR = D",c:"c"},{f:MR,x0:0,x1:a/(2*b),c:"m",l:"MR",lp:[a/(2*b)+.15,.35]}],
    guides:[{p:[qm,Pm],xl:"Qm",yl:"Pm"},{p:[qm,MC(qm)],xl:null,yl:null}],areas:[],dots:[],text:[]};
  if(o.profit!==false&&c<Pm-.05){s.areas.push({p:[[0,c],[qm,c],[qm,Pm],[0,Pm]],c:"g",o:.22});s.guides.push({p:[qm,c],xl:null,yl:"AC"})}
  if(o.mcmr)s.dots.push({p:[qm,MC(qm)],t:"MC = MR",dx:8,dy:14});
  if(o.eff){const qa=solve(q=>AR(q)-MC(q),qm,7.85);
    s.areas.push({p:[[qm,AR(qm)],[qm,MC(qm)],[qa,AR(qa)]],c:"r",o:.35});
    s.guides.push({p:[qa,AR(qa)],xl:"Qc",yl:null});s.dots.push({p:[qa,AR(qa)],t:"P = MC",dx:6,dy:-8});
    s.dots.push({p:[qMin,ACmin],t:"min AC",dx:6,dy:16});}
  return s}
/* AD / AS */
const ADf=sh=>({f:x=>2+12/(x-sh+.8),x0:sh+.9,x1:9.3,lp:[sh+1.15,8.9]});
const SRASf=sh=>({f:x=>.6+1.1*(x-sh),x0:Math.max(.3,sh+.3),x1:Math.min(9.3,sh+7.8)});
const meet=(f,g,lo,hi)=>{const x=solve(v=>f(v)-g(v),lo,hi);return [x,f(x)]};
const adas={x:"Real GDP",y:"Price level"};
function adShift(sh1,sh2,o){o=o||{};const a1=ADf(sh1),a2=ADf(sh2),s1=SRASf(0);
  const e1=meet(a1.f,s1.f,sh1+1,9.3),e2=meet(a2.f,s1.f,sh2+1,9.3);
  const s={...adas,cap:o.cap,lines:[{...a1,l:o.l1||"AD1",c:"a"},{...a2,l:o.l2||"AD2",c:o.c2||"c",d:o.d2},{...s1,l:"SRAS",c:"b"}],
    guides:[{p:e1,xl:"Y1",yl:"P1"},{p:e2,xl:"Y2",yl:"P2"}],arrows:[]};
  const ya=6.6,xa=sh=>sh-.8+12/(ya-2),dir=sh2>sh1?1:-1;
  if(sh1!==sh2)s.arrows.push({f:[xa(sh1)+.25*dir,ya],t:[xa(sh2)-.25*dir,ya]});
  if(o.lras){s.lines.push({p:[[o.lras,.3],[o.lras,9.4]],l:"LRAS",c:"m",lp:[o.lras+.15,.6]})}
  return s}
const lrasFig=(cap)=>{const a=ADf(1),y1=a.f(5),y2=a.f(7);
  return {...adas,cap,lines:[{p:[[5,.4],[5,9.3]],l:"LRAS1",c:"a",lp:[4.85,9.4],la:"end"},{p:[[7,.4],[7,9.3]],l:"LRAS2",c:"c",lp:[7.15,9.4]},{...a,l:"AD",c:"b"}],
    guides:[{p:[5,y1],xl:"Y1",yl:"P1"},{p:[7,y2],xl:"Y2",yl:"P2"}],arrows:[{f:[5.2,7.5],t:[6.8,7.5]}]}};
/* PPC */
const arc=r=>{const p=[];for(let i=0;i<=40;i++){const t=i/40*Math.PI/2;p.push([r*Math.cos(t),r*Math.sin(t)])}return p};
const ppcAx={x:"Consumer goods",y:"Capital goods"};

const DD=[[1,9],[9,1]],SS=[[1,1],[9,9]];
const dsAx={x:"Quantity",y:"Price"};

/* ===================================================================== */
const DIAG={
/* ---------------- MICRO ---------------- */
"mi1.3|0":{figs:[{...ppcAx,lines:[{p:arc(7),cv:1,l:"PPC",lp:[6.2,4.6]}],
  guides:[{p:[3.5,6.06],xl:"C1",yl:"K1"},{p:[6.06,3.5],xl:"C2",yl:"K2"}],
  dots:[{p:[3.5,6.06],t:"A"},{p:[6.06,3.5],t:"B"},{p:[2.6,2.4],t:"U"}],arrows:[{f:[3.9,5.6],t:[5.6,3.9],c:"b"}]}],
 t:"Moving from A to B, the economy makes more consumer goods (C1 to C2) but has to give up capital goods (K1 to K2). The capital goods given up are the opportunity cost of the extra consumer goods.\nA movement along the curve is a reallocation of resources that are already fully employed. Every point on the PPC is productively efficient. A point inside it, like U, means some resources are unemployed or under-used."},
"mi1.3|1":{figs:[{...ppcAx,lines:[{p:arc(5.6),cv:1,l:"PPC1",lp:[4.1,4.6]},{p:arc(8),cv:1,l:"PPC2",c:"c",lp:[6.4,6.4]}],
  arrows:[{f:[4.1,4.1],t:[5.5,5.5]}],dots:[{p:[2.4,2.2],t:"U"}]}],
 t:"An outward shift (PPC1 to PPC2) means productive potential has grown, so the economy can make more of both goods. Causes are more or better factors of production: investment in capital, a larger or more skilled workforce, new technology, new resources.\nAn inward shift comes from losing capacity: war, natural disaster, emigration of skilled workers.\nDon't confuse a shift with U, a point inside the curve. U is unemployment of resources the economy already has, and fixing it doesn't need the curve to move. If technology improves in one industry only, the curve shifts out along that axis only."},
"mi1.3|2":{figs:[{...ppcAx,lines:[{p:arc(7),cv:1,l:"PPC",lp:[6.3,4.6]}],
  guides:[{p:[2,6.71],xl:"2",yl:null},{p:[4,5.74],xl:"4",yl:null},{p:[6,3.61],xl:"6",yl:null}],
  dots:[{p:[2,6.71]},{p:[4,5.74]},{p:[6,3.61]}],
  text:[{p:[3.1,7.1],t:"−1.0",c:"r",a:"middle"},{p:[5.4,5.4],t:"−2.1",c:"r",a:"middle"}]}],
 t:"Each extra 2 units of consumer goods costs more capital goods than the last (−1.0, then −2.1). The PPC is concave because resources aren't equally suited to producing everything, so opportunity cost rises as you specialise further.\nThe concept is useful because it turns every choice (a household's budget, a firm's investment, a government's spending) into a trade-off with a real sacrifice: more NHS spending means less on schools, higher taxes or more borrowing.\nIts limits: the next best alternative is often hard to value in money, and when resources are unemployed (inside the curve) producing more of one good may cost nothing at all."},

"mi2.2|0":{figs:[{...dsAx,lines:[{p:DD,l:"D"}],guides:[{p:[3,7],xl:"Q1",yl:"P1"},{p:[6,4],xl:"Q2",yl:"P2"}]}],
 t:"Demand slopes down: when price falls from P1 to P2, quantity demanded rises from Q1 to Q2, ceteris paribus.\nTwo effects explain it. The income effect: a lower price raises consumers' real income, so they can afford more. The substitution effect: the good is now cheaper relative to alternatives. Underneath both is diminishing marginal utility (2.7): each extra unit gives less satisfaction, so people only buy more if the price falls."},
"mi2.2|1":{figs:[{...dsAx,lines:[{p:[[0,8],[4,0]],l:"dA = dB",c:"m",d:1,lp:[4.2,.5]},{p:[[0,8],[8,0]],l:"D market",lp:[7.6,1.2]}],
  guides:[{p:[2,4],xl:"2",yl:"P"},{p:[4,4],xl:"4",yl:null}]}],
 t:"Market demand is the horizontal sum of every individual's demand: at each price, add up the quantity each consumer wants. Here two identical consumers each want 2 units at price P, so the market wants 4.\nMarket demand is flatter than any individual curve. It shifts when individual tastes or incomes change, and also when the number of consumers changes (population, a new market opening up)."},
"mi2.2|2":{figs:[
  {...dsAx,cap:"Ink cartridges: joint demand",lines:[{p:[[1,8],[8,1]],l:"D1"},{p:[[2,9],[9,2]],l:"D2",c:"c"},{p:SS,l:"S",c:"b"}],
   guides:[{p:[4.5,4.5],xl:"Q1",yl:"P1"},{p:[5.5,5.5],xl:"Q2",yl:"P2"}],arrows:[{f:[3.2,5.8],t:[4.4,6.6]}]},
  {...dsAx,cap:"Butter: composite demand for milk",lines:[{p:DD,l:"D",c:"b"},{p:[[1,1],[8,8]],l:"S1"},{p:[[1,3],[7,9]],l:"S2",c:"c"}],
   guides:[{p:[5,5],xl:"Q1",yl:"P1"},{p:[4,6],xl:"Q2",yl:"P2"}],arrows:[{f:[6.6,6.6],t:[5.4,7.4]}]}],
 t:"Joint demand: goods used together, like printers and ink. When the price of printers falls, more people buy printers, so demand for ink shifts right (left panel).\nCompetitive demand: substitutes, like tea and coffee. A rise in coffee's price shifts demand for tea right. It's the same picture, drawn in the tea market.\nComposite demand: one good wanted for several uses, like milk for both cheese and butter. If demand for cheese rises, more milk goes into cheese, so less is available for butter. The supply of butter falls and its price rises (right panel).\nHow big each effect is depends on how closely the goods are linked, which is what XED measures."},
"mi2.2|3":{figs:[{...dsAx,lines:[{p:DD,l:"D"}],guides:[{p:[3,7],xl:"Q1",yl:"P1"},{p:[6,4],xl:"Q2",yl:"P2"}],
  dots:[{p:[3,7],t:"A"},{p:[6,4],t:"B"}],arrows:[{f:[3.6,6.8],t:[5.6,4.8],c:"b"}],text:[{p:[5.2,6.3],t:"extension"}]}],
 t:"A change in the good's own price moves you along the demand curve; it never shifts it. A fall from P1 to P2 is an extension of demand (A to B). A rise from P2 to P1 is a contraction (B to A).\nUse the right words. Examiners reward the distinction between extension and contraction (a movement along the curve) and increase and decrease (a shift)."},
"mi2.2|4":{figs:[{...dsAx,lines:[{p:DD,l:"D1"},{p:[[3,9],[9.3,2.7]],l:"D2",c:"c"},{p:[[1,7],[7,1]],l:"D3",c:"m"}],
  arrows:[{f:[5.3,4.7],t:[7,4.7]},{f:[6.7,3.3],t:[5,3.3]}],guides:[{p:[5,5],xl:null,yl:"P"}]}],
 t:"Anything other than the good's own price shifts the whole curve. At the same price P, more or less is now demanded.\nIncrease (D1 to D2): higher incomes for a normal good, a rise in the price of a substitute, a fall in the price of a complement, successful advertising, a growing population, tastes moving towards the good.\nDecrease (D1 to D3): the opposite of each.\nA handy checklist is PIRATES: Population, Income, Related goods, Advertising, Tastes, Expectations, Seasons."},

"mi2.3|0":{figs:[{...dsAx,lines:[{p:SS,l:"S"}],guides:[{p:[3,3],xl:"Q1",yl:"P1"},{p:[7,7],xl:"Q2",yl:"P2"}]}],
 t:"Supply slopes up: a higher price makes production more profitable, so existing firms expand output and new firms are drawn in. In the short run, marginal costs rise as output increases (diminishing returns), so firms need a higher price to cover the extra cost of producing more."},
"mi2.3|1":{figs:[{...dsAx,lines:[{p:[[0,2],[3.8,9.6]],l:"sA = sB",c:"m",d:1,lp:[3.9,9.4]},{p:[[0,2],[7.6,9.6]],l:"S market"}],
  guides:[{p:[2,6],xl:"2",yl:"P"},{p:[4,6],xl:"4",yl:null}]}],
 t:"Market supply is the horizontal sum of every firm's supply. At price P, two identical firms each supply 2 units, so the market supplies 4. Market supply shifts right when new firms enter the industry, as well as when each firm's costs change."},
"mi2.3|2":{figs:[
  {...dsAx,cap:"Leather: joint supply with beef",lines:[{p:DD,l:"D",c:"b"},{p:[[1,2],[8,9]],l:"S1"},{p:[[2,1],[9,8]],l:"S2",c:"c"}],
   guides:[{p:[4.5,5.5],xl:"Q1",yl:"P1"},{p:[5.5,4.5],xl:"Q2",yl:"P2"}],arrows:[{f:[6.2,7.6],t:[7.4,6.6]}]},
  {...dsAx,cap:"Wheat: competitive supply with rapeseed",lines:[{p:DD,l:"D",c:"b"},{p:[[1,1],[8,8]],l:"S1"},{p:[[1,3],[7,9]],l:"S2",c:"c"}],
   guides:[{p:[5,5],xl:"Q1",yl:"P1"},{p:[4,6],xl:"Q2",yl:"P2"}],arrows:[{f:[6.6,6.6],t:[5.4,7.4]}]}],
 t:"Joint supply: making one good automatically makes another, like beef and leather. If demand for beef rises, more cattle are slaughtered, so the supply of leather increases and its price falls (left).\nCompetitive supply: the same resources can make one good or another, like a farmer's land growing wheat or rapeseed. If rapeseed's price rises, land moves into rapeseed, so the supply of wheat falls and its price rises (right)."},
"mi2.3|3":{figs:[{...dsAx,lines:[{p:SS,l:"S"}],guides:[{p:[3,3],xl:"Q1",yl:"P1"},{p:[7,7],xl:"Q2",yl:"P2"}],
  dots:[{p:[3,3],t:"A",dx:8,dy:4},{p:[7,7],t:"B",dx:8,dy:4}],arrows:[{f:[3.5,3.9],t:[6.4,6.8],c:"b"}],text:[{p:[3.2,5.6],t:"extension"}]}],
 t:"A change in the good's own price moves you along the supply curve. A rise from P1 to P2 is an extension of supply (A to B); a fall is a contraction. A shift of the curve is a different thing, covered next."},
"mi2.3|4":{figs:[{...dsAx,lines:[{p:SS,l:"S1"},{p:[[3,1],[9.3,7.3]],l:"S2",c:"c"},{p:[[1,3],[7,9]],l:"S3",c:"m"}],
  arrows:[{f:[5.3,5],t:[6.8,5]},{f:[6.7,7],t:[5.2,7]}]}],
 t:"Anything other than the good's own price shifts supply.\nIncrease (S1 to S2): lower costs of production (wages, raw materials, energy), better technology or productivity, a subsidy, more firms entering, good weather for farm goods.\nDecrease (S1 to S3): higher costs, an indirect tax, firms leaving, a supply shock like a poor harvest or war disrupting energy supplies.\nA shift right means more is supplied at every price, which is the same thing as being able to supply the same amount more cheaply."},

"mi2.4|0":{figs:[{...dsAx,areas:[{p:[[0,9],[0,5],[4,5]],c:"a",o:.28},{p:[[0,1],[0,5],[4,5]],c:"c",o:.28}],
  lines:[{p:[[0,9],[8,1]],l:"D",c:"b"},{p:[[0,1],[8,9]],l:"S",c:"b"}],guides:[{p:[4,5],xl:"Qe",yl:"Pe"}],
  text:[{p:[1.1,6.1],t:"CS"},{p:[1.1,3.5],t:"PS"}]}],
 t:"Consumer surplus is the gap between what consumers are willing to pay (the demand curve) and what they actually pay (the price). It's the area under demand and above price.\nProducer surplus is the gap between the price firms receive and the lowest price they'd accept (the supply curve). It's the area above supply and below price.\nAt the free-market equilibrium, CS + PS is as large as it can be. That's why a competitive market with no market failure is allocatively efficient."},
"mi2.4|1":{figs:[{...dsAx,areas:[{p:[[0,9],[0,6],[3,6]],c:"a",o:.28},{p:[[0,6],[0,5],[4,5],[3,6]],c:"r",o:.32}],
  lines:[{p:[[0,9],[8,1]],l:"D",c:"b"}],guides:[{p:[3,6],xl:"Q2",yl:"P2"},{p:[4,5],xl:"Q1",yl:"P1"}],
  text:[{p:[.5,6.6],t:"CS"},{p:[4.5,5.7],t:"lost CS",c:"r"}]}],
 t:"When price rises from P1 to P2, consumer surplus shrinks to the small triangle. The red area is what consumers lose. The rectangle part is surplus transferred to producers on the units still bought. The small triangle at the end is surplus lost because consumers no longer buy those units at all.\nA fall in price does the reverse. The more inelastic demand is, the more of the loss is a transfer to producers rather than lost trade."},
"mi2.4|2":{figs:[{...dsAx,areas:[{p:[[0,1],[0,5],[4,5]],c:"c",o:.28},{p:[[0,5],[0,6],[5,6],[4,5]],c:"g",o:.3}],
  lines:[{p:[[0,1],[8,9]],l:"S",c:"b"}],guides:[{p:[4,5],xl:"Q1",yl:"P1"},{p:[5,6],xl:"Q2",yl:"P2"}],
  text:[{p:[.5,3.6],t:"PS"},{p:[.3,6.4],t:"gain in PS",c:"g"}]}],
 t:"A higher price raises producer surplus. Firms earn more on the units they were already selling (the rectangle) and also gain surplus on the extra units they now supply (the small triangle).\nThis is why producers lobby for minimum prices and subsidies, and why a fall in price, from new competition say, squeezes them."},

"mi2.5|0":{figs:[{...dsAx,lines:[{p:DD,l:"D1"},{p:[[3,9],[9.3,2.7]],l:"D2",c:"c"},{p:SS,l:"S",c:"b"}],
  guides:[{p:[5,5],xl:"Q1",yl:"P1"},{p:[6,6],xl:"Q2",yl:"P2"}],arrows:[{f:[3.4,6.2],t:[4.8,6.8]}]}],
 t:"Price settles where demand meets supply. If demand rises from D1 to D2, there's excess demand at the old price P1, so price is bid up. The higher price rations the good among buyers and signals firms to supply more (an extension of supply) until the market reaches its new equilibrium at P2, Q2.\nThis is the price mechanism doing its three jobs: signalling, incentivising and rationing."},
"mi2.5|1":{figs:[{...dsAx,lines:[{p:DD,l:"D"},{p:SS,l:"S",c:"b"},{p:[[0,7],[7,7]],c:"m",w:1,d:1},{p:[[0,3],[7,3]],c:"m",w:1,d:1},
  {p:[[3,7],[7,7]],c:"r",w:3},{p:[[3,3],[7,3]],c:"r",w:3}],
  text:[{p:[-.2,6.85],t:"P1",c:"m",a:"end"},{p:[-.2,2.85],t:"P2",c:"m",a:"end"},{p:[5,7.45],t:"excess supply",a:"middle"},{p:[5,2.2],t:"excess demand",a:"middle"}],
  dots:[{p:[5,5],t:"E",dx:10,dy:4}]}],
 t:"Equilibrium (E) is where planned demand equals planned supply, so nothing pushes price to change.\nAbove it, at P1, firms want to sell more than consumers want to buy: excess supply. Unsold stock builds up and firms cut prices.\nBelow it, at P2, there's excess demand: shortages and queues, so price rises.\nA market only stays in disequilibrium if something stops price adjusting, such as a maximum or minimum price set by the government."},

"mi2.6|0":{figs:[
  {...dsAx,cap:"Extreme and unitary PED",lines:[{p:[[3,.4],[3,9.3]],l:"PED = 0",c:"b",lp:[3.15,9.2]},{p:[[.2,7],[9.3,7]],l:"PED = ∞",c:"c",lp:[9.3,7.3],la:"end"},{f:x=>16/x,x0:1.9,x1:9.3,l:"PED = 1",lp:[9.3,2.25],la:"end"}]},
  {...dsAx,cap:"Elastic and inelastic demand",lines:[{p:[[3.67,9],[6.33,1]],l:"inelastic",c:"b",lp:[6.5,1.2]},{p:[[1,6.33],[9,3.67]],l:"elastic",lp:[9.1,3.45]}],guides:[{p:[5,5],xl:"Q",yl:"P"}]},
  {x:"Quantity",y:"Price",cap:"Price elasticity of supply",lines:[{p:[[0,0],[8.6,8.6]],l:"PES = 1",c:"b",lp:[8.7,8.2]},{p:[[0,3],[6.3,9.3]],l:"PES > 1",c:"c",lp:[6.4,9.4]},{p:[[3,0],[9.3,6.3]],l:"PES < 1",lp:[9.3,5.6],la:"end"}]}],
 t:"PED = %ΔQd ÷ %ΔP. Ignore the minus sign when you classify it: above 1 is elastic, below 1 inelastic, exactly 1 unitary, 0 perfectly inelastic, infinite perfectly elastic. Unitary elasticity is a curve (a rectangular hyperbola), not a 45° line. Slope and elasticity are different things: elasticity changes all the way along a straight-line demand curve.\nYED = %ΔQd ÷ %ΔY. Positive for normal goods (above 1 for luxuries, between 0 and 1 for necessities), negative for inferior goods. XED = %ΔQd of good A ÷ %ΔP of good B. Positive for substitutes, negative for complements, close to zero if they're unrelated. Both show up as shifts of demand, not as the slope.\nPES = %ΔQs ÷ %ΔP. Any straight supply curve through the origin has PES = 1 at every point. One that starts on the price axis is elastic; one that starts on the quantity axis is inelastic."},
"mi2.6|1":{figs:[{...dsAx,areas:[{p:[[0,5],[3,5],[3,7],[0,7]],c:"r",o:.3},{p:[[3,0],[5,0],[5,5],[3,5]],c:"g",o:.3}],
  lines:[{p:DD,l:"D",c:"b"}],guides:[{p:[3,7],xl:"Q1",yl:"P1"},{p:[5,5],xl:"Q2",yl:"P2"}],
  text:[{p:[1.5,5.75],t:"−",c:"r",a:"middle"},{p:[4,2.3],t:"+",c:"g",a:"middle"},{p:[6.2,6.8],t:"elastic",c:"m"},{p:[6.4,2.2],t:"inelastic",c:"m"}],dots:[{p:[5,5],t:"PED = 1",dx:8,dy:-2}]}],
 t:"Total revenue = P × Q. On a straight-line demand curve, demand is elastic above the midpoint and inelastic below it.\nHere price falls from P1 to P2 in the elastic section. The revenue lost on existing sales (red) is smaller than the revenue gained from the extra sales (green), so TR rises.\nThe rule: if demand is elastic, cutting price raises revenue; if demand is inelastic, raising price does. TR is at its maximum at the midpoint, where PED = 1. Firms use this when setting prices, and governments use it when choosing what to tax: taxing goods with inelastic demand raises the most revenue."},

"mi2.8|0":{figs:[
  {x:"Quantity",y:"Costs, benefits",cap:"Negative production externality",areas:[{p:[[3,6],[4,7],[4,5]],c:"r",o:.4}],
   lines:[{p:[[0,9],[8,1]],l:"MPB = MSB",c:"b",lp:[8,1.4],la:"end"},{p:[[0,1],[8,9]],l:"MPC",lp:[8.1,8.6]},{p:[[0,3],[6,9]],l:"MSC",c:"c",lp:[6.1,9.2]}],
   guides:[{p:[3,6],xl:"Q*",yl:"P*"},{p:[4,5],xl:"Qm",yl:"Pm"}]},
  {x:"Quantity",y:"Costs, benefits",cap:"Positive consumption externality",areas:[{p:[[3,5],[3,7],[4,6]],c:"r",o:.4}],
   lines:[{p:[[0,8],[7,1]],l:"MPB",lp:[7.1,1.1]},{p:[[0,10],[9,1]],l:"MSB",c:"c",lp:[9.1,1.1]},{p:[[0,2],[7,9]],l:"MPC = MSC",c:"b",lp:[7.1,9.2]}],
   guides:[{p:[3,5],xl:"Qm",yl:"Pm"},{p:[4,6],xl:"Q*",yl:"P*"}]}],
 t:"Negative production externality (left): producers ignore the external cost of things like pollution, so the market produces where MPC = MPB, at Qm. The social optimum is where MSC = MSB, at Q*. The units between Q* and Qm are overproduced: they cost society more than they're worth. That's the red welfare loss triangle. Price is also too low.\nPositive consumption externality (right): consumers ignore the benefit to others of things like vaccination or education, so consumption stops at Qm, where MPB = MPC. That's below Q*, where MSB = MSC. The red triangle is the value of the missing units.\nMSC = MPC + MEC and MSB = MPB + MEB. The vertical gap between the private and social curves is the marginal external cost or benefit.\nThe other two cases work the same way. A negative consumption externality (passive smoking) puts MSB below MPB. A positive production externality (a firm training workers who later move to other firms) puts MSC below MPC."},
"mi2.9|0":{figs:[{x:"Quantity",y:"Costs, benefits",areas:[{p:[[3,5],[3,7],[4,6]],c:"r",o:.4}],
  lines:[{p:[[0,8],[7,1]],l:"perceived MPB",lp:[5.7,1.7]},{p:[[0,10],[9,1]],l:"true MPB",c:"c",lp:[7.3,3.2]},{p:[[0,2],[7,9]],l:"MPC",c:"b",lp:[7.1,9.2]}],
  guides:[{p:[3,5],xl:"Qm",yl:null},{p:[4,6],xl:"Q*",yl:null}]}],
 t:"With imperfect information, consumers undervalue merit goods like pensions, health checks and education, because they misjudge the long-term benefit to themselves. Their perceived demand sits below the full-information demand, so they consume Qm instead of Q*. The red triangle is the welfare loss.\nFor demerit goods like cigarettes and gambling it works the other way: perceived MPB sits above true MPB, and the good is overconsumed.\nTwo other forms of information failure cause misallocation too. Asymmetric information: one side of a deal knows more than the other (used-car sellers, people buying insurance). Moral hazard: people take more risk once they're protected from its cost (once insured, say)."},

"mi3.2|0":{figs:[{x:"Workers (variable factor)",y:"Output per worker",
  lines:[{p:[[.5,3],[2,6.2],[3.3,7.6],[5,6],[6.5,3.6],[8,1.2]],cv:1,l:"MP",lp:[8.1,1.3]},{p:[[.5,3],[2.5,5.3],[5,6],[7.5,5.2],[9.5,4]],cv:1,l:"AP",c:"c",lp:[9.4,4.4],la:"end"}],
  dots:[{p:[3.3,7.6],t:"diminishing returns begin",dx:8,dy:-4}],guides:[{p:[3.3,7.6],xl:"L1",yl:null}]}],
 t:"In the short run at least one factor, usually capital, is fixed. Adding workers to a fixed amount of capital at first raises marginal product, as workers specialise. Past L1, each extra worker adds less output than the one before: diminishing marginal returns. MP cuts AP at AP's highest point.\nWhy this matters: marginal cost = wage ÷ MP, so falling MP means rising marginal cost. That's why short-run MC and AC curves are U-shaped.\nThe law only applies in the short run. In the long run every factor can be varied."},
"mi3.2|1":{figs:[{x:"Output",y:"Long-run average cost",
  lines:[{p:[[1,8.6],[3,5.6],[5,4.4],[7,4.4],[8.5,5.6],[9.3,7]],cv:1,l:"LRAC1"},{p:[[1,7],[3,4],[5,2.8],[7,2.8],[8.5,4],[9.3,5.4]],cv:1,l:"LRAC2",c:"c"}],
  arrows:[{f:[6,4.25],t:[6,3.05],c:"b"},{f:[1.6,8.6],t:[3.4,6.2],c:"m"}],text:[{p:[2.6,8.2],t:"internal EoS"},{p:[6.2,3.5],t:"external EoS"}]}],
 t:"Internal economies of scale come from the firm's own growth: as output rises, long-run average cost falls (a movement down LRAC1). The types are technical (bigger, more efficient machinery, like container ships), purchasing (bulk-buying discounts), managerial (specialist managers), financial (big firms borrow more cheaply), marketing (advertising costs spread over more units) and risk-bearing (diversifying across products and markets).\nExternal economies of scale come from the growth of the whole industry in an area: a pool of skilled local labour, specialist suppliers nearby, shared infrastructure (Silicon Valley, the City of London). They lower every firm's costs at every output, so the whole curve shifts down (LRAC1 to LRAC2)."},
"mi3.2|2":{figs:[{x:"Output",y:"Long-run average cost",
  lines:[{p:[[1,8.6],[3,5.6],[5,4.4],[7,4.4],[8.5,5.6],[9.3,7]],cv:1,l:"LRAC"}],guides:[{p:[6,4.3],xl:"Q*",yl:null}],
  text:[{p:[3.3,3],t:"economies",c:"g",a:"middle"},{p:[8.2,3],t:"diseconomies",c:"r",a:"middle"}],
  arrows:[{f:[2,3.7],t:[4.6,3.7],c:"g"},{f:[7.2,3.7],t:[9.3,3.7],c:"r"}]}],
 t:"Past output Q*, LRAC rises: diseconomies of scale. The causes are mostly managerial. Communication slows down across more layers of management, coordination and control get harder, and workers in a huge organisation can feel alienated, so motivation and productivity fall.\nThere are external diseconomies too, when an industry crowds into one area: congestion, higher rents, and firms bidding up wages for scarce skills."},
"mi3.2|3":{figs:[{x:"Output",y:"Long-run average cost",
  lines:[{f:x=>4+(x<4.5?.55*(4.5-x)**2:x>7.5?(x-7.5)**2:0),x0:1.4,x1:9.3,l:"LRAC"}],guides:[{p:[4.5,4],xl:"MES",yl:"min"}],dots:[{p:[4.5,4]}]}],
 t:"Minimum efficient scale (MES) is the lowest output at which LRAC reaches its minimum.\nIf MES is large compared with total market demand (water supply, railways, aircraft manufacturing), only a few firms can produce at the lowest cost. A high MES is a barrier to entry and pushes the market towards oligopoly or natural monopoly.\nIf MES is small (hairdressers, cafés), many small firms can compete at the lowest cost."},

/* perfect competition */
"mi4.1|0":{figs:[firm(6,{cap:"Short run: supernormal profit"}),firm(3.3,{cap:"Short run: loss",avc:1})],
 t:"In the short run, price is set by industry demand and supply, and the firm takes it as given. It produces where MC = MR.\nIf price is above AC at that output, it earns supernormal profit (left, green).\nIf price is below AC but above AVC, it makes a loss (right, red) but keeps producing in the short run, because it covers its variable costs and some of its fixed costs.\nIf price falls below AVC, the shutdown point, it stops producing altogether."},
"mi4.1|1":{figs:[industry({lr:r2(ACmin),cap:"Industry: firms enter"}),firm(r2(ACmin),{cap:"Firm: normal profit",below:1,mark:"prod"})],
 t:"Supernormal profit is a signal. With no barriers to entry and perfect information, new firms enter the industry, supply shifts right (S1 to S2) and price falls. This continues until price equals minimum average cost and every firm earns only normal profit (AR = AC).\nLosses work in reverse: firms leave, supply falls and price rises back to minimum AC."},
"mi4.1|2":{figs:[industry({cap:"Industry sets the price"}),firm(6,{cap:"Firm takes it"})],
 t:"Each firm is too small to affect the market price, and every firm sells an identical product. So a firm can sell as much as it likes at the market price, and nothing at all above it. Its demand curve is horizontal (perfectly elastic) at the price the industry sets, which means P = AR = MR.\nRaising its price would lose every customer. Cutting it is pointless, because it can already sell everything it makes at the market price."},
"mi4.1|3":{figs:[firm(6,{mark:"mcmr"})],
 t:"Profit is maximised where MC = MR, with MC rising. If MC < MR, producing one more unit adds to profit. If MC > MR, it reduces profit.\nFor a price taker MR = P, so the firm produces where MC = P. That means the part of the MC curve above AVC is the firm's supply curve."},
"mi4.1|4":{figs:[firm(6,{mark:"alloc"})],
 t:"Allocative efficiency is where price equals marginal cost. The value consumers place on the last unit equals what it costs to produce, so resources go where they're most wanted.\nA perfectly competitive firm produces where MC = MR = P, so it's allocatively efficient in both the short run and the long run."},
"mi4.1|5":{figs:[firm(r2(ACmin),{below:1,mark:"prod"})],
 t:"Productive efficiency means producing at the lowest point on the AC curve, where MC = AC.\nIn the long run, entry and exit push price down to minimum AC, so firms produce exactly there. In the short run, a firm earning supernormal profit produces beyond minimum AC, so it's only productively efficient in the long run."},

/* monopoly */
"mi4.2|0":{figs:[mono(9,.8)],
 t:"A monopolist faces the whole market demand curve (AR), which slopes down. Its MR curve falls twice as steeply. It produces where MC = MR (Qm) and charges the highest price consumers will pay for that output, read off AR (Pm).\nBecause AR > AC at Qm, it earns supernormal profit (green). High barriers to entry stop rivals coming in and competing it away, so the profit lasts into the long run. Those barriers include economies of scale, legal protection like patents and licences, control of key resources, and brand loyalty."},
"mi4.2|1":{figs:[{x:"Output",y:"Price",lines:[{f:q=>9-.8*q,x0:0,x1:9.3,l:"AR = D",c:"c"}],guides:[{p:[2.5,7],xl:"Q1",yl:"P1"},{p:[6,4.2],xl:"Q2",yl:"P2"}],dots:[{p:[2.5,7]},{p:[6,4.2]}]}],
 t:"Because it is the whole industry, a monopolist can set its price. What it can't do is set price and quantity at the same time. Charging a higher price (P1) means selling less (Q1): it moves up its demand curve. It picks the point on AR that maximises profit."},
"mi4.2|2":{figs:[mono(9,.8,{mcmr:1})],
 t:"To find the profit-maximising point: MC = MR gives Qm, then go straight up to AR to read off the price, Pm.\nA monopolist always produces on the elastic part of its demand curve, because that's where MR is positive."},
"mi4.2|3":{figs:[mono(9,.8,{eff:1,profit:false})],
 t:"At Qm, price is above marginal cost, so the monopolist is allocatively inefficient: consumers value extra units more than they cost to make. The red triangle is the deadweight welfare loss compared with the competitive output Qc, where P = MC. The firm isn't at minimum AC either, so it's productively inefficient. Without competition it may also suffer X-inefficiency: slack that pushes costs above the AC curve.\nThe other side of the argument: supernormal profit can fund R&D (dynamic efficiency), and economies of scale may give a monopoly lower costs than a competitive industry would have."},
"mi4.2|4":{figs:[
  {x:"Output",y:"Price, cost",cap:"Market A: inelastic demand",areas:[{p:[[0,2],[2.5,2],[2.5,5.5],[0,5.5]],c:"g",o:.22}],
   lines:[{f:q=>9-1.4*q,x0:0,x1:5.7,l:"AR",c:"c"},{f:q=>9-2.8*q,x0:0,x1:3.2,l:"MR",c:"m",lp:[3.3,.35]},{p:[[0,2],[9.3,2]],l:"MC = AC",lp:[9.3,2.3],la:"end"}],
   guides:[{p:[2.5,5.5],xl:"Qa",yl:"Pa"}]},
  {x:"Output",y:"Price, cost",cap:"Market B: elastic demand",areas:[{p:[[0,2],[3.75,2],[3.75,3.5],[0,3.5]],c:"g",o:.22}],
   lines:[{f:q=>5-.4*q,x0:0,x1:9.3,l:"AR",c:"c"},{f:q=>5-.8*q,x0:0,x1:6.25,l:"MR",c:"m",lp:[6.35,.35]},{p:[[0,2],[9.3,2]],l:"MC = AC",lp:[9.3,2.3],la:"end"}],
   guides:[{p:[3.75,3.5],xl:"Qb",yl:"Pb"}]}],
 t:"Third-degree price discrimination means charging different groups different prices for the same product, for reasons that have nothing to do with cost. Examples: peak and off-peak train tickets, student discounts.\nThree conditions are needed: the firm has market power, it can keep the markets separate so goods can't be resold between them, and the groups have different PEDs.\nThe firm sets MC = MR in each market. It charges a high price where demand is inelastic (A) and a low price where it's elastic (B).\nProfit rises, and producer surplus grows at consumers' expense. On the other hand, some consumers who would be priced out by a single price, like students and pensioners, now get served."},
"mi4.2|5":(function(){const AR=q=>8-.75*q;return {figs:[{x:"Output",y:"Price, cost",
  lines:[{f:q=>1.5+10/q,x0:1.3,x1:9.3,l:"AC",c:"b"},{p:[[0,1.5],[9.3,1.5]],l:"MC",lp:[.2,.85]},{f:AR,x0:0,x1:9.3,l:"AR",c:"c",lp:[.3,8.3]},{f:q=>8-1.5*q,x0:0,x1:5.33,l:"MR",c:"m",lp:[5.45,.35]}],
  guides:[{p:[4.33,AR(4.33)],xl:"Qm",yl:"Pm"},{p:[6.67,3],xl:"Qac",yl:"P=AC"},{p:[8.67,1.5],xl:"Qa",yl:null}],
  dots:[{p:[4.33,AR(4.33)]},{p:[6.67,3]},{p:[8.67,1.5],t:"P = MC",dx:-4,dy:-8,a:"end"}]}],
 t:"A natural monopoly has economies of scale so large that LRAC is still falling at the output that would supply the whole market. Examples: water pipes, rail track, the National Grid. One firm can supply everyone more cheaply than two could.\nLeft alone, it sets MC = MR and charges Pm.\nForcing it to price at MC (the allocatively efficient Qa) means price is below AC, so it makes a loss and would need a subsidy.\nThat's why natural monopolies are usually nationalised or regulated. A common compromise is average-cost pricing (P = AC at Qac), where the firm just breaks even."}})(),

/* monopolistic competition */
"mi4.3|0":{figs:[mono(8,.5,{cap:"Short run"})],
 t:"Monopolistic competition has many firms selling slightly different products (restaurants, hairdressers, clothing brands). Each faces a downward-sloping demand curve, but a fairly elastic one, because close substitutes are everywhere.\nIn the short run the firm produces where MC = MR and can earn supernormal profit (shown in green) or make a loss."},
"mi4.3|1":(function(){const q0=4,s=-6/16-1.2+.24*q0,a=AC(q0)-s*q0,b=-s;return {figs:[{...mono(a,b,{profit:false,cap:"Long run"}),dots:[{p:[q0,AC(q0)],t:"AR = AC",dx:8,dy:-6}]}],
 t:"Barriers to entry are low, so supernormal profit attracts new firms. Customers spread across more rivals, so each firm's demand curve shifts left and becomes more elastic. This continues until AR just touches AC at the output where MC = MR. At that point P = AC, so firms earn only normal profit."}})(),
"mi4.3|2":(function(){const q0=4,s=-6/16-1.2+.24*q0,a=AC(q0)-s*q0,b=-s;const f=mono(a,b,{profit:false,mcmr:1});
 f.dots.push({p:[qMin,ACmin],t:"min AC",dx:6,dy:16});f.guides.push({p:[qMin,ACmin],xl:"Qp",yl:null});return {figs:[f],
 t:"In long-run equilibrium P = AC, so profit is normal. But P > MC, so the market is allocatively inefficient. And firms produce at Qm, below the minimum-AC output Qp, so they're productively inefficient too. The gap between Qm and Qp is excess capacity: think of half-empty restaurants.\nThe benefit is variety and choice, which consumers value. You can argue the inefficiency is the price of that variety."}})(),

/* labour */
"mi5.1|0":{figs:[{x:"Quantity of labour",y:"Wage, MRP",lines:[{p:[[1,8.6],[3,6.6],[5,4.6],[7,3],[9.2,1.8]],cv:1,l:"MRP = D",lp:[9.2,2.3],la:"end"},{p:[[0,4.6],[9.3,4.6]],c:"m",w:1,d:1},{p:[[0,3],[9.3,3]],c:"m",w:1,d:1}],
  guides:[{p:[5,4.6],xl:"L1",yl:"W1"},{p:[7,3],xl:"L2",yl:"W2"}]}],
 t:"Marginal revenue product (MRP) = marginal physical product × marginal revenue. A profit-maximising firm keeps hiring until the wage equals the MRP of the last worker hired.\nBecause diminishing returns make marginal physical product fall, MRP slopes down. So the MRP curve is the firm's demand curve for labour. At wage W1 it hires L1; if the wage falls to W2, it hires L2.\nAnything that raises productivity, or the price of the product, shifts MRP right.\nThe theory has limits: MRP is hard to measure for many jobs (teachers, nurses), and many wages are set by bargaining or by law rather than by MRP."},
"mi5.2|0":{figs:[{x:"Quantity of labour",y:"Wage",areas:[{p:[[0,1],[0,5],[4,5]],c:"a",o:.3},{p:[[0,0],[0,1],[4,5],[4,0]],c:"c",o:.25}],
  lines:[{p:[[0,9],[8,1]],l:"D = MRP",c:"b",lp:[8,1.4],la:"end"},{p:[[0,1],[8,9]],l:"S",c:"b"}],guides:[{p:[4,5],xl:"L",yl:"W"}],
  text:[{p:[.4,3.7],t:"economic rent"},{p:[1.2,1.2],t:"transfer earnings"}]}],
 t:"Transfer earnings are the minimum a worker must be paid to stay in this job rather than move to their next best one. They're the area under the supply curve.\nEconomic rent is anything earned above that: the area above supply and below the wage.\nWhen labour supply is inelastic (top footballers, surgeons with rare skills), most of the wage is economic rent. When it's elastic (low-skilled jobs anyone can move into), most of it is transfer earnings."},
"mi5.3|0":{figs:[{x:"Quantity of labour",y:"Wage",lines:[{p:DD,l:"D = MRP"},{p:SS,l:"S",c:"b"}],guides:[{p:[5,5],xl:"Le",yl:"We"}]}],
 t:"A highly competitive labour market has many employers and many workers, and none of them can set the wage. The wage settles where the demand for labour (MRP) meets the supply of labour. Each firm is a wage taker: it faces a horizontal supply of labour at We and can hire as many workers as it wants at that wage."},
"mi5.3|1":{figs:[
  {x:"Quantity of labour",y:"Wage",cap:"Demand for labour rises",lines:[{p:DD,l:"D1"},{p:[[3,9],[9.3,2.7]],l:"D2",c:"c"},{p:SS,l:"S",c:"b"}],guides:[{p:[5,5],xl:"L1",yl:"W1"},{p:[6,6],xl:"L2",yl:"W2"}]},
  {x:"Quantity of labour",y:"Wage",cap:"Supply of labour falls",lines:[{p:DD,l:"D",c:"b"},{p:[[1,1],[8,8]],l:"S1"},{p:[[1,3],[7,9]],l:"S2",c:"c"}],guides:[{p:[5,5],xl:"L1",yl:"W1"},{p:[4,6],xl:"L2",yl:"W2"}]}],
 t:"Demand for labour rises (left) if workers become more productive or if demand for the product rises, because labour is a derived demand. Wages and employment both rise.\nSupply of labour falls (right) if training requirements get tougher, migration falls or the job becomes less attractive. The wage rises but employment falls.\nWhich of the two moves more, wage or employment, depends on the elasticities of demand and supply."},

/* ---------------- MACRO ---------------- */
"ma1.2|0":(function(){const a=ADf(0);return {figs:[{...adas,lines:[{...a,l:"AD"}],guides:[{p:[3,a.f(3)],xl:"Y1",yl:"P1"},{p:[6,a.f(6)],xl:"Y2",yl:"P2"}]}],
 t:"AD = C + I + G + (X − M). It slopes down because a lower price level does three things. It raises the real value of people's wealth (the wealth effect). It makes UK goods more competitive, so net exports rise (the trade effect). And it tends to lower interest rates, which encourages borrowing (the interest rate effect).\nA change in the price level is a movement along AD, not a shift."}})(),
"ma1.2|1":{figs:[{...adas,lines:[{...ADf(0),l:"AD1"},{...ADf(2),l:"AD2",c:"c"},{...ADf(-1.5),l:"AD3",c:"m"}],arrows:[{f:[2.6,5.9],t:[4.4,5.9]}]}],
 t:"Any change in C, I, G or (X − M) that isn't caused by the price level shifts AD.\nRight (AD1 to AD2): higher consumer or business confidence, lower interest rates, rising house prices, more government spending, tax cuts, a weaker pound, faster growth in trading partners.\nLeft (AD1 to AD3): the reverse of each, such as the 2008 credit crunch, which hit both consumption and investment."},
"ma1.3|0":{figs:[{...adas,lines:[{...SRASf(0),l:"SRAS"},{p:[[6.5,.3],[6.5,9.4]],l:"LRAS",c:"c",lp:[6.65,9.2]}],text:[{p:[6.5,-.95],t:"Yfe",c:"m",a:"middle"}]}],
 t:"SRAS slopes up. In the short run some costs are fixed, such as wages agreed in contracts, so a higher price level makes production more profitable and firms produce more.\nLRAS is vertical at the full-capacity level of output (Yfe). In the long run, output depends on the quantity and quality of the factors of production, not on the price level. This is the neo-classical view; the Keynesian alternative is in 2.8."},
"ma1.3|1":(function(){const a=ADf(1),s1=SRASf(0),s2=SRASf(-2),e1=meet(a.f,s1.f,2,9.3),e2=meet(a.f,s2.f,2,9.3);return {figs:[
  {...adas,cap:"SRAS shifts left: cost shock",lines:[{...a,l:"AD",c:"b"},{...s1,l:"SRAS1"},{...s2,l:"SRAS2",c:"c"}],guides:[{p:e1,xl:"Y1",yl:"P1"},{p:e2,xl:"Y2",yl:"P2"}],arrows:[{f:[7,6.6],t:[5.4,6.6]}]},
  lrasFig("LRAS shifts right: more capacity")],
 t:"SRAS shifts with production costs that don't depend on the price level. These include wages, raw material and energy prices, indirect taxes and subsidies, the exchange rate (which changes import costs), and short-run productivity. The 2022 energy price shock shifted SRAS left (left panel): a higher price level and lower output, which is stagflation.\nLRAS shifts with the economy's productive capacity: the quantity and quality of labour and capital, technology, institutions and incentives. A rightward shift (right panel) means more output at a lower price level. This is the only way to get growth that lasts."}})(),
"ma1.5|0":(function(){const s=adShift(0,1.6,{d2:1});s.lines.push({...ADf(3.4),l:"AD3",c:"c"});s.guides.push({p:meet(ADf(3.4).f,SRASf(0).f,3,9.3),xl:"Y3",yl:"P3"});s.lines[1].c="m";s.lines[1].l="AD2";
 const g=x=>5+1.2*Math.sin(x*1.1),i=x=>5+3.2*Math.sin(x*1.1+.5);
 return {figs:[{...s,cap:"Multiplier"},{x:"Time",y:"% change",cap:"Accelerator",lines:[{f:g,x0:0,x1:9.3,l:"GDP",c:"b"},{f:i,x0:0,x1:9.3,l:"Investment"}]}],
 t:"The multiplier: an initial injection, such as £10bn of extra government spending, becomes someone's income. They spend part of it, which becomes someone else's income, and so on. The final rise in GDP = the injection × k, where k = 1 ÷ (1 − MPC) = 1 ÷ MPW, and MPW = MPS + MPT + MPM. So AD ends up shifting beyond the first round (AD2) all the way to AD3.\nWhat decides the size of k is how much leaks out at each round: saving, tax and imports. The UK is very open to trade and has relatively high taxes, so its multiplier is fairly small.\nThe accelerator: investment depends on the rate of change of GDP. When output growth speeds up, firms need more capital, so investment jumps by much more than GDP. When growth merely slows down, investment can actually fall. That's why investment swings much more than GDP (right panel)."}})(),
"ma1.5|1":(function(){const tr=x=>2+.55*x,act=x=>tr(x)+1.1*Math.sin(x*1.2);return {figs:[{x:"Time",y:"Real GDP",
  lines:[{f:tr,x0:0,x1:9.3,l:"trend",c:"m",d:1},{f:act,x0:0,x1:9.3,l:"actual",c:"a"}],
  text:[{p:[1.31,tr(1.31)+1.6],t:"boom",a:"middle"},{p:[2.6,tr(2.6)+1.6],t:"downturn",a:"middle",c:"m"},{p:[3.93,tr(3.93)-1.9],t:"recession",a:"middle"},{p:[5.2,tr(5.2)-1.9],t:"recovery",a:"middle",c:"m"},{p:[6.54,tr(6.54)+1.6],t:"boom",a:"middle"}]}],
 t:"The multiplier and accelerator feed off each other. In an upswing, rising GDP boosts investment (the accelerator), the extra investment is multiplied into more GDP (the multiplier), and that boosts investment again. The boom gets amplified.\nIn a downturn the same process runs in reverse and deepens the recession.\nThis interaction is one explanation for the economic cycle: boom, downturn, recession and recovery around the long-run trend growth line."}})(),
"ma1.5|2":(function(){const s=adShift(-1.5,-1.5,{lras:6.5});s.lines=[s.lines[0],s.lines[2],s.lines[3]];s.lines[0].l="AD";const e=meet(ADf(-1.5).f,SRASf(0).f,0,9.3);
 s.guides=[{p:e,xl:"Y1",yl:"P1"}];s.arrows=[{f:[e[0]+.1,1.2],t:[6.4,1.2],c:"r"}];s.text=[{p:[(e[0]+6.5)/2,1.6],t:"negative gap",c:"r",a:"middle"},{p:[6.5,-.95],t:"Yfe",c:"m",a:"middle"}];
 return {figs:[{...s,cap:"AD/AS"},{...ppcAx,cap:"PPC",lines:[{p:arc(7),cv:1,l:"PPC",lp:[6.2,4.6]}],dots:[{p:[3,3],t:"A: negative gap"}]}],
 t:"Output gap = actual output − potential output.\nA negative output gap means the economy is producing below capacity (Y1 < Yfe on AD/AS, point A inside the PPC). There's spare capacity, cyclical unemployment and little inflationary pressure.\nA positive output gap means AD has pushed output above its sustainable level for a while: overtime, firms stretched to their limits, and inflationary pressure.\nPotential output can't be observed directly. So output gap estimates are uncertain and often revised, which makes them a risky basis for policy."}})(),
"ma2.1|0":(function(){const s=adShift(-1,1.2,{lras:7.5});return {figs:[{...s,cap:"Short run: AD rises"},lrasFig("Long run: LRAS shifts right")],
 t:"Short-run growth is a rise in real GDP from higher AD using up spare capacity (Y1 to Y2, left). On a PPC, that's a move from inside the curve towards it.\nLong-run growth is a rise in productive capacity, so LRAS shifts right (right panel) and the PPC shifts out. It comes from investment, new technology, education and training, and a bigger labour force.\nOnly long-run growth can be sustained without pushing up inflation. Short-run growth stops once the economy reaches LRAS."}})(),
"ma2.7|0":(function(){const lz=x=>10*Math.pow(x/10,2.2);return {figs:[{x:"Cumulative % of households",y:"Cumulative % of income",
  areas:[{p:[[0,0],...sample(lz,0,10,40).slice(1),[10,10]].concat([[0,0]]),c:"a",o:.25}],
  lines:[{p:[[0,0],[10,10]],l:"",c:"b"},{f:lz,x0:0,x1:10,l:"",c:"a"}],
  text:[{p:[.4,6],t:"line of equality"},{p:[9.6,2.4],t:"Lorenz curve",a:"end",c:"a"},{p:[6,4.6],t:"A",a:"middle"},{p:[8.8,4.2],t:"B",a:"middle"},{p:[10,-.95],t:"100%",c:"m",a:"middle"}]}],
 t:"The Lorenz curve lines households up from poorest to richest and plots the cumulative share of income they get. If income were perfectly equal, the curve would be the 45° line of equality. The further it bows away from that line, the more unequal income is.\nGini coefficient = A ÷ (A + B). 0 means perfect equality; 1 means one household has everything. If the Lorenz curve moves towards the diagonal over time, inequality is falling.\nQuantile ratios, such as the income of the top 10% compared with the bottom 10%, are a simpler alternative."}})(),
"ma2.8|0":(function(){const a1=ADf(-3.2),a2=ADf(-1.2);return {figs:[
  {...adas,cap:"Keynesian AS",lines:[{p:[[.4,2.4],[4.5,2.4],[6,2.9],[7.2,4.3],[7.9,6.5],[8.05,9.3]],cv:1,l:"AS",lp:[8.2,9.1]},{p:[[.4,5.4],[5.8,.6]],l:"AD1",c:"m"},{p:[[3.6,9.2],[9.2,3.4]],l:"AD2",c:"c"}],
   text:[{p:[2.3,1.6],t:"spare capacity",c:"m",a:"middle"},{p:[8.05,-.95],t:"Yfe",c:"m",a:"middle"}]},
  {...adas,cap:"Neo-classical AS",lines:[{...SRASf(0),l:"SRAS"},{p:[[6.5,.3],[6.5,9.4]],l:"LRAS",c:"c",lp:[6.65,9.2]}],text:[{p:[6.5,-.95],t:"Yfe",c:"m",a:"middle"}]}],
 t:"Keynesian AS: when there's lots of spare capacity, output can rise with no rise in prices (the flat section, where AD1 sits). As the economy gets close to full capacity, bottlenecks start pushing prices up. At Yfe, AS is vertical. So in a deep recession, demand-side policy raises output without causing inflation.\nNeo-classical AS: LRAS is vertical at the natural level of output. In the long run, extra AD only raises prices, so only supply-side policy can raise output permanently. Wages and prices adjust, so the economy corrects itself back to Yfe on its own.\nThe policy debate largely comes down to which shape you believe and how long the self-correction takes."}})(),
"ma2.8|1":(function(){const p1=x=>-1+15/(x+.5),p2=x=>p1(x)+3;return {figs:[{x:"Unemployment (%)",y:"Inflation (%)",
  lines:[{f:p1,x0:.95,x1:9.3,l:"SRPC1"},{f:p2,x0:1.55,x1:9.3,l:"SRPC2",c:"c"},{p:[[5,.3],[5,9.4]],l:"LRPC",c:"b",lp:[5.15,9.2]}],
  dots:[{p:[5,p1(5)],t:"A",dx:8,dy:10},{p:[3,p1(3)],t:"B",dx:-8,dy:-2,a:"end"},{p:[5,p2(5)],t:"C",dx:8,dy:-4}],
  arrows:[{f:[4.8,p1(5)+.2],t:[3.25,p1(3)-.1],c:"m"},{f:[3.25,p1(3)+.35],t:[4.8,p2(5)-.05],c:"m"}],text:[{p:[5,-.95],t:"NAIRU",c:"m",a:"middle"}]}],
 t:"The short-run Phillips curve (SRPC) shows a trade-off: lower unemployment comes with higher inflation. Push unemployment below its natural rate (A to B) and inflation rises.\nThe neo-classical view, from Friedman: workers come to expect the higher inflation and bargain for higher wages, so the SRPC shifts up (B to C). Unemployment returns to its natural rate (the NAIRU), but now with higher inflation. So the long-run Phillips curve (LRPC) is vertical at the NAIRU: there is no long-run trade-off.\nThe 1970s, with high inflation and high unemployment at the same time (stagflation), broke the original curve. The flat curve of the 2010s and the inflation surge of 2021–23 show the relationship isn't stable."}})(),

"ma3.2|0":{figs:[adShift(0,-1.6,{l1:"AD1",l2:"AD2"})],
 t:"Raising Bank Rate makes borrowing more expensive and saving more attractive. It cuts the disposable income of people with variable-rate mortgages, lowers asset prices, and tends to strengthen the pound.\nConsumption, investment and net exports all fall, so AD shifts left (AD1 to AD2). Inflation falls, but so does growth, and unemployment rises. A rate cut does the reverse.\nThe full effect takes around 18 to 24 months to come through."},
"ma3.2|1":{figs:[{x:"Quantity of money",y:"Interest rate",lines:[{p:[[1,9.8],[8.5,.8]],l:"Md",c:"b"},{p:[[4,.3],[4,9.4]],l:"Ms1",lp:[4.15,9.2]},{p:[[6,.3],[6,9.4]],l:"Ms2",c:"c",lp:[6.15,9.2]}],
  guides:[{p:[4,6.2],xl:null,yl:"r1"},{p:[6,3.8],xl:null,yl:"r2"}],arrows:[{f:[4.2,8],t:[5.8,8]}]}],
 t:"The supply of money is drawn vertical, because it's set by the central bank and the banking system rather than by the interest rate. Demand for money slopes down: at lower interest rates, holding cash costs you less in lost interest.\nWhen the money supply increases (Ms1 to Ms2), the interest rate falls from r1 to r2. That encourages borrowing and spending, so AD shifts right. Cutting the money supply does the reverse."},
"ma3.2|2":(function(){const s=adShift(0,1.8,{lras:6.8});s.arrows.push({f:[7.6,6.6],t:[6.6,6.6],c:"r"});return {figs:[s],
 t:"The government sets the Bank of England's Monetary Policy Committee a target of 2% CPI inflation. If inflation is forecast to overshoot, say because AD rises to AD2 and pushes the price level to P2, the MPC raises Bank Rate to pull AD back. If inflation ends up more than 1 percentage point away from target, the Governor has to write an open letter to the Chancellor explaining why.\nA credible target anchors people's expectations, so wage and price setting stays sensible.\nThe weakness is cost-push shocks, like the 2022 energy price spike. Inflation rises while growth falls, so raising rates to hit the target makes the slowdown worse."}})(),
"ma3.2|3":{figs:[
  {x:"Quantity of money",y:"Interest rate",cap:"Money supply expands",lines:[{p:[[1,9.8],[8.5,.8]],l:"Md",c:"b"},{p:[[4,.3],[4,9.4]],l:"Ms1",lp:[4.15,9.2]},{p:[[6,.3],[6,9.4]],l:"Ms2",c:"c",lp:[6.15,9.2]}],guides:[{p:[4,6.2],xl:null,yl:"r1"},{p:[6,3.8],xl:null,yl:"r2"}]},
  {...adShift(0,1.6),cap:"AD shifts right"}],
 t:"In quantitative easing (QE), the central bank creates new money electronically and uses it to buy assets, mostly government bonds, from financial institutions. That pushes bond prices up and long-term interest rates down, so borrowing gets cheaper across the economy. The sellers have new money to spend or lend, and higher asset prices make people feel wealthier.\nThe aim is to shift AD right when Bank Rate is already close to zero and can't be cut further, as in the UK from 2009 and again in 2020.\nThe limits: banks may sit on the extra reserves instead of lending them. QE inflates asset prices, which widens wealth inequality. And how well unwinding it (quantitative tightening) will go is uncertain."},
"ma3.2|4":{figs:[{x:"Quantity of £",y:"Exchange rate ($ per £)",lines:[{p:DD,l:"D£1"},{p:[[1,7],[7,1]],l:"D£2",c:"c"},{p:SS,l:"S£",c:"b"}],
  guides:[{p:[5,5],xl:"Q1",yl:"ER1"},{p:[4,4],xl:"Q2",yl:"ER2"}],arrows:[{f:[6.4,3.6],t:[5,2.6]}]}],
 t:"Interest rates move the exchange rate through hot money, meaning short-term flows of money chasing the best returns. A rate cut makes UK deposits less attractive, so demand for pounds falls (D£1 to D£2) and the pound depreciates.\nExports become cheaper and imports more expensive, so net exports and AD rise, which reinforces the effect of the rate cut. But dearer imports also add to inflation.\nTo remember the direction: SPICED, which stands for Strong Pound, Imports Cheap, Exports Dear."},

"ma3.3|0":{figs:[lrasFig()],t:"Privatisation (selling state-owned firms, like BT and British Gas) and deregulation (removing rules that block competition, like on bus routes) aim to raise efficiency through the profit motive and competition. Subsidies for training or R&D cut firms' costs and raise capacity.\nAll three shift LRAS right: more output at a lower price level.\nThe evidence is mixed. Privatised water and rail companies have been criticised for underinvesting and charging high prices."},
"ma3.3|1":{figs:[lrasFig()],t:"The Competition and Markets Authority (CMA) blocks mergers that would reduce competition and fines firms in cartels. More competition pushes firms to cut X-inefficiency and innovate, which raises productivity and shifts LRAS right.\nIts effect is slow and indirect, and large firms may be better at funding R&D than the smaller ones competition leaves behind."},
"ma3.3|2":{figs:[lrasFig()],t:"Spending on transport, broadband, schools, apprenticeships and R&D raises both the quantity and the quality of capital and labour, so LRAS shifts right. The spending also raises AD in the short run, so it boosts demand as well as supply.\nThe drawbacks are long time lags, high costs and uncertain returns. HS2 is the obvious example."},
"ma3.3|3":{figs:[lrasFig()],t:"Cutting income tax or raising the personal allowance increases the incentive to work. Cutting corporation tax encourages investment. Reforming benefits so they're withdrawn more gradually as people earn more (the idea behind Universal Credit) weakens the unemployment and poverty traps. More labour supply and more investment shift LRAS right.\nThe risks: tax cuts can widen inequality, and the incentive effect may be weak because many people can't choose their hours."},
"ma3.3|4":{figs:[lrasFig()],t:"Labour market flexibility means making it easier to hire and fire, allowing part-time and zero-hours work, reducing trade union power, and helping workers move between jobs and regions (retraining schemes, housing policy). Firms can react faster to change and structural unemployment falls, so LRAS shifts right.\nThe cost is less job security, and possibly lower pay for some workers."},
"ma3.3|5":{figs:[lrasFig()],t:"Immigration policy controls the supply of labour. Letting in skilled workers fills shortages (social care, the NHS, construction) and enlarges the labour force, which shifts LRAS right. Tighter controls do the opposite; the UK's post-Brexit points system changed which skills can come in.\nThe effects on GDP per head, local workers' wages and public services are all debated."},

"ma4.2|0":{figs:[
  {x:"Quantity of £",y:"$ per £",cap:"Floating",lines:[{p:DD,l:"D£1"},{p:[[3,9],[9.3,2.7]],l:"D£2",c:"c"},{p:SS,l:"S£",c:"b"}],guides:[{p:[5,5],xl:"Q1",yl:"ER1"},{p:[6,6],xl:"Q2",yl:"ER2"}]},
  {x:"Quantity of £",y:"$ per £",cap:"Fixed",lines:[{p:DD,l:"D£1"},{p:[[1,7],[7,1]],l:"D£2",c:"m",d:1},{p:SS,l:"S£",c:"b"},{p:[[0,5],[9.3,5]],l:"peg",c:"c",lp:[9.3,5.3],la:"end"}],
   arrows:[{f:[1.7,6.5],t:[3.3,6.5]}],text:[{p:[2.6,7.2],t:"central bank buys £",a:"middle"}]}],
 t:"Floating: the exchange rate is set by demand for and supply of the currency. Demand for pounds comes from foreigners buying UK exports and assets, and from hot money. Supply of pounds comes from UK residents buying imports and foreign assets. If demand rises (D£1 to D£2), the pound appreciates.\nFixed: the government or central bank pegs the rate. If demand for pounds falls (D£2), the rate would drop below the peg. To defend it, the central bank buys pounds with its foreign currency reserves, or raises interest rates, pushing demand back up. It can only keep this up while its reserves and credibility last; the UK left the ERM in 1992 when they ran out."},
"ma4.4|0":{figs:[{x:"Quantity",y:"Price",areas:[{p:[[3.5,2],[6.5,2],[6.5,3.5],[3.5,3.5]],c:"c",o:.3},{p:[[2,2],[3.5,2],[3.5,3.5]],c:"r",o:.4},{p:[[6.5,2],[8,2],[6.5,3.5]],c:"r",o:.4}],
  lines:[{p:DD,l:"D dom",c:"b"},{p:SS,l:"S dom"},{p:[[0,2],[9.3,2]],l:"Pw",c:"m",lp:[-.2,1.8],la:"end"},{p:[[0,3.5],[9.3,3.5]],l:"Pw+t",c:"c",lp:[-.2,3.3],la:"end"}],
  guides:[{p:[2,2],xl:"Q1",yl:null},{p:[3.5,3.5],xl:"Q2",yl:null},{p:[6.5,3.5],xl:"Q3",yl:null},{p:[8,2],xl:"Q4",yl:null}],text:[{p:[5,2.55],t:"revenue",a:"middle"}]}],
 t:"Under free trade, the domestic price is the world price Pw. Domestic firms supply Q1, consumers buy Q4, and imports fill the gap (Q1 to Q4).\nA tariff raises the price to Pw + tariff. Domestic supply rises to Q2, demand falls to Q3, and imports shrink to Q2–Q3. The government collects the tariff revenue (the blue rectangle). The two red triangles are deadweight losses: inefficient domestic production on the left, lost consumption on the right.\nA quota limits the quantity of imports directly and has the same effect on price. The difference is that the rectangle goes to the foreign firms lucky enough to get the import licences, not to the government.\nTrade creation and trade diversion: joining a customs union removes tariffs inside it. Trade creation means cheaper imports from members replace expensive domestic production. Trade diversion means a common external tariff pushes buying away from cheaper non-member countries towards more expensive member ones."},
"ma5.1|0":{figs:[{x:"Quantity of money",y:"Interest rate",lines:[{p:[[1,9.8],[8.5,.8]],l:"Md1",c:"b"},{p:[[3,9.4],[9.3,1.84]],l:"Md2",c:"c"},{p:[[4,.3],[4,9.4]],l:"Ms",lp:[4.15,9.2]}],
  guides:[{p:[4,6.2],xl:null,yl:"r1"},{p:[4,8.2],xl:null,yl:"r2"}],arrows:[{f:[2.4,6.8],t:[3.6,8.2]}]}],
 t:"In the liquidity preference approach, the interest rate is the price of money. Demand for money (Md) slopes down, because at low interest rates there's little reward given up by holding cash. People hold money for transactions, as a precaution, and to speculate. The money supply is drawn vertical, because the central bank and the banks set it.\nThe interest rate settles where Md = Ms. If demand for money rises (Md1 to Md2), for example because more transactions happen as GDP grows, the rate rises from r1 to r2, unless the central bank expands the money supply.\nIn practice the Bank of England sets Bank Rate directly and supplies whatever reserves are needed at that rate."}
};
window.DIAG=DIAG;
})();
