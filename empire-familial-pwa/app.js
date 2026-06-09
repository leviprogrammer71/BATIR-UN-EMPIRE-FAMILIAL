/* ============================================================
   Bâtir un Empire Familial — Ebook + Audiobook PWA
   Page-flip reader · open access (test mode)
   ============================================================ */
const STRIPE_LINK = "https://buy.stripe.com/14A7sK3MYcNKbNTahR3gk0b"; // kept for later

const CHAPTERS = [
  { id:"preface", n:"◆", sec:"open", fr:["Préface","Par l'Apôtre Roland Dalo"], en:["Preface","By Apostle Roland Dalo"] },
  { id:"intro", n:"◆", sec:"open", fr:["Introduction","L'histoire d'Élias de Likasi"], en:["Introduction","The story of Élias of Likasi"] },
  { id:"ch1", n:"1", sec:"truths", fr:["Chapitre 1","Le mariage, première pierre de l'empire familial"], en:["Chapter 1","Marriage, the first stone of the family empire"],
    parts:[
      {src:"audio/ch1-1.mp3", pg:"17–20", sec:198, ps:17, pe:20},
      {src:"audio/ch1-2.mp3", pg:"20–24", sec:276, ps:20, pe:24},
      {src:"audio/ch1-3.mp3", pg:"24–27", sec:202, ps:24, pe:27},
      {src:"audio/ch1-4.mp3", pg:"27–29", sec:147, ps:27, pe:29},
      {src:"audio/ch1-5.mp3", pg:"29–32", sec:181, ps:29, pe:32},
    ]},
  { id:"ch2", n:"2", sec:"truths", partial:true, fr:["Chapitre 2","Les parents, architectes de la réussite familiale"], en:["Chapter 2","Parents, architects of family success"],
    parts:[ {src:"audio/ch2-1.mp3", pg:"33–36", sec:172, ps:33, pe:36} ]},
  { id:"ch3", n:"3", sec:"truths", fr:["Chapitre 3","Les enfants, bâtisseurs et non héritiers passifs"], en:["Chapter 3","Children, builders not passive heirs"] },
  { id:"ch4", n:"4", sec:"truths", fr:["Chapitre 4","La spiritualité, fondation invisible de l'empire"], en:["Chapter 4","Spirituality, the invisible foundation"] },
  { id:"ch5", n:"5", sec:"battles", fr:["Chapitre 5","La bataille contre les forces spirituelles"], en:["Chapter 5","The battle against spiritual forces"] },
  { id:"ch6", n:"6", sec:"battles", fr:["Chapitre 6","La bataille contre les querelles d'héritage"], en:["Chapter 6","The battle against inheritance disputes"] },
  { id:"ch7", n:"7", sec:"battles", fr:["Chapitre 7","La bataille contre l'appauvrissement"], en:["Chapter 7","The battle against impoverishment"] },
  { id:"ch8", n:"8", sec:"battles", fr:["Chapitre 8","La bataille contre les péchés et l'immoralité"], en:["Chapter 8","The battle against sin and immorality"] },
  { id:"ch9", n:"9", sec:"riches", fr:["Chapitre 9","Les hommes — chaque membre de la famille"], en:["Chapter 9","People — every family member"] },
  { id:"ch10", n:"10", sec:"riches", fr:["Chapitre 10","Les terres et les biens immobiliers"], en:["Chapter 10","Land and real estate"] },
  { id:"ch11", n:"11", sec:"riches", fr:["Chapitre 11","Les entreprises familiales et œuvres d'esprit"], en:["Chapter 11","Family businesses and works of the mind"] },
  { id:"ch12", n:"12", sec:"riches", fr:["Chapitre 12","Les savoir-faire, les valeurs et l'histoire"], en:["Chapter 12","Know-how, values and history"] },
  { id:"conclusion", n:"◆", sec:"close", fr:["Conclusion","Bâtir votre empire commence aujourd'hui"], en:["Conclusion","Building your empire starts today"] },
];
const SECTIONS = {
  open:{fr:"Ouverture",en:"Opening"}, truths:{fr:"4 Vérités à savoir",en:"4 Truths to Know"},
  battles:{fr:"4 Batailles à remporter",en:"4 Battles to Win"}, riches:{fr:"4 Richesses à valoriser",en:"4 Treasures to Cultivate"},
  close:{fr:"Clôture",en:"Closing"},
};

const T = {
  fr:{
    kicker:"Ebook audio · Tome 1", htag:"Lisez et écoutez, page après page. Le livre et sa narration, réunis.",
    st_chap:"Chapitres", st_pages:"Pages", st_audio:"Audio",
    cta_start:"Commencer la lecture", cta_browse:"Parcourir les chapitres",
    auth_role:"Serviteur · Formateur · Bâtisseur",
    auth_bio:"Pasteur Principal de l'Église Pierre Vivante (PIVA-CEM), Président de Vis'A Internationale, initiateur de « L'École de Vie ».",
    lib_title:"Sommaire", lib_sub:"15 chapitres à lire et à écouter", install_app:"Installer l'application",
    ins_title:"Installer l'application", ins_text:"Ajoutez Empire Familial à votre écran d'accueil : plein écran, hors-ligne, comme une vraie app.", ins_now:"Installer maintenant", close:"Fermer",
    a_hl:"Surligner", a_ul:"Souligner", a_copy:"Copier", a_erase:"Effacer", copied:"Copié ✓",
    tag_audio:"Audio", no_audio:"Narration bientôt disponible",
    page:"Page", of:"sur", part:"Partie", follow:"Suivi", original_fr:"Texte original en français",
    next_ch:"Chapitre suivant", end_ch:"Fin du chapitre", cover_word:"Couverture",
    ios1b:"Ouvrez ce site dans Safari", ios1s:"L'installation ne marche que depuis Safari sur iPhone/iPad.",
    ios2b:"Touchez Partager", ios2s:"Le bouton carré avec une flèche, en bas.",
    ios3b:"« Sur l'écran d'accueil »", ios3s:"Faites défiler et choisissez « Ajouter à l'écran d'accueil ».",
    ios4b:"Touchez « Ajouter »", ios4s:"L'icône apparaît sur votre écran d'accueil.",
    and1b:"Menu du navigateur", and1s:"Touchez les trois points ⋮ dans Chrome.",
    and2b:"« Installer l'application »", and2s:"Ou « Ajouter à l'écran d'accueil ».",
    and3b:"Confirmez", and3s:"L'app s'installe et s'ouvre en plein écran.",
  },
  en:{
    kicker:"Audio ebook · Volume 1", htag:"Read and listen, page after page. The book and its narration, together.",
    st_chap:"Chapters", st_pages:"Pages", st_audio:"Audio",
    cta_start:"Start reading", cta_browse:"Browse the chapters",
    auth_role:"Servant · Trainer · Builder",
    auth_bio:"Senior Pastor of the Pierre Vivante Church (PIVA-CEM), President of Vis'A International, founder of “L'École de Vie”.",
    lib_title:"Contents", lib_sub:"15 chapters to read and listen to", install_app:"Install the app",
    ins_title:"Install the app", ins_text:"Add Empire Familial to your home screen: full-screen, offline, like a real app.", ins_now:"Install now", close:"Close",
    a_hl:"Highlight", a_ul:"Underline", a_copy:"Copy", a_erase:"Erase", copied:"Copied ✓",
    tag_audio:"Audio", no_audio:"Narration coming soon",
    page:"Page", of:"of", part:"Part", follow:"Follow", original_fr:"Original text in French",
    next_ch:"Next chapter", end_ch:"End of chapter", cover_word:"Cover",
    ios1b:"Open this site in Safari", ios1s:"Installing only works from Safari on iPhone/iPad.",
    ios2b:"Tap Share", ios2s:"The square icon with an arrow, at the bottom.",
    ios3b:"“Add to Home Screen”", ios3s:"Scroll and choose “Add to Home Screen”.",
    ios4b:"Tap “Add”", ios4s:"The icon appears on your home screen.",
    and1b:"Browser menu", and1s:"Tap the three dots ⋮ in Chrome.",
    and2b:"“Install app”", and2s:"Or “Add to Home screen”.",
    and3b:"Confirm", and3s:"The app installs and opens full-screen.",
  }
};

/* ---------- STATE ---------- */
let lang = localStorage.getItem("ef-lang") || "fr";
let curOS = "ios";
let deferredPrompt = null;
let fontStep = parseInt(localStorage.getItem("ef-font")||"0",10);
// reader
let chap = null, pf = null, useFlip = false, rPage = 0, rPages = 1, pageFlipMap = {}, cueMap = {};
let userHold = 0, rebuildT = null;
// annotations
let ANNOT = {}; try{ ANNOT = JSON.parse(localStorage.getItem("ef-annot")||"{}"); }catch(e){ ANNOT={}; }
let curSel = null, selT = null;
// audio
let partIdx = 0, playing = false, speed = 1, followOn = false;
const speeds = [1,1.25,1.5,1.75,2,0.75];
const audio = document.getElementById("audio");
const $ = (id)=>document.getElementById(id);
const fontPx = ()=> 18 + fontStep*1.5;
const esc = (s)=> s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const norm = (s)=> s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();

/* Timed read-along cues per audio part.
   Each cue: at time t (seconds) the page that ENDS with the words `a` finishes → flip onward.
   Anchored on the words (font-independent) rather than fixed page numbers.
   Times follow the reading order in the text (valeurs→prospère→commune→définie→influence). */
const SYNC = {
  "audio/ch1-1.mp3":[
    {t:12, a:"memes valeurs"},
    {t:48, a:"prospere"},
    {t:79, a:"commune"},
    {t:90, a:"definie"},
    {t:111, a:"influence"},
  ],
};

/* ---------- i18n ---------- */
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el=>{ const k=el.getAttribute("data-i"); if(T[lang][k]!=null) el.textContent=T[lang][k]; });
  $("lang-label").textContent = lang==="fr" ? "EN":"FR";
  $("r-langnote").textContent = T[lang].original_fr;
  $("r-langnote").style.display = lang==="en" ? "block":"none";
  renderLibrary(); renderInstallSteps();
  if (chap){ renderReaderTitle(); renderAudioDock(); buildReader(); }
}
function toggleLang(){ lang = lang==="fr"?"en":"fr"; localStorage.setItem("ef-lang",lang); applyLang(); }

/* ---------- LIBRARY (open access) ---------- */
function renderLibrary(){
  const order=["open","truths","battles","riches","close"];
  $("lib-list").innerHTML = order.map(sec=>{
    const items=CHAPTERS.filter(c=>c.sec===sec);
    return `<div class="secg"><div class="sec-label">${SECTIONS[sec][lang]}</div>${items.map(c=>{
      const [label,sub]=c[lang]; const hasParts=!!(c.parts&&c.parts.length); const isCur=chap&&chap.id===c.id;
      return `<div class="row ${isCur?'cur':''}" onclick="openChapter('${c.id}')">
        <div class="num">${c.n}</div>
        <div class="info">
          <div class="rl">${label}</div>
          <div class="rs">${sub}</div>
          ${hasParts?`<div class="badges"><span class="tag audio"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/></svg>${T[lang].tag_audio}${c.partial?" ·…":""}</span></div>`:""}
        </div>
        <div class="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>
      </div>`;
    }).join("")}</div>`;
  }).join("");
}

/* ---------- READER ---------- */
function startReading(){ openChapter("preface"); }
function scrollToLib(){ $("library").scrollIntoView({behavior:"smooth"}); }
function openChapter(id){
  chap = CHAPTERS.find(x=>x.id===id); partIdx=0; followOn=false; rPage=0;
  renderReaderTitle(); renderAudioDock(); $("r-audio").classList.add("hidden");
  $("reader").classList.add("show"); document.body.style.overflow="hidden";
  requestAnimationFrame(()=>requestAnimationFrame(buildReader));
}
function closeReader(){ pause(); destroyFlip(); hideSelBar(); $("reader").classList.remove("show"); document.body.style.overflow=""; renderLibrary(); }
function nextChapterOf(){ const i=CHAPTERS.findIndex(c=>c.id===chap.id); return CHAPTERS[i+1]||null; }
function goNextChapter(forcePlay){
  const nx=nextChapterOf(); if(!nx) return;
  const shouldPlay = forcePlay || playing;
  pause(); openChapter(nx.id);
  if(shouldPlay && nx.parts){
    setTimeout(()=>{ partIdx=0; audio.src=nx.parts[0].src; audio.playbackRate=speed; followOn=true; updateFollow();
      $("r-audio").classList.remove("hidden"); renderAudioDock();
      audio.play().then(()=>{ playing=true; refreshAudioIcons(); }).catch(()=>{}); }, 460);
  }
}
function renderReaderTitle(){ if(!chap)return; const [l,s]=chap[lang]; $("r-ct").textContent=l; $("r-cs").textContent=s; }
function destroyFlip(){ if(pf){ try{pf.destroy();}catch(e){} pf=null; } }

function chapterHeadHTML(){ const [l,s]=chap[lang]; return `<div class="chead"><div class="k">${l}</div><div class="h">${s}</div><div class="o"></div></div>`; }
function endCardHTML(){
  const idx=CHAPTERS.findIndex(c=>c.id===chap.id), nx=CHAPTERS[idx+1];
  return `<div class="endcard"><div class="e1">${T[lang].end_ch}</div>${nx?`<button class="nx" onclick="goNextChapter()">${T[lang].next_ch} · ${nx[lang][0]} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>`:""}</div>`;
}

function buildReader(){
  const want = rPage;
  try{
    destroyFlip();
    const blocks = (window.BOOK&&window.BOOK[chap.id])||[];
    if(!window.St || !St.PageFlip) throw new Error("noflip");
    const vp=$("r-viewport"); const W=vp.clientWidth, H=vp.clientHeight;
    if(W<40||H<40) throw new Error("nosize");
    // page geometry (portrait single page)
    let ph = Math.min(H-6, 760);
    let pw = Math.min(W-8, Math.round(ph*0.66));
    ph = Math.min(H-6, Math.round(pw/0.66));
    const padX=24, padY=26, corner=18;
    const contentW = pw - padX*2;
    const usableH = ph - padY*2 - corner;
    const res = paginate(blocks, contentW, usableH, fontPx());
    const pages = res.pages;
    // build DOM: cover + text pages
    const fb=$("flipbook");
    let html = `<div class="flip-page cover-page" data-density="hard"><img src="assets/cover.jpg" alt=""></div>`;
    html += pages.map((h,i)=>`<div class="flip-page"><div class="page-inner">${h}<span class="pageno-corner">${i+1} / ${pages.length}</span></div></div>`).join("");
    html += `<div class="flip-page"><div class="page-inner">${endCardHTML()}</div></div>`;
    fb.innerHTML = html;
    pf = new St.PageFlip(fb,{ width:pw, height:ph, size:"fixed", showCover:true, usePortrait:true,
      mobileScrollSupport:false, clickEventForward:true, useMouseEvents:true, swipeDistance:20,
      maxShadowOpacity:.5, drawShadow:true, flippingTime:620 });
    pf.loadFromHTML(fb.querySelectorAll(".flip-page"));
    rPages = pf.getPageCount();
    rPage = Math.min(want, rPages-1);
    if(rPage>0) pf.turnToPage(rPage);
    pf.on("flip", e=>{ rPage=e.data; userHold=Date.now(); updatePageUI(); hideSelBar(); });
    // pdf-page -> flip index (cover offset = +1)
    pageFlipMap = {}; Object.keys(res.map).forEach(k=> pageFlipMap[k] = res.map[k] + 1);
    // timed word-anchored cues -> flip pages, per audio part
    cueMap = {};
    if(chap.parts) chap.parts.forEach(p=>{ const cs=cuesForPart(p.src, res.norm, res.pageLens); if(cs) cueMap[p.src]=cs; });
    useFlip = true;
    $("flip-wrap").style.display="flex"; $("r-scroll").style.display="none";
    applyAnnotations();
  }catch(e){
    buildScrollFallback();
  }
  updatePageUI();
}

function paginate(blocks, contentW, usableH, px){
  const meas=document.createElement("div");
  meas.className="page-inner measure";
  meas.style.width=contentW+"px"; meas.style.fontSize=px+"px";
  document.body.appendChild(meas);
  const over=(h)=>{ meas.innerHTML=h; return meas.scrollHeight>usableH; };
  const pages=[], pageLens=[]; let cur=chapterHeadHTML(), curLen=0; const map={}; let firstPara=true; const normArr=[]; let rawOff=0;
  function flush(){ pages.push(cur); pageLens.push(curLen); cur=""; curLen=0; }
  function addPiece(rawT, cls, markPg){
    const html=`<p class="${cls}" data-cs="${rawOff}">${esc(rawT)}</p>`;
    if(cur!=="" && over(cur+html)){ flush(); cur=html; if(markPg!=null) map[markPg]=pages.length; }
    else { if(markPg!=null && map[markPg]==null) map[markPg]=pages.length; cur+=html; }
    rawOff += rawT.length;
    const nt=norm(rawT); normArr.push(nt); curLen+=nt.length+1;
  }
  blocks.forEach(blk=>{
    blk.paras.forEach((p,pi)=>{
      const cls = firstPara ? "dropcap" : ""; firstPara=false;
      const mark = (pi===0) ? blk.pg : null;
      if(over(`<p>${esc(p)}</p>`)){ // paragraph taller than a page → split by words
        const parts=splitPara(p, usableH, meas);
        parts.forEach((pt,i)=> addPiece(pt, i===0?cls:"", i===0?mark:null));
      } else addPiece(p, cls, mark);
    });
  });
  if(cur!=="" || curLen>0) flush();
  document.body.removeChild(meas);
  return {pages, pageLens, map, norm:normArr.join(" ")};
}
function splitPara(text, usableH, meas){
  const words=text.split(" "); const out=[]; let chunk="";
  const over=(h)=>{ meas.innerHTML=h; return meas.scrollHeight>usableH; };
  for(const w of words){ const t=chunk?chunk+" "+w:w; if(over(`<p>${esc(t)}</p>`) && chunk){ out.push(chunk+" "); chunk=w; } else chunk=t; }
  if(chunk) out.push(chunk);
  return out;
}
// map each timed cue (word anchor) to a flip-page index for the current pagination
function cuesForPart(src, chapterNorm, pageLens){
  const cues=SYNC[src]; if(!cues) return null;
  const cum=[]; let s=0; pageLens.forEach(l=>{ s+=l; cum.push(s); });
  let cursor=0; const out=[];
  for(const c of cues){
    const idx=chapterNorm.indexOf(c.a, cursor); if(idx<0) continue; cursor=idx+c.a.length;
    let pg=cum.findIndex(e=>e>idx); if(pg<0) pg=pageLens.length-1;
    out.push({t:c.t, page:pg+1}); // +1 for the cover page
  }
  return out.length?out:null;
}
function buildScrollFallback(){
  const blocks=(window.BOOK&&window.BOOK[chap.id])||[];
  let first=true, off=0;
  const html = chapterHeadHTML() + blocks.map(b=>`<span class="pgmark" data-pg="${b.pg}"></span>`+
    b.paras.map(p=>{ const c=first?"dropcap":""; first=false; const cs=off; off+=p.length; return `<p class="${c}" data-cs="${cs}">${esc(p)}</p>`; }).join("")).join("") + endCardHTML();
  const sc=$("r-scroll"); sc.innerHTML=html; sc.scrollTop=0; sc.style.display="block";
  $("flip-wrap").style.display="none";
  useFlip=false; rPages=1; rPage=0; cueMap={};
  applyAnnotations();
}
function nextPage(){ userHold=Date.now(); if(useFlip&&pf){ pf.flipNext("top"); } else { $("r-scroll").scrollBy({top:$("r-scroll").clientHeight*0.9,behavior:"smooth"}); } }
function prevPage(){ userHold=Date.now(); if(useFlip&&pf){ pf.flipPrev("top"); } else { $("r-scroll").scrollBy({top:-$("r-scroll").clientHeight*0.9,behavior:"smooth"}); } }
function updatePageUI(){
  if(useFlip){ $("r-pageno").textContent=`${T[lang].page} ${rPage+1} ${T[lang].of} ${rPages}`;
    $("r-pagefill").style.width=(rPages>1?(rPage/(rPages-1))*100:100)+"%"; }
  else { $("r-pageno").textContent=""; $("r-pagefill").style.width="0%"; }
  // reveal the "next chapter" bar on the last page
  const nx = chap ? nextChapterOf() : null;
  const onLast = useFlip && rPages>1 && rPage>=rPages-1;
  const bar=$("r-next");
  if(bar){ if(onLast && nx){ $("r-next-label").textContent=`${T[lang].next_ch} · ${nx[lang][0]}`; bar.classList.add("show"); } else bar.classList.remove("show"); }
}
function setFont(d){
  fontStep=Math.max(-2,Math.min(4,fontStep+d)); localStorage.setItem("ef-font",fontStep);
  document.documentElement.style.setProperty("--reader-fs",fontPx()+"px");
  if(chap){ clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,120); }
}
window.addEventListener("resize",()=>{ if(chap&&$("reader").classList.contains("show")){ clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,180); } });
document.addEventListener("keydown",(e)=>{ if(!$("reader").classList.contains("show"))return;
  if(e.key==="ArrowRight")nextPage(); if(e.key==="ArrowLeft")prevPage(); if(e.key==="Escape")closeReader(); });

/* ---------- ANNOTATIONS (highlight / underline / copy / erase) ---------- */
function saveAnnot(){ try{ localStorage.setItem("ef-annot", JSON.stringify(ANNOT)); }catch(e){} }
function annotRoot(){ return useFlip ? $("flipbook") : $("r-scroll"); }
function closestP(node){ node=(node&&node.nodeType===3)?node.parentNode:node; if(!node||!node.closest)return null;
  const p=node.closest("p[data-cs]"); return (p && (p.closest("#flipbook")||p.closest("#r-scroll")))?p:null; }
function offsetIn(p,node,off){ const r=document.createRange(); r.selectNodeContents(p); try{ r.setEnd(node,off); }catch(e){ return 0; } return r.toString().length; }
function readerSelection(){
  const sel=window.getSelection(); if(!sel||sel.isCollapsed||sel.rangeCount===0) return null;
  const range=sel.getRangeAt(0); const pa=closestP(range.startContainer), pb=closestP(range.endContainer);
  if(!pa||!pb) return null;
  let s=(+pa.getAttribute("data-cs"))+offsetIn(pa,range.startContainer,range.startOffset);
  let e=(+pb.getAttribute("data-cs"))+offsetIn(pb,range.endContainer,range.endOffset);
  if(e<s){ const t=s; s=e; e=t; }
  if(e<=s) return null;
  let rect=null; try{ rect=range.getBoundingClientRect(); }catch(_){}
  return {s,e,rect};
}
function showSelBar(){
  if(!$("reader").classList.contains("show")){ hideSelBar(); return; }
  const sel=readerSelection(); if(!sel||!sel.rect||(!sel.rect.width&&!sel.rect.height)){ hideSelBar(); return; }
  curSel=sel; const bar=$("sel-bar"); bar.style.display="flex";
  const bw=bar.offsetWidth||230, bh=bar.offsetHeight||42;
  let x=sel.rect.left+sel.rect.width/2-bw/2, y=sel.rect.top-bh-8;
  x=Math.max(8,Math.min(window.innerWidth-bw-8,x)); if(y<8) y=sel.rect.bottom+8;
  bar.style.left=x+"px"; bar.style.top=y+"px";
}
function hideSelBar(){ const b=$("sel-bar"); if(b) b.style.display="none"; curSel=null; }
function clearSel(){ const s=window.getSelection&&window.getSelection(); if(s&&s.removeAllRanges) s.removeAllRanges(); hideSelBar(); }
document.addEventListener("selectionchange",()=>{ clearTimeout(selT); selT=setTimeout(showSelBar,160); });
function addAnnot(type){ if(!curSel||!chap) return; (ANNOT[chap.id]||(ANNOT[chap.id]=[])).push({s:curSel.s,e:curSel.e,type}); saveAnnot(); applyAnnotations(); clearSel(); }
function eraseSel(){ if(!curSel||!chap) return; const l=ANNOT[chap.id]||[]; ANNOT[chap.id]=l.filter(a=>!(a.e>curSel.s&&a.s<curSel.e)); saveAnnot(); applyAnnotations(); clearSel(); }
function copySel(){ const s=window.getSelection&&window.getSelection(); const t=s?s.toString():""; if(t&&navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(()=>toast(T[lang].copied)).catch(()=>{}); } clearSel(); }
function applyAnnotations(){
  if(!chap) return; const list=ANNOT[chap.id]||[]; const root=annotRoot(); if(!root) return;
  root.querySelectorAll("p[data-cs]").forEach(p=>{
    const ds=+p.getAttribute("data-cs"); const text=p.textContent; const n=text.length; const de=ds+n;
    const ov=list.filter(a=>a.e>ds && a.s<de);
    if(!ov.length){ if(p.querySelector(".hl,.ul")) p.innerHTML=esc(text); return; }
    const hl=new Array(n).fill(false), ul=new Array(n).fill(false);
    ov.forEach(a=>{ const s=Math.max(0,a.s-ds), e=Math.min(n,a.e-ds); for(let i=s;i<e;i++){ if(a.type==="hl")hl[i]=true; else ul[i]=true; } });
    let html="", i=0;
    while(i<n){ const h=hl[i],u=ul[i]; let j=i; while(j<n && hl[j]===h && ul[j]===u) j++;
      const seg=esc(text.slice(i,j));
      html += (h||u) ? `<span class="${h?"hl":""}${(h&&u)?" ":""}${u?"ul":""}">${seg}</span>` : seg;
      i=j; }
    p.innerHTML=html;
  });
}

/* ---------- block pinch / double-tap zoom (native app feel) ---------- */
["gesturestart","gesturechange","gestureend"].forEach(ev=> document.addEventListener(ev, e=>e.preventDefault(), {passive:false}));

/* ---------- AUDIO ---------- */
function toggleAudioDock(){ if(!(chap.parts&&chap.parts.length)){ toast(T[lang].no_audio); return; } $("r-audio").classList.toggle("hidden"); }
function renderAudioDock(){
  const dock=$("r-audio"); const has=!!(chap.parts&&chap.parts.length);
  $("audio-toggle").style.opacity = has?"1":".4";
  if(!has){ dock.innerHTML=`<div class="ra-locked"><div class="t">${T[lang].no_audio}</div></div>`; return; }
  const multi=chap.parts.length>1;
  dock.innerHTML=`
    <div class="ra-row">
      <button class="ra-pp" onclick="togglePlay()"><svg id="ra-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
      <div class="ra-mid">
        <div class="ra-seek" id="ra-seek"><div class="f" id="ra-fill"></div></div>
        <div class="ra-meta"><span id="ra-cur">0:00</span><span id="ra-part"></span><span id="ra-dur">0:00</span></div>
      </div>
      <div class="ra-side">
        <button class="ra-spd" id="ra-spd" onclick="cycleSpeed()">${speed}×</button>
        <button class="ra-follow ${followOn?'on':''}" id="ra-follow" onclick="toggleFollow()"><span class="dot"></span>${T[lang].follow}</button>
      </div>
    </div>
    ${multi?`<div class="ra-chips" id="ra-chips">${chap.parts.map((p,i)=>`<button class="ra-chip ${i===partIdx?'on':''}" onclick="goPart(${i})" title="p. ${p.pg}">${i+1}</button>`).join("")}</div>`:""}`;
  $("ra-seek").addEventListener("click",(e)=>{ if(!audio.duration)return; const r=e.currentTarget.getBoundingClientRect(); audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration; });
  refreshAudioIcons();
}
function loadPart(){ const w=chap.parts[partIdx].src; if(!audio.src.endsWith(w)){ audio.src=w; audio.playbackRate=speed; } }
function togglePlay(){ if(!(chap.parts))return; if(playing){pause();return;} loadPart(); followOn=true; updateFollow(); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); }
function pause(){ audio.pause(); playing=false; refreshAudioIcons(); }
function goPart(i){ partIdx=Math.max(0,Math.min(chap.parts.length-1,i)); audio.src=chap.parts[partIdx].src; audio.playbackRate=speed; document.querySelectorAll("#ra-chips .ra-chip").forEach((c,j)=>c.classList.toggle("on",j===partIdx)); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); }
function cycleSpeed(){ speed=speeds[(speeds.indexOf(speed)+1)%speeds.length]; audio.playbackRate=speed; const b=$("ra-spd"); if(b)b.textContent=speed+"×"; }
function toggleFollow(){ followOn=!followOn; updateFollow(); }
function updateFollow(){ const b=$("ra-follow"); if(b)b.classList.toggle("on",followOn); }
function refreshAudioIcons(){
  const ic=$("ra-icon"); if(ic) ic.innerHTML=playing?'<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>';
  const pt=$("ra-part"); if(pt&&chap.parts){ const p=chap.parts[partIdx]; pt.textContent=(chap.parts.length>1?`${T[lang].part} ${partIdx+1}/${chap.parts.length} · `:"")+`p. ${p.pg}`; }
}
function fmt(s){ s=Math.floor(s||0); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
audio.addEventListener("timeupdate",()=>{
  if(!chap||!chap.parts)return;
  const pct=audio.duration?(audio.currentTime/audio.duration*100):0;
  const f=$("ra-fill"); if(f)f.style.width=pct+"%";
  const c=$("ra-cur"),d=$("ra-dur"); if(c)c.textContent=fmt(audio.currentTime); if(d)d.textContent=fmt(audio.duration);
  if(followOn && $("reader").classList.contains("show") && Date.now()-userHold>4500 && audio.duration){
    const part=chap.parts[partIdx];
    if(useFlip && pf){
      let target=null;
      const cues=cueMap[part.src];
      if(cues){
        const next=cues.find(c=>c.t>audio.currentTime);           // page being read right now (ends at next cue)
        if(next) target=next.page;
        else { const last=cues[cues.length-1];                      // past the last cue → ease to the part's last page
          const endPg = pageFlipMap[part.pe]!=null ? pageFlipMap[part.pe] : last.page;
          const fr = Math.max(0,Math.min(1,(audio.currentTime-last.t)/Math.max(1,audio.duration-last.t)));
          target = Math.round(last.page + fr*(endPg-last.page)); }
      } else {
        const span=part.pe-part.ps+1;
        const tgtPdf=Math.min(part.pe, part.ps+Math.floor((audio.currentTime/audio.duration)*span));
        target=pageFlipMap[tgtPdf];
      }
      if(target!=null && target>rPage){ try{pf.flip(target,"top");}catch(e){} }
    } else {
      const span=part.pe-part.ps+1;
      const tgtPdf=Math.min(part.pe, part.ps+Math.floor((audio.currentTime/audio.duration)*span));
      const m=document.querySelector(`#r-scroll .pgmark[data-pg="${tgtPdf}"]`); if(m) m.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }
});
audio.addEventListener("ended",()=>{
  if(chap.parts && partIdx<chap.parts.length-1){ partIdx++; audio.src=chap.parts[partIdx].src; audio.playbackRate=speed;
    document.querySelectorAll("#ra-chips .ra-chip").forEach((c,j)=>c.classList.toggle("on",j===partIdx));
    audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); return; }
  playing=false; refreshAudioIcons();
  const nx=nextChapterOf(); if(nx && nx.parts) goNextChapter(true);   // continue narration into next chapter
});

/* ---------- INSTALL ---------- */
function openInstall(){ openOverlay("ov-install"); }
function setOS(os){ curOS=os; $("os-ios").classList.toggle("on",os==="ios"); $("os-and").classList.toggle("on",os==="and"); renderInstallSteps(); }
function renderInstallSteps(){
  const t=T[lang], box=$("install-steps");
  const share='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"/></svg>';
  const plus='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 9v6M9 12h6"/></svg>';
  const dots='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
  const ok='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
  const data = curOS==="ios"
    ? [["",t.ios1b,t.ios1s],[share,t.ios2b,t.ios2s],[plus,t.ios3b,t.ios3s],[ok,t.ios4b,t.ios4s]]
    : [[dots,t.and1b,t.and1s],[plus,t.and2b,t.and2s],[ok,t.and3b,t.and3s]];
  box.innerHTML=data.map((d,i)=>`<div class="step"><div class="sn">${i+1}</div><div class="sc"><b>${d[0]}${d[1]}</b><span>${d[2]}</span></div></div>`).join("");
}
window.addEventListener("beforeinstallprompt",(e)=>{ e.preventDefault(); deferredPrompt=e; const b=$("install-now"); if(b)b.style.display="flex"; });
function triggerInstall(){ if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=>{ deferredPrompt=null; $("install-now").style.display="none"; }); } }

/* ---------- MISC ---------- */
function openOverlay(id){ $(id).classList.add("show"); }
function closeOverlay(id){ $(id).classList.remove("show"); }
function goHome(){ window.scrollTo({top:0,behavior:"smooth"}); }
function toast(m){ const t=$("toast"); t.textContent=m; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2200); }
window.addEventListener("scroll",()=>{
  const doc=document.documentElement, max=(doc.scrollHeight-doc.clientHeight)||1;
  $("scroll-bar").style.width=Math.min(100,Math.max(0,window.scrollY/max*100))+"%";
  $("to-top").classList.toggle("show", window.scrollY>520);
},{passive:true});
if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{})); }

/* ---------- BOOT ---------- */
document.documentElement.style.setProperty("--reader-fs",fontPx()+"px");
applyLang(); renderLibrary(); renderInstallSteps();
