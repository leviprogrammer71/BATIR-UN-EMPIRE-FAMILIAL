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
    a_hl:"Surligner", a_ul:"Souligner", a_copy:"Copier", a_erase:"Effacer", a_note:"Note", a_share:"Partager", copied:"Copié ✓",
    set_title:"Réglages", set_reading:"Lecture", set_font:"Taille du texte", set_mode:"Affichage", mode_flip:"Pages", mode_scroll:"Continu",
    set_night:"Mode nuit", set_audio:"Audio", set_speed:"Vitesse", set_sleep:"Minuteur sommeil", set_autoplay:"Chapitre suivant auto.",
    set_more:"Plus", set_notes:"Mes notes & surlignages", set_search:"Rechercher", set_offline:"Télécharger hors-ligne", set_wa:"Partager sur WhatsApp",
    off:"Off", sleep_chap:"Fin chap.", sleep_done:"Audio arrêté (minuteur)",
    search_title:"Rechercher", search_hint:"Tapez un mot ou une phrase…", no_results:"Aucun résultat",
    notes_title:"Mes notes", no_notes:"Aucune note pour ce chapitre.", note_title:"Ajouter une note", note_save:"Enregistrer", note_saved:"Note enregistrée ✓",
    jump:"Aller", del:"Supprimer", resume:"Reprendre", img_saved:"Image enregistrée ✓",
    dl_done:"Disponible hors-ligne ✓", dl_fail:"Échec du téléchargement", wa_text:"Découvrez ce livre audio :",
    set_howto:"Comment ça marche", demo_skip:"Passer", demo_done:"Terminer",
    d1_t:"Lire", d1_d:"Glissez ou touchez les bords pour tourner les pages.",
    d2_t:"Écouter", d2_d:"Touchez ▶ en haut pour lancer la narration. Le texte défile et la phrase lue s'illumine.",
    d3_t:"Suivre", d3_d:"Pendant l'écoute, touchez une phrase pour y aller directement.",
    d4_t:"Surligner & noter", d4_d:"Touchez deux fois un mot, glissez pour étendre, puis Surligner ou Note.",
    d5_t:"Réglages", d5_d:"Mode nuit, taille du texte, vitesse, minuteur, recherche et hors-ligne.",
    d6_t:"Installer", d6_d:"Ajoutez l'app à votre écran d'accueil pour un accès plein écran et hors-ligne.",
    tag_audio:"Audio", no_audio:"Narration bientôt disponible",
    tap_hint:"Touchez une phrase pour y aller", no_audio_here:"Pas d'audio pour ce passage",
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
    a_hl:"Highlight", a_ul:"Underline", a_copy:"Copy", a_erase:"Erase", a_note:"Note", a_share:"Share", copied:"Copied ✓",
    set_title:"Settings", set_reading:"Reading", set_font:"Text size", set_mode:"Display", mode_flip:"Pages", mode_scroll:"Scroll",
    set_night:"Night mode", set_audio:"Audio", set_speed:"Speed", set_sleep:"Sleep timer", set_autoplay:"Auto-play next chapter",
    set_more:"More", set_notes:"My notes & highlights", set_search:"Search", set_offline:"Download offline", set_wa:"Share on WhatsApp",
    off:"Off", sleep_chap:"End ch.", sleep_done:"Audio stopped (timer)",
    search_title:"Search", search_hint:"Type a word or phrase…", no_results:"No results",
    notes_title:"My notes", no_notes:"No notes for this chapter.", note_title:"Add a note", note_save:"Save", note_saved:"Note saved ✓",
    jump:"Go", del:"Delete", resume:"Resume", img_saved:"Image saved ✓",
    dl_done:"Available offline ✓", dl_fail:"Download failed", wa_text:"Check out this audiobook:",
    set_howto:"How it works", demo_skip:"Skip", demo_done:"Got it",
    d1_t:"Read", d1_d:"Swipe or tap the edges to turn pages.",
    d2_t:"Listen", d2_d:"Tap ▶ at the top to start the narration. The text scrolls and the sentence being read lights up.",
    d3_t:"Follow", d3_d:"While listening, tap any sentence to jump straight there.",
    d4_t:"Highlight & note", d4_d:"Double-tap a word, drag to extend, then Highlight or Note.",
    d5_t:"Settings", d5_d:"Night mode, text size, speed, sleep timer, search and offline.",
    d6_t:"Install", d6_d:"Add the app to your home screen for full-screen, offline access.",
    tag_audio:"Audio", no_audio:"Narration coming soon",
    tap_hint:"Tap a sentence to jump there", no_audio_here:"No audio for this passage yet",
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
// feature state
let readMode = localStorage.getItem("ef-readmode")||"flip";
let listenMode = false, sentIndex = [], pageChar = {}, curSent = null;
let autoplayNext = localStorage.getItem("ef-autoplay")!=="0";
let sleepTimer = null, sleepMin = 0, sleepEndChap = false;
let pendingNote = null;
let chapterRaw = "", anchorCache = {};
// annotations
let ANNOT = {}; try{ ANNOT = JSON.parse(localStorage.getItem("ef-annot")||"{}"); }catch(e){ ANNOT={}; }
let curSel = null, selT = null, selectMode = false;
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
  renderLibrary(); renderInstallSteps(); refreshResume();
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
          ${hasParts?`<div class="badges"><span class="tag audio"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>${T[lang].tag_audio}${c.partial?" ·…":""}</span></div>`:""}
        </div>
        <div class="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>
      </div>`;
    }).join("")}</div>`;
  }).join("");
}

/* ---------- READER ---------- */
function startReading(){ openChapter("ch1"); }
function scrollToLib(){ $("library").scrollIntoView({behavior:"smooth"}); }
function openChapter(id, startPage){
  // default to the first text page (index 1) so we skip the cover page; cover is still a swipe back
  chap = CHAPTERS.find(x=>x.id===id); partIdx=0; followOn=false; rPage=(startPage==null?1:startPage); listenMode=false; curSent=null;
  renderReaderTitle(); renderAudioDock(); $("r-audio").classList.add("hidden");
  $("reader").classList.add("show"); document.body.style.overflow="hidden";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ buildReader(); saveProgress(); }));
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
      clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,180);
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

function buildReader(){ if(effectiveMode()==="scroll") buildScroll(); else buildFlip(); }
function effectiveMode(){ return (listenMode || readMode==="scroll") ? "scroll" : "flip"; }
function buildFlip(){
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
    const padX=24, padY=26, corner=30;
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
      mobileScrollSupport:false, clickEventForward:true, disableFlipByClick:true, useMouseEvents:true, swipeDistance:30,
      maxShadowOpacity:.5, drawShadow:true, flippingTime:620 });
    pf.loadFromHTML(fb.querySelectorAll(".flip-page"));
    rPages = pf.getPageCount();
    rPage = Math.min(want, rPages-1);
    if(rPage>0) pf.turnToPage(rPage);
    pf.on("flip", e=>{ rPage=e.data; userHold=Date.now(); updatePageUI(); hideSelBar(); saveProgress(); });
    // pdf-page -> flip index (cover offset = +1)
    pageFlipMap = {}; Object.keys(res.map).forEach(k=> pageFlipMap[k] = res.map[k] + 1);
    // timed word-anchored cues -> flip pages, per audio part
    cueMap = {};
    if(chap.parts) chap.parts.forEach(p=>{ const cs=cuesForPart(p.src, res.norm, res.pageLens); if(cs) cueMap[p.src]=cs; });
    useFlip = true;
    $("flip-wrap").style.display="flex"; $("r-scroll").style.display="none";
    applyAnnotations(); renderNoteMarkers();
  }catch(e){
    buildScroll();
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
function splitSentences(t){
  const out=[]; let last=0; const re=/[.!?…]+[)»"'’]?\s+/g; let m;
  while((m=re.exec(t))){ out.push(t.slice(last, m.index+m[0].length)); last=m.index+m[0].length; }
  if(last<t.length) out.push(t.slice(last));
  return out.length?out:[t];
}
function buildScroll(){
  destroyFlip();
  const blocks=(window.BOOK&&window.BOOK[chap.id])||[];
  let first=true, off=0;
  let html=chapterHeadHTML();
  blocks.forEach(b=>{
    html += `<span class="pgmark" data-pg="${b.pg}"></span>`;
    b.paras.forEach(p=>{
      const cls=first?"dropcap":""; first=false;
      let inner="";
      splitSentences(p).forEach(se=>{ inner += `<span class="sent" data-cs="${off}">${esc(se)}</span>`; off+=se.length; });
      html += `<p class="${cls}">${inner}</p>`;
    });
  });
  html += endCardHTML();
  const sc=$("r-scroll"); sc.innerHTML=html; sc.style.display="block"; sc.scrollTop=0;
  $("flip-wrap").style.display="none";
  useFlip=false; rPages=1; rPage=0; cueMap={}; curSent=null;
  buildSentenceIndex(); computePageChars();
  applyAnnotations(); renderNoteMarkers();
}
function buildSentenceIndex(){
  sentIndex=[]; document.querySelectorAll("#r-scroll .sent").forEach(el=>{ const s=+el.getAttribute("data-cs"); sentIndex.push({el, s, e:s+el.textContent.length}); });
}
function computePageChars(){
  pageChar={}; anchorCache={}; chapterRaw=""; let off=0; const blocks=(window.BOOK&&window.BOOK[chap.id])||[];
  blocks.forEach(b=>{ pageChar[b.pg]=off; b.paras.forEach(p=>{ chapterRaw+=p; off+=p.length; }); }); pageChar._end=off;
}
function pageCharStart(pg){
  if(pageChar[pg]!=null) return pageChar[pg];
  const keys=Object.keys(pageChar).filter(k=>k!=="_end").map(Number).sort((a,b)=>a-b);
  for(const k of keys) if(k>=pg) return pageChar[k];
  return pageChar._end||0;
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
  fontStep=Math.max(-3,Math.min(6,fontStep+d)); localStorage.setItem("ef-font",fontStep);
  document.documentElement.style.setProperty("--reader-fs",fontPx()+"px");
  const v=$("font-v"); if(v) v.textContent=Math.round((fontPx()/18)*100)+"%";
  if(chap){ clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,120); }
}
window.addEventListener("resize",()=>{ if(chap&&$("reader").classList.contains("show")){ clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,180); } });
document.addEventListener("keydown",(e)=>{ if(!$("reader").classList.contains("show"))return;
  if(e.key==="ArrowRight")nextPage(); if(e.key==="ArrowLeft")prevPage(); if(e.key==="Escape")closeReader(); });

/* ---------- ANNOTATIONS (highlight / underline / copy / erase) ---------- */
function saveAnnot(){ try{ localStorage.setItem("ef-annot", JSON.stringify(ANNOT)); }catch(e){} }
function annotRoot(){ return useFlip ? $("flipbook") : $("r-scroll"); }
function closestP(node){ node=(node&&node.nodeType===3)?node.parentNode:node; if(!node||!node.closest)return null;
  const p=node.closest("[data-cs]"); return (p && (p.closest("#flipbook")||p.closest("#r-scroll")))?p:null; }
function renderNoteMarkers(){ /* notes are rendered inline by applyAnnotations */ }
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
function clearSel(){ selectMode=false; const s=window.getSelection&&window.getSelection(); if(s&&s.removeAllRanges) s.removeAllRanges(); hideSelBar(); }
document.addEventListener("selectionchange",()=>{ clearTimeout(selT); selT=setTimeout(()=>{
  const sel=window.getSelection();
  if(!sel || sel.isCollapsed || sel.rangeCount===0){ selectMode=false; hideSelBar(); return; }
  showSelBar();
},160); });
function addAnnot(type){ if(!curSel||!chap) return; (ANNOT[chap.id]||(ANNOT[chap.id]=[])).push({s:curSel.s,e:curSel.e,type}); saveAnnot(); applyAnnotations(); clearSel(); }
function eraseSel(){ if(!curSel||!chap) return; const l=ANNOT[chap.id]||[]; ANNOT[chap.id]=l.filter(a=>!(a.e>curSel.s&&a.s<curSel.e)); saveAnnot(); applyAnnotations(); clearSel(); }
function copySel(){ const s=window.getSelection&&window.getSelection(); const t=s?s.toString():""; if(t&&navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(()=>toast(T[lang].copied)).catch(()=>{}); } clearSel(); }
function applyAnnotations(){
  if(!chap) return; const list=ANNOT[chap.id]||[]; const root=annotRoot(); if(!root) return;
  root.querySelectorAll("[data-cs]").forEach(p=>{
    const ds=+p.getAttribute("data-cs"); const text=p.textContent; const n=text.length; const de=ds+n;
    const ov=list.filter(a=>a.e>ds && a.s<de);
    if(!ov.length){ if(p.querySelector(".hl,.ul,.note-mark")) p.innerHTML=esc(text); return; }
    const hl=new Array(n).fill(false), ul=new Array(n).fill(false), nm=new Array(n).fill(false);
    ov.forEach(a=>{ const s=Math.max(0,a.s-ds), e=Math.min(n,a.e-ds); for(let i=s;i<e;i++){ if(a.type==="hl")hl[i]=true; else if(a.type==="ul")ul[i]=true; else if(a.type==="note")nm[i]=true; } });
    let html="", i=0;
    while(i<n){ const h=hl[i],u=ul[i],m=nm[i]; let j=i; while(j<n && hl[j]===h && ul[j]===u && nm[j]===m) j++;
      const seg=esc(text.slice(i,j));
      if(h||u||m){ const cls=[h?"hl":"",u?"ul":"",m?"note-mark":""].filter(Boolean).join(" "); html+=`<span class="${cls}">${seg}</span>`; }
      else html+=seg;
      i=j; }
    p.innerHTML=html;
  });
}

/* ---------- block pinch / double-tap zoom (native app feel) ---------- */
["gesturestart","gesturechange","gestureend"].forEach(ev=> document.addEventListener(ev, e=>e.preventDefault(), {passive:false}));

/* ---------- word selection on the flipbook: double-tap / long-press, then drag to extend ---------- */
function selectWordAt(x,y){
  let node=null, off=0;
  if(document.caretRangeFromPoint){ const r=document.caretRangeFromPoint(x,y); if(r){ node=r.startContainer; off=r.startOffset; } }
  else if(document.caretPositionFromPoint){ const c=document.caretPositionFromPoint(x,y); if(c){ node=c.offsetNode; off=c.offset; } }
  if(!node || node.nodeType!==3 || !closestP(node)) return false;
  const text=node.textContent; const isW=ch=>/[\p{L}\p{N}’'\-]/u.test(ch||"");
  let s=off, e=off;
  while(s>0 && isW(text[s-1])) s--;
  while(e<text.length && isW(text[e])) e++;
  if(e<=s) return false;
  const range=document.createRange(); range.setStart(node,s); range.setEnd(node,e);
  const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  return true;
}
function enterSelect(x,y){ if(selectWordAt(x,y)){ selectMode=true; setTimeout(showSelBar,0); return true; } return false; }
(function initSelectGestures(){
  const wrap=document.getElementById("flip-wrap"); if(!wrap) return;
  // while selecting, keep touch/pointer events away from the flip engine so drag extends the selection (no page turn)
  ["touchstart","touchmove","touchend","pointerdown","pointermove","pointerup","mousedown","mousemove","mouseup"]
    .forEach(ev=> wrap.addEventListener(ev, e=>{ if(selectMode) e.stopPropagation(); }, true));
  let lastTap=0, lastXY=null, lp=null, lpXY=null;
  wrap.addEventListener("touchend",(e)=>{
    if(e.changedTouches.length!==1) return;
    const t=e.changedTouches[0], now=Date.now();
    if(now-lastTap<320 && lastXY && Math.hypot(t.clientX-lastXY.x,t.clientY-lastXY.y)<30){ enterSelect(t.clientX,t.clientY); lastTap=0; lastXY=null; }
    else { lastTap=now; lastXY={x:t.clientX,y:t.clientY}; }
  }, false);
  wrap.addEventListener("touchstart",(e)=>{ if(e.touches.length!==1) return; const t=e.touches[0]; lpXY={x:t.clientX,y:t.clientY};
    clearTimeout(lp); lp=setTimeout(()=>{ if(lpXY) enterSelect(lpXY.x,lpXY.y); },480); }, false);
  wrap.addEventListener("touchmove",(e)=>{ if(lp&&lpXY&&e.touches[0]){ const t=e.touches[0]; if(Math.hypot(t.clientX-lpXY.x,t.clientY-lpXY.y)>12){ clearTimeout(lp); lp=null; } } }, false);
  wrap.addEventListener("touchend",()=>{ clearTimeout(lp); lp=null; }, false);
  wrap.addEventListener("dblclick",(e)=> enterSelect(e.clientX,e.clientY));
})();

/* ---------- strict "feels-like-an-app" behaviour ---------- */
document.addEventListener("contextmenu",(e)=>{ if(!(e.target.closest && e.target.closest(".page-inner,.r-scroll"))) e.preventDefault(); });
document.addEventListener("dragstart",(e)=> e.preventDefault());

/* ===================== FEATURES ===================== */
/* night mode */
function applyNight(){ const on=localStorage.getItem("ef-night")==="1"; document.documentElement.classList.toggle("night",on);
  const m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute("content", on?"#0a0907":"#241a12");
  const t=$("tg-night"); if(t) t.classList.toggle("on",on); }
function toggleNight(){ localStorage.setItem("ef-night", localStorage.getItem("ef-night")==="1"?"0":"1"); applyNight(); }

/* settings */
function openSettings(){ renderSettings(); openOverlay("ov-settings"); }
function renderSettings(){
  const v=$("font-v"); if(v) v.textContent=Math.round((fontPx()/18)*100)+"%";
  $("mode-flip").classList.toggle("on", readMode==="flip");
  $("mode-scroll").classList.toggle("on", readMode==="scroll");
  $("tg-night").classList.toggle("on", document.documentElement.classList.contains("night"));
  $("tg-autoplay").classList.toggle("on", autoplayNext);
  $("speed-chips").innerHTML=[0.75,1,1.25,1.5,1.75,2].map(s=>`<button class="chip2 ${s===speed?'on':''}" onclick="setSpeed(${s})">${s}×</button>`).join("");
  const opts=[[0,T[lang].off],[15,"15"],[30,"30"],[45,"45"],[60,"60"],[-1,T[lang].sleep_chap]];
  $("sleep-chips").innerHTML=opts.map(o=>`<button class="chip2 ${(o[0]===sleepMin&&!sleepEndChap&&o[0]!==-1)||(o[0]===-1&&sleepEndChap)?'on':''}" onclick="setSleep(${o[0]})">${o[1]}</button>`).join("");
  const nc=$("notes-count"); if(nc){ const cnt=(ANNOT[chap&&chap.id]||[]).length; nc.textContent=cnt||""; }
}
function setMode(m){ readMode=m; localStorage.setItem("ef-readmode",m); if(m==="flip") listenMode=false; renderSettings(); if(chap) buildReader(); }
function setSpeed(s){ speed=s; audio.playbackRate=s; const b=$("ra-spd"); if(b) b.textContent=s+"×"; renderSettings(); }
function toggleAutoplay(){ autoplayNext=!autoplayNext; localStorage.setItem("ef-autoplay",autoplayNext?"1":"0"); renderSettings(); }

/* sleep timer */
function setSleep(min){ clearTimeout(sleepTimer); sleepEndChap=false; sleepMin=0;
  if(min===-1) sleepEndChap=true;
  else if(min>0){ sleepMin=min; sleepTimer=setTimeout(()=>{ pause(); sleepMin=0; toast(T[lang].sleep_done); }, min*60000); }
  renderSettings();
}

/* progress / resume */
function saveProgress(){ if(!chap) return; try{ localStorage.setItem("ef-progress", JSON.stringify({c:chap.id,p:rPage,m:effectiveMode()})); }catch(e){} refreshResume(); }
function refreshResume(){ let p=null; try{ p=JSON.parse(localStorage.getItem("ef-progress")||"null"); }catch(e){}
  const btn=$("resume-btn"); if(!btn) return;
  const c=p&&p.c?CHAPTERS.find(x=>x.id===p.c):null;
  if(c){ $("resume-label").textContent=`${T[lang].resume} · ${c[lang][0]}`; btn.classList.add("show"); } else btn.classList.remove("show");
}
function resumeReading(){ let p=null; try{ p=JSON.parse(localStorage.getItem("ef-progress")||"null"); }catch(e){}
  if(!p||!p.c){ startReading(); return; }
  if(p.m==="scroll"){ readMode="scroll"; localStorage.setItem("ef-readmode","scroll"); }
  openChapter(p.c, p.p||0);
}

/* notes */
function addNote(){ if(!curSel||!chap) return; pendingNote={s:curSel.s,e:curSel.e};
  const sel=window.getSelection(); $("note-quote").textContent=sel?sel.toString():""; $("note-text").value="";
  hideSelBar(); openOverlay("ov-note"); setTimeout(()=>{ const t=$("note-text"); if(t)t.focus(); },220); }
function saveNote(){ if(!pendingNote||!chap) return; const txt=$("note-text").value.trim();
  (ANNOT[chap.id]||(ANNOT[chap.id]=[])).push({s:pendingNote.s,e:pendingNote.e,type:"note",text:txt});
  saveAnnot(); applyAnnotations(); pendingNote=null; closeOverlay("ov-note"); clearSel(); toast(T[lang].note_saved); }
function openNotes(){ renderNotes(); openOverlay("ov-notes"); }
function annotQuote(a){ const blocks=(window.BOOK[chap.id])||[]; let off=0,res="";
  for(const b of blocks){ for(const p of b.paras){ const ps=off,pe=off+p.length; if(a.e>ps&&a.s<pe) res+=p.slice(Math.max(0,a.s-ps),Math.min(p.length,a.e-ps))+" "; off+=p.length; } }
  return res.trim(); }
function renderNotes(){
  const list=(ANNOT[chap&&chap.id]||[]); const box=$("notes-list");
  if(!list.length){ box.innerHTML=`<div class="sr-empty">${T[lang].no_notes}</div>`; return; }
  box.innerHTML=list.map((a,i)=>{ const q=annotQuote(a); const lab=a.type==="note"?T[lang].a_note:(a.type==="ul"?T[lang].a_ul:T[lang].a_hl);
    return `<div class="note-item"><div class="nt">${lab}</div><div class="nq">${esc(q)}</div>${a.type==="note"&&a.text?`<div class="nn">${esc(a.text)}</div>`:""}<div class="nrow"><button onclick="jumpAnnot(${i})">${T[lang].jump}</button><button class="del" onclick="delAnnot(${i})">${T[lang].del}</button></div></div>`; }).join("");
}
function jumpAnnot(i){ const a=(ANNOT[chap.id]||[])[i]; if(!a) return; closeOverlay("ov-notes"); scrollToChar(a.s); }
function delAnnot(i){ const l=ANNOT[chap.id]||[]; l.splice(i,1); saveAnnot(); applyAnnotations(); renderNotes(); renderSettings(); }
function scrollToChar(c){
  const sel = useFlip ? "#flipbook [data-cs]" : "#r-scroll [data-cs]";
  const units=[...document.querySelectorAll(sel)];
  const tgt=units.find(u=> (+u.getAttribute("data-cs"))+u.textContent.length>c );
  if(!tgt) return;
  if(useFlip&&pf){ const pg=pageOfEl(tgt); try{ pf.turnToPage(Math.max(0,Math.min(pg,rPages-1))); }catch(e){} }
  else tgt.scrollIntoView({behavior:"smooth",block:"center"});
}

/* search */
const fold=(s)=> s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function openSearch(){ const i=$("search-input"); i.value=""; $("search-results").innerHTML=`<div class="sr-empty">${T[lang].search_hint}</div>`; openOverlay("ov-search"); setTimeout(()=>i.focus(),220); }
function snip(p,idx,len){ const a=Math.max(0,idx-32), b=Math.min(p.length,idx+len+50);
  return (a>0?"…":"")+esc(p.slice(a,idx))+"<b>"+esc(p.slice(idx,idx+len))+"</b>"+esc(p.slice(idx+len,b))+(b<p.length?"…":""); }
function runSearch(q){
  q=(q||"").trim(); const box=$("search-results");
  if(q.length<2){ box.innerHTML=`<div class="sr-empty">${T[lang].search_hint}</div>`; return; }
  const fq=fold(q), res=[];
  for(const c of CHAPTERS){ const blocks=window.BOOK[c.id]||[]; let off=0;
    for(const b of blocks){ for(const p of b.paras){ const fp=fold(p); let idx=fp.indexOf(fq);
      while(idx>=0 && res.length<80){ res.push({cid:c.id,label:c[lang][0],char:off+idx,snip:snip(p,idx,q.length)}); idx=fp.indexOf(fq,idx+fq.length); }
      off+=p.length; } if(res.length>=80) break; } if(res.length>=80) break; }
  box.innerHTML = res.length ? res.map(r=>`<div class="sr" onclick="goSearch('${r.cid}',${r.char})"><div class="sc">${r.label}</div><div class="sx">${r.snip}</div></div>`).join("")
    : `<div class="sr-empty">${T[lang].no_results}</div>`;
}
function goSearch(cid,char){ closeOverlay("ov-search"); openChapter(cid); setTimeout(()=>scrollToChar(char),520); }

/* share quote as image + whatsapp */
function quoteText(){ const s=window.getSelection&&window.getSelection(); return s?s.toString().trim():""; }
function makeQuoteCard(text, cb){
  const cv=$("share-canvas"), ctx=cv.getContext("2d"), W=cv.width, H=cv.height;
  ctx.fillStyle="#241a12"; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#c9a24e"; ctx.lineWidth=6; ctx.strokeRect(46,46,W-92,H-92);
  ctx.fillStyle="#e8c170"; ctx.font="bold 130px Georgia"; ctx.fillText("“",86,200);
  ctx.fillStyle="#faf6f0"; ctx.font="italic 52px Georgia";
  const words=text.split(" "); let line=""; const maxW=W-200,x=96,lh=74,y0=300; const lines=[];
  for(const w of words){ const t=line?line+" "+w:w; if(ctx.measureText(t).width>maxW && line){ lines.push(line); line=w; } else line=t; }
  if(line) lines.push(line);
  const shown=lines.slice(0,13); shown.forEach((l,i)=>ctx.fillText(l,x,y0+i*lh));
  let by=y0+shown.length*lh+50;
  ctx.strokeStyle="#c9a24e"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(96,by); ctx.lineTo(300,by); ctx.stroke();
  ctx.fillStyle="#e8c170"; ctx.font="bold 38px Georgia"; ctx.fillText("BÂTIR UN EMPIRE FAMILIAL",96,by+62);
  ctx.fillStyle="#c9a24e"; ctx.font="28px Georgia"; ctx.fillText("Pasteur Grâce A. Sumbela — Tome 1",96,by+108);
  cv.toBlob(b=>cb(b),"image/png");
}
function shareQuote(){ const q=quoteText(); hideSelBar(); if(!q){ return; }
  makeQuoteCard(q,(blob)=>{
    const file=new File([blob],"empire-familial.png",{type:"image/png"});
    const data={ title:"Bâtir un Empire Familial", text:`“${q}” — Bâtir un Empire Familial, Pasteur Grâce A. Sumbela` };
    if(navigator.canShare && navigator.canShare({files:[file]})) navigator.share(Object.assign({files:[file]},data)).catch(()=>{});
    else if(navigator.share) navigator.share(data).catch(()=>{});
    else { const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="empire-familial.png"; a.click(); toast(T[lang].img_saved); }
  });
  clearSel();
}
function shareApp(){ const url=location.origin+location.pathname; window.open("https://wa.me/?text="+encodeURIComponent(`${T[lang].wa_text} ${url}`),"_blank"); }

/* offline download */
async function downloadOffline(){
  const bar=$("dl-bar"), fill=$("dl-fill"), meta=$("dl-meta"); bar.style.display="block"; meta.textContent="…";
  const urls=[]; CHAPTERS.forEach(c=>{ if(c.parts) c.parts.forEach(p=>urls.push(p.src)); });
  ["./","index.html","app.js","book-content.js","vendor/page-flip.browser.js","manifest.webmanifest","assets/cover.jpg","assets/author.jpg","icons/icon-512.png?v=2"].forEach(u=>urls.push(u));
  let done=0;
  if(!("caches" in window)){ meta.textContent=T[lang].dl_fail; return; }
  try{ const cache=await caches.open("ef-offline");
    for(const u of urls){ try{ const r=await fetch(u,{cache:"reload"}); if(r&&r.ok) await cache.put(u,r.clone()); }catch(e){}
      done++; fill.style.width=Math.round(done/urls.length*100)+"%"; meta.textContent=Math.round(done/urls.length*100)+"%"; }
    meta.textContent=T[lang].dl_done; localStorage.setItem("ef-offline","1");
  }catch(e){ meta.textContent=T[lang].dl_fail; }
}

/* background audio: media session + keep playing */
function setupMediaSession(){
  if(!("mediaSession" in navigator)) return;
  try{
    navigator.mediaSession.metadata=new MediaMetadata({ title: chap?chap[lang][1]:"Empire Familial",
      artist:"Pasteur Grâce A. Sumbela", album:"Bâtir un Empire Familial — Tome 1",
      artwork:[{src:"icons/icon-512.png?v=2",sizes:"512x512",type:"image/png"}] });
    navigator.mediaSession.setActionHandler("play",()=>togglePlay());
    navigator.mediaSession.setActionHandler("pause",()=>pause());
    navigator.mediaSession.setActionHandler("seekbackward",()=>{ audio.currentTime=Math.max(0,audio.currentTime-15); });
    navigator.mediaSession.setActionHandler("seekforward",()=>{ audio.currentTime=Math.min(audio.duration||0,audio.currentTime+15); });
    navigator.mediaSession.setActionHandler("previoustrack",()=>{ if(chap.parts&&partIdx>0) goPart(partIdx-1); });
    navigator.mediaSession.setActionHandler("nexttrack",()=>{ if(chap.parts&&partIdx<chap.parts.length-1) goPart(partIdx+1); else goNextChapter(true); });
  }catch(e){}
}
function enterListen(){ if(!listenMode){ listenMode=true; if(chap) buildReader();
    if(!localStorage.getItem("ef-taphint")){ localStorage.setItem("ef-taphint","1"); setTimeout(()=>toast(T[lang].tap_hint),900); } }
  setupMediaSession(); saveProgress(); }

/* karaoke: highlight current sentence in scroll mode */
/* time <-> char map, anchored on the page-end markings (cues), else proportional */
function cueAnchors(part){
  if(anchorCache[part.src]) return anchorCache[part.src];
  const startC=pageCharStart(part.ps), endC=pageCharStart(part.pe+1), dur=part.sec||1;
  let arr=[{t:0,c:startC}];
  const cues=SYNC[part.src];
  if(cues && chapterRaw){ const f=fold(chapterRaw); let cursor=startC;
    for(const c of cues){ const idx=f.indexOf(c.a, cursor); if(idx>=0){ arr.push({t:c.t, c:idx+c.a.length}); cursor=idx+c.a.length; } } }
  arr.push({t:dur, c:endC});
  const clean=[arr[0]]; for(let i=1;i<arr.length;i++){ const last=clean[clean.length-1]; if(arr[i].t>last.t && arr[i].c>last.c) clean.push(arr[i]); }
  anchorCache[part.src]=clean; return clean;
}
function interpAB(a, key, val, out){
  for(let i=0;i<a.length-1;i++){ const p=a[i], q=a[i+1];
    if(val>=p[key] && val<=q[key]){ const f=(q[key]-p[key])?(val-p[key])/(q[key]-p[key]):0; return p[out]+f*(q[out]-p[out]); } }
  return val<=a[0][key] ? a[0][out] : a[a.length-1][out];
}
function timeToChar(part,t){ return interpAB(cueAnchors(part),"t",t,"c"); }
function charToTime(part,c){ return interpAB(cueAnchors(part),"c",c,"t"); }

function karaokeTick(){
  if(useFlip||!chap||!chap.parts||!playing) return;
  const part=chap.parts[partIdx]; if(!part) return;
  const cur=timeToChar(part, audio.currentTime);
  let sent=null;
  for(const x of sentIndex){ if(cur>=x.s && cur<x.e){ sent=x; break; } }
  if(!sent){ for(const x of sentIndex){ if(x.s>=cur){ sent=x; break; } } }
  if(sent && (!curSent || sent.el!==curSent.el)){
    if(curSent&&curSent.el) curSent.el.classList.remove("now");
    sent.el.classList.add("now"); curSent=sent;
    if(Date.now()-userHold>3000) sent.el.scrollIntoView({behavior:"smooth",block:"center"});
  }
}

/* tap a sentence to jump the audio there (and load the right part) */
function seekToChar(c){
  if(!chap||!chap.parts) return false;
  let ti=-1;
  for(let i=0;i<chap.parts.length;i++){ const p=chap.parts[i]; const a=pageCharStart(p.ps), b=pageCharStart(p.pe+1); if(c>=a && c<b){ ti=i; break; } }
  if(ti<0){ toast(T[lang].no_audio_here); return false; }
  const part=chap.parts[ti];
  if(ti!==partIdx){ partIdx=ti; audio.src=part.src; audio.playbackRate=speed;
    document.querySelectorAll("#ra-chips .ra-chip").forEach((ch,j)=>ch.classList.toggle("on",j===partIdx)); refreshAudioIcons(); }
  const t=charToTime(part,c);
  const doSeek=()=>{ try{ audio.currentTime=Math.max(0, Math.min((audio.duration||part.sec)-0.05, t)); }catch(e){} };
  if(audio.readyState>=1) doSeek(); else audio.addEventListener("loadedmetadata",doSeek,{once:true});
  if(!playing){ followOn=true; updateFollow(); enterListen(); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); }
  userHold=0; return true;
}

/* ===================== HOW-TO DEMO ===================== */
const G='#c9a24e';
const DEMO=[
  { key:"d1", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><rect x="22" y="28" width="76" height="64" rx="5"/><line x1="60" y1="28" x2="60" y2="92"/><path d="M34 84V40M86 84V40" opacity=".4"/><path d="M104 60l8 0m-4-4l4 4-4 4" stroke-linecap="round"/><path d="M16 60l-8 0m4-4l-4 4 4 4" stroke-linecap="round"/></svg>` },
  { key:"d2", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><circle cx="60" cy="60" r="30"/><path d="M52 47v26l22-13z" fill="${G}" stroke="none"/><path d="M96 50v20M104 44v32M16 50v20M24 44v32" stroke-linecap="round"/></svg>` },
  { key:"d3", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><line x1="24" y1="38" x2="96" y2="38"/><rect x="22" y="52" width="60" height="14" rx="4" fill="${G}" fill-opacity=".3" stroke="none"/><line x1="24" y1="59" x2="80" y2="59"/><line x1="24" y1="80" x2="96" y2="80"/><path d="M70 70l10 18 5-7 8 3-8-16z" fill="${G}" stroke="none"/></svg>` },
  { key:"d4", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><line x1="24" y1="40" x2="96" y2="40"/><rect x="22" y="54" width="52" height="14" rx="3" fill="${G}" fill-opacity=".35" stroke="none"/><line x1="24" y1="61" x2="72" y2="61"/><line x1="24" y1="82" x2="96" y2="82"/><path d="M78 86l16-16 6 6-16 16-8 2z"/></svg>` },
  { key:"d5", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><circle cx="60" cy="60" r="14"/><path d="M60 28v10M60 82v10M92 60h-10M38 60H28M82 38l-7 7M45 75l-7 7M82 82l-7-7M45 45l-7-7"/></svg>` },
  { key:"d6", illu:`<svg viewBox="0 0 120 120" fill="none" stroke="${G}" stroke-width="3"><rect x="40" y="20" width="40" height="80" rx="7"/><line x1="54" y1="92" x2="66" y2="92"/><path d="M60 38v26m0 0l-8-8m8 8l8-8" stroke-linecap="round"/></svg>` },
];
let demoI=0;
function openDemo(){ demoI=0; closeOverlay("ov-settings"); renderDemo(); openOverlay("ov-demo"); }
function closeDemo(){ closeOverlay("ov-demo"); localStorage.setItem("ef-demo","1"); }
function demoNext(){ if(demoI<DEMO.length-1){ demoI++; renderDemo(); } else closeDemo(); }
function demoPrev(){ if(demoI>0){ demoI--; renderDemo(); } }
function renderDemo(){
  const d=DEMO[demoI];
  $("demo-illu").innerHTML=d.illu;
  $("demo-title").textContent=T[lang][d.key+"_t"];
  $("demo-text").textContent=T[lang][d.key+"_d"];
  $("demo-dots").innerHTML=DEMO.map((_,i)=>`<i class="${i===demoI?'on':''}"></i>`).join("");
  $("demo-prev").style.visibility=demoI===0?"hidden":"visible";
  $("demo-next").innerHTML = demoI===DEMO.length-1 ? `<span>${T[lang].demo_done}</span>` : "›";
}

/* ---------- AUDIO ---------- */
function toggleAudioDock(){ if(!(chap.parts&&chap.parts.length)){ toast(T[lang].no_audio); return; }
  $("r-audio").classList.toggle("hidden"); if(chap){ clearTimeout(rebuildT); rebuildT=setTimeout(buildReader,170); } }
function topAudio(){ if(!(chap&&chap.parts&&chap.parts.length)){ toast(T[lang].no_audio); return; }
  $("r-audio").classList.remove("hidden"); togglePlay(); }
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
function togglePlay(){ if(!(chap.parts))return; if(playing){pause();return;} loadPart(); followOn=true; updateFollow(); enterListen(); audio.play().then(()=>{playing=true;refreshAudioIcons(); if("mediaSession" in navigator) navigator.mediaSession.playbackState="playing";}).catch(()=>{}); }
function pause(){ audio.pause(); playing=false; refreshAudioIcons(); if("mediaSession" in navigator) navigator.mediaSession.playbackState="paused"; }
function goPart(i){ partIdx=Math.max(0,Math.min(chap.parts.length-1,i)); audio.src=chap.parts[partIdx].src; audio.playbackRate=speed; document.querySelectorAll("#ra-chips .ra-chip").forEach((c,j)=>c.classList.toggle("on",j===partIdx)); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); }
function cycleSpeed(){ speed=speeds[(speeds.indexOf(speed)+1)%speeds.length]; audio.playbackRate=speed; const b=$("ra-spd"); if(b)b.textContent=speed+"×"; }
function toggleFollow(){ followOn=!followOn; updateFollow(); }
function updateFollow(){ const b=$("ra-follow"); if(b)b.classList.toggle("on",followOn); }
function refreshAudioIcons(){
  const pp = playing?'<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>';
  const ic=$("ra-icon"); if(ic) ic.innerHTML=pp;
  const top=$("top-audio-ic"); if(top) top.innerHTML=pp;
  const pt=$("ra-part"); if(pt&&chap.parts){ const p=chap.parts[partIdx]; pt.textContent=(chap.parts.length>1?`${T[lang].part} ${partIdx+1}/${chap.parts.length} · `:"")+`p. ${p.pg}`; }
}
function fmt(s){ s=Math.floor(s||0); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
audio.addEventListener("timeupdate",()=>{
  if(!chap||!chap.parts)return;
  const pct=audio.duration?(audio.currentTime/audio.duration*100):0;
  const f=$("ra-fill"); if(f)f.style.width=pct+"%";
  const c=$("ra-cur"),d=$("ra-dur"); if(c)c.textContent=fmt(audio.currentTime); if(d)d.textContent=fmt(audio.duration);
  if(!useFlip){ karaokeTick(); }                      // listen mode → highlight current sentence (karaoke)
  else if(followOn && $("reader").classList.contains("show") && Date.now()-userHold>4500 && audio.duration && pf){
    const part=chap.parts[partIdx];
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
  }
  if("mediaSession" in navigator && navigator.mediaSession.setPositionState && audio.duration){
    try{ navigator.mediaSession.setPositionState({duration:audio.duration, position:audio.currentTime, playbackRate:speed}); }catch(e){}
  }
});
audio.addEventListener("ended",()=>{
  if(chap.parts && partIdx<chap.parts.length-1){ partIdx++; audio.src=chap.parts[partIdx].src; audio.playbackRate=speed;
    document.querySelectorAll("#ra-chips .ra-chip").forEach((c,j)=>c.classList.toggle("on",j===partIdx));
    audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); return; }
  playing=false; refreshAudioIcons();
  const nx=nextChapterOf(); if(autoplayNext && nx && nx.parts) goNextChapter(true);   // continue narration into next chapter
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
applyNight(); applyLang(); renderLibrary(); renderInstallSteps(); refreshResume();
(function(){ const sc=$("r-scroll"); if(sc){ let rt=null;
  sc.addEventListener("scroll",()=>{ userHold=Date.now(); clearTimeout(rt); rt=setTimeout(saveProgress,400); },{passive:true});
  // tap a sentence to jump the narration there
  sc.addEventListener("click",(e)=>{ const sel=window.getSelection&&window.getSelection(); if(sel&&!sel.isCollapsed) return;
    const s=e.target.closest && e.target.closest(".sent[data-cs]"); if(s && chap && chap.parts) seekToChar(+s.getAttribute("data-cs")); });
} })();
/* keep audio alive in background; restore media-session on visibility */
document.addEventListener("visibilitychange",()=>{ if(!document.hidden && playing) setupMediaSession(); });
/* first-run how-to demo */
if(!localStorage.getItem("ef-demo")) setTimeout(openDemo, 700);
