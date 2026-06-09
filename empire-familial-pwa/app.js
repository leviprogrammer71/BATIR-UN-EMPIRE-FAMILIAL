/* ============================================================
   Bâtir un Empire Familial — Ebook + Audiobook PWA
   ============================================================ */
const STRIPE_LINK = "https://buy.stripe.com/14A7sK3MYcNKbNTahR3gk0b";

const CHAPTERS = [
  { id:"preface", n:"◆", sec:"open", free:true, fr:["Préface","Par l'Apôtre Roland Dalo"], en:["Preface","By Apostle Roland Dalo"] },
  { id:"intro", n:"◆", sec:"open", free:true, fr:["Introduction","L'histoire d'Élias de Likasi"], en:["Introduction","The story of Élias of Likasi"] },
  { id:"ch1", n:"1", sec:"truths", fr:["Chapitre 1","Le mariage, première pierre de l'empire familial"], en:["Chapter 1","Marriage, the first stone of the family empire"],
    parts:[
      {src:"audio/ch1-1.mp3", pg:"17–20", sec:198, ps:17, pe:19},
      {src:"audio/ch1-2.mp3", pg:"20–24", sec:276, ps:20, pe:23},
      {src:"audio/ch1-3.mp3", pg:"24–27", sec:202, ps:24, pe:26},
      {src:"audio/ch1-4.mp3", pg:"27–29", sec:147, ps:27, pe:28},
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
    cta_start:"Commencer la lecture", cta_buy:"Acheter le livre", cta_read:"Lire les chapitres",
    auth_role:"Serviteur · Formateur · Bâtisseur",
    auth_bio:"Pasteur Principal de l'Église Pierre Vivante (PIVA-CEM), Président de Vis'A Internationale, initiateur de « L'École de Vie ».",
    lib_title:"Sommaire", lib_sub:"15 chapitres à lire et à écouter",
    install_app:"Installer l'application",
    acc_title:"Accéder au livre complet", acc_text:"La Préface et l'Introduction sont en accès libre. Procurez-vous le livre pour lire et écouter tous les chapitres.",
    acc_buy:"Acheter maintenant", acc_already:"Déjà acheté ?", acc_unlock:"Déverrouiller", close:"Fermer",
    ins_title:"Installer l'application", ins_text:"Ajoutez Empire Familial à votre écran d'accueil : plein écran, hors-ligne, comme une vraie app.", ins_now:"Installer maintenant",
    tag_audio:"Audio", tag_free:"Libre", granted:"Accès déverrouillé ✓", need_code:"Entrez un code valide.",
    no_audio:"Narration bientôt disponible", locked:"Déverrouillez pour lire ce chapitre.",
    listen:"Écouter en lisant", page:"Page", of:"sur", part:"Partie", pages_lbl:"pages",
    follow:"Suivi", original_fr:"Texte original en français",
    next_ch:"Chapitre suivant", end_ch:"Fin du chapitre",
    locked_listen:"Déverrouillez pour écouter", buy_short:"Acheter",
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
    cta_start:"Start reading", cta_buy:"Buy the book", cta_read:"Read the chapters",
    auth_role:"Servant · Trainer · Builder",
    auth_bio:"Senior Pastor of the Pierre Vivante Church (PIVA-CEM), President of Vis'A International, founder of “L'École de Vie”.",
    lib_title:"Contents", lib_sub:"15 chapters to read and listen to",
    install_app:"Install the app",
    acc_title:"Unlock the full book", acc_text:"The Preface and Introduction are free. Get the book to read and listen to every chapter.",
    acc_buy:"Buy now", acc_already:"Already purchased?", acc_unlock:"Unlock", close:"Close",
    ins_title:"Install the app", ins_text:"Add Empire Familial to your home screen: full-screen, offline, like a real app.", ins_now:"Install now",
    tag_audio:"Audio", tag_free:"Free", granted:"Access unlocked ✓", need_code:"Enter a valid code.",
    no_audio:"Narration coming soon", locked:"Unlock to read this chapter.",
    listen:"Listen while reading", page:"Page", of:"of", part:"Part", pages_lbl:"pages",
    follow:"Follow", original_fr:"Original text in French",
    next_ch:"Next chapter", end_ch:"End of chapter",
    locked_listen:"Unlock to listen", buy_short:"Buy",
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
let hasAccess = false;
let curOS = "ios";
let deferredPrompt = null;
let fontStep = parseInt(localStorage.getItem("ef-font")||"0",10);
// reader
let chap = null;          // current chapter object
let rPage = 0, rPages = 1, rStep = 1;
let userHold = 0;
// audio
let partIdx = 0, playing = false, speed = 1, followOn = false;
const speeds = [1,1.25,1.5,1.75,2,0.75];
const audio = document.getElementById("audio");
const $ = (id)=>document.getElementById(id);

/* ---------- ACCESS ---------- */
function initAccess(){
  const url = new URLSearchParams(location.search);
  if (url.get("preview")==="1" || location.hash==="#preview"){ hasAccess=true; sessionStorage.setItem("ef-preview","1"); }
  if (sessionStorage.getItem("ef-preview")==="1"){ hasAccess=true; $("preview-pill").style.display="block"; }
  if (localStorage.getItem("ef-access")==="granted") hasAccess=true;
  syncCTA();
}
function grant(){ hasAccess=true; localStorage.setItem("ef-access","granted"); syncCTA(); renderLibrary(); toast(T[lang].granted); }
function syncCTA(){ const b=$("cta-2"); b.style.display = hasAccess ? "none":"flex"; }
function submitCode(){ const v=$("acc-code").value.trim(); if(v){ grant(); closeOverlay("ov-access"); } else toast(T[lang].need_code); }
function secondaryCTA(){ if(hasAccess) openChapter("ch1"); else window.open(STRIPE_LINK,"_blank"); }

/* ---------- i18n ---------- */
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el=>{ const k=el.getAttribute("data-i"); if(T[lang][k]!=null) el.textContent=T[lang][k]; });
  $("lang-label").textContent = lang==="fr" ? "EN":"FR";
  $("acc-buy").href = STRIPE_LINK;
  $("r-langnote").textContent = T[lang].original_fr;
  $("r-langnote").style.display = lang==="en" ? "block":"none";
  renderLibrary(); renderInstallSteps();
  if (chap){ renderReaderTitle(); renderAudioDock(); }
}
function toggleLang(){ lang = lang==="fr"?"en":"fr"; localStorage.setItem("ef-lang",lang); applyLang(); }

/* ---------- LIBRARY ---------- */
function renderLibrary(){
  const order=["open","truths","battles","riches","close"];
  $("lib-list").innerHTML = order.map(sec=>{
    const items=CHAPTERS.filter(c=>c.sec===sec);
    return `<div class="secg"><div class="sec-label">${SECTIONS[sec][lang]}</div>${items.map(c=>{
      const [label,sub]=c[lang]; const locked = !c.free && !hasAccess;
      const hasParts = !!(c.parts&&c.parts.length);
      return `<div class="row ${locked?'locked':''}" onclick="openChapter('${c.id}')">
        <div class="num">${c.n}</div>
        <div class="info">
          <div class="rl">${label}</div>
          <div class="rs">${sub}</div>
          <div class="badges">
            ${c.free?`<span class="tag free">${T[lang].tag_free}</span>`:""}
            ${hasParts?`<span class="tag audio"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/></svg>${T[lang].tag_audio}${c.partial?" ·…":""}</span>`:""}
          </div>
        </div>
        <div class="go">${locked
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`}</div>
      </div>`;
    }).join("")}</div>`;
  }).join("");
}

/* ---------- READER ---------- */
function startReading(){ openChapter("preface"); }
function openChapter(id){
  const c = CHAPTERS.find(x=>x.id===id);
  if (!c.free && !hasAccess){ openOverlay("ov-access"); return; }
  chap = c; partIdx = 0; followOn = false;
  renderBook(); renderReaderTitle(); renderAudioDock();
  $("r-audio").classList.add("hidden");
  $("reader").classList.add("show");
  document.body.style.overflow="hidden";
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ paginate(); gotoPage(0,false); }); });
}
function closeReader(){
  pause(); $("reader").classList.remove("show"); document.body.style.overflow="";
  renderLibrary();
}
function renderReaderTitle(){
  if(!chap) return; const [label,sub]=chap[lang];
  $("r-ct").textContent=label; $("r-cs").textContent=sub;
}
function renderBook(){
  const data = (window.BOOK&&window.BOOK[chap.id])||[];
  const [label,sub]=chap[lang];
  let html = `<div class="chead"><div class="k">${label}</div><div class="h">${sub}</div><div class="o"></div></div>`;
  data.forEach((blk,bi)=>{
    html += `<span class="pgmark" data-pg="${blk.pg}"></span>`;
    blk.paras.forEach((p,pi)=>{
      const drop = (bi===0&&pi===0) ? "dropcap":"";
      html += `<p class="${drop}">${escapeHtml(p)}</p>`;
    });
  });
  // end card → next chapter
  const idx=CHAPTERS.findIndex(c=>c.id===chap.id);
  const nx=CHAPTERS[idx+1];
  html += `<div class="endcard"><div class="e1">${T[lang].end_ch}</div>`;
  if(nx) html += `<button class="nx" onclick="openChapter('${nx.id}')">${T[lang].next_ch} · ${nx[lang][0]} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>`;
  html += `</div>`;
  const book=$("r-book");
  book.style.fontSize = (18+fontStep*1.5)+"px";
  book.innerHTML = html;
}
function escapeHtml(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function paginate(){
  const vp=$("r-viewport"), book=$("r-book");
  const cs=getComputedStyle(book);
  const padL=parseFloat(cs.paddingLeft), padR=parseFloat(cs.paddingRight);
  const gap=parseFloat(cs.columnGap)||48;
  const colW = vp.clientWidth - padL - padR;
  book.style.columnWidth = colW+"px";
  rStep = colW + gap;
  // total pages from scroll width
  rPages = Math.max(1, Math.round(vp.scrollWidth / rStep));
  rPage = Math.min(rPage, rPages-1);
  updatePageUI();
}
function gotoPage(i,smooth=true){
  rPage = Math.max(0, Math.min(rPages-1, i));
  $("r-viewport").scrollTo({left: rPage*rStep, behavior: smooth?"smooth":"auto"});
  updatePageUI();
}
function nextPage(){ userHold=Date.now(); if(rPage>=rPages-1) return; gotoPage(rPage+1); }
function prevPage(){ userHold=Date.now(); if(rPage<=0) return; gotoPage(rPage-1); }
function updatePageUI(){
  $("r-pageno").textContent = `${T[lang].page} ${rPage+1} ${T[lang].of} ${rPages}`;
  $("r-pagefill").style.width = (rPages>1 ? (rPage/(rPages-1))*100 : 100)+"%";
}
function setFont(d){
  fontStep = Math.max(-2, Math.min(4, fontStep+d));
  localStorage.setItem("ef-font", fontStep);
  if(chap){ const sl=$("r-viewport").scrollLeft; $("r-book").style.fontSize=(18+fontStep*1.5)+"px";
    requestAnimationFrame(()=>{ paginate(); gotoPage(rPage,false); }); }
}
// snap after manual swipe / momentum
let snapT;
$("r-viewport").addEventListener("scroll",()=>{
  clearTimeout(snapT);
  snapT=setTimeout(()=>{
    const p=Math.round($("r-viewport").scrollLeft/rStep);
    if(p!==rPage){ rPage=Math.max(0,Math.min(rPages-1,p)); updatePageUI(); }
    const target=rPage*rStep;
    if(Math.abs($("r-viewport").scrollLeft-target)>2) $("r-viewport").scrollTo({left:target,behavior:"smooth"});
  },90);
},{passive:true});
// keyboard
document.addEventListener("keydown",(e)=>{
  if(!$("reader").classList.contains("show")) return;
  if(e.key==="ArrowRight") nextPage();
  if(e.key==="ArrowLeft") prevPage();
  if(e.key==="Escape") closeReader();
});
window.addEventListener("resize",()=>{ if(chap){ paginate(); gotoPage(rPage,false); } });

/* ---------- AUDIO DOCK ---------- */
function toggleAudioDock(){
  if(!(chap.parts&&chap.parts.length)){ toast(T[lang].no_audio); return; }
  $("r-audio").classList.toggle("hidden");
}
function renderAudioDock(){
  const dock=$("r-audio"); const hasParts=!!(chap.parts&&chap.parts.length);
  $("audio-toggle").style.opacity = hasParts ? "1":".4";
  if(!hasParts){ dock.innerHTML=`<div class="ra-locked"><div class="t">${T[lang].no_audio}</div></div>`; return; }
  if(!hasAccess){
    dock.innerHTML=`<div class="ra-locked"><div class="t">${T[lang].locked_listen}</div>
      <a class="btn btn-gold" href="${STRIPE_LINK}" target="_blank" rel="noopener" style="max-width:240px;margin:0 auto"><span>${T[lang].buy_short}</span></a></div>`;
    return;
  }
  const multi=chap.parts.length>1;
  dock.innerHTML = `
    <div class="ra-row">
      <button class="ra-pp" onclick="togglePlay()"><svg id="ra-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
      <div class="ra-mid">
        <div class="ra-seek" id="ra-seek"><div class="f" id="ra-fill"></div></div>
        <div class="ra-meta"><span id="ra-cur">0:00</span><span id="ra-part"></span><span id="ra-dur">0:00</span></div>
      </div>
      <div class="ra-side">
        <button class="ra-spd" id="ra-spd" onclick="cycleSpeed()">1×</button>
        <button class="ra-follow ${followOn?'on':''}" id="ra-follow" onclick="toggleFollow()"><span class="dot"></span>${T[lang].follow}</button>
      </div>
    </div>
    ${multi?`<div class="ra-chips" id="ra-chips">${chap.parts.map((p,i)=>`<button class="ra-chip ${i===partIdx?'on':''}" onclick="goPart(${i})" title="p. ${p.pg}">${i+1}</button>`).join("")}</div>`:""}`;
  $("ra-seek").addEventListener("click",(e)=>{ if(!audio.duration)return; const r=e.currentTarget.getBoundingClientRect(); audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration; });
  if(audio.src) refreshAudioIcons();
}
function ensureLoaded(){
  if(!chap.parts) return false;
  const want = chap.parts[partIdx].src;
  if(!audio.src.endsWith(want)){ audio.src=want; audio.playbackRate=speed; }
  return true;
}
function togglePlay(){
  if(!(chap.parts&&hasAccess)) return;
  if(playing){ pause(); return; }
  ensureLoaded(); followOn=true; updateFollowBtn();
  audio.play().then(()=>{ playing=true; refreshAudioIcons(); }).catch(()=>{});
}
function pause(){ audio.pause(); playing=false; refreshAudioIcons(); }
function goPart(i){ partIdx=Math.max(0,Math.min(chap.parts.length-1,i)); audio.src=chap.parts[partIdx].src; audio.playbackRate=speed;
  highlightChips(); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); }
function cycleSpeed(){ speed=speeds[(speeds.indexOf(speed)+1)%speeds.length]; audio.playbackRate=speed; const b=$("ra-spd"); if(b)b.textContent=speed+"×"; }
function toggleFollow(){ followOn=!followOn; updateFollowBtn(); }
function updateFollowBtn(){ const b=$("ra-follow"); if(b) b.classList.toggle("on",followOn); }
function refreshAudioIcons(){
  const ic=$("ra-icon"); if(ic) ic.innerHTML = playing?'<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>';
  const part=$("ra-part"); if(part&&chap.parts){ const p=chap.parts[partIdx];
    part.textContent = (chap.parts.length>1?`${T[lang].part} ${partIdx+1}/${chap.parts.length} · `:"")+`p. ${p.pg}`; }
}
function highlightChips(){ document.querySelectorAll("#ra-chips .ra-chip").forEach((c,i)=>c.classList.toggle("on",i===partIdx)); refreshAudioIcons(); }

audio.addEventListener("timeupdate",()=>{
  if(!chap||!chap.parts) return;
  const pct=audio.duration?(audio.currentTime/audio.duration*100):0;
  const f=$("ra-fill"); if(f) f.style.width=pct+"%";
  const cur=$("ra-cur"), dur=$("ra-dur");
  if(cur) cur.textContent=fmt(audio.currentTime); if(dur) dur.textContent=fmt(audio.duration);
  // read-along page follow
  if(followOn && $("reader").classList.contains("show") && Date.now()-userHold>5000 && audio.duration){
    const p=chap.parts[partIdx]; const span=p.pe-p.ps+1;
    const target=Math.min(p.pe, p.ps+Math.floor((audio.currentTime/audio.duration)*span));
    const mark=document.querySelector(`#r-book .pgmark[data-pg="${target}"]`);
    if(mark){ const pg=pageOfEl(mark); if(pg>rPage) gotoPage(pg); }
  }
});
audio.addEventListener("ended",()=>{
  if(chap.parts && partIdx<chap.parts.length-1){ partIdx++; audio.src=chap.parts[partIdx].src; audio.playbackRate=speed; highlightChips(); audio.play().then(()=>{playing=true;refreshAudioIcons();}).catch(()=>{}); return; }
  playing=false; refreshAudioIcons();
});
function pageOfEl(el){
  const vr=$("r-viewport").getBoundingClientRect(); const r=el.getBoundingClientRect();
  const absX = r.left - vr.left + $("r-viewport").scrollLeft;
  return Math.max(0, Math.round(absX/rStep));
}
function fmt(s){ s=Math.floor(s||0); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }

/* drag-to-flip (touch) */
(function(){
  const vp=$("r-viewport"); let x0=null,scroll0=0;
  vp.addEventListener("touchstart",(e)=>{ x0=e.touches[0].clientX; scroll0=vp.scrollLeft; userHold=Date.now(); },{passive:true});
  vp.addEventListener("touchend",()=>{ x0=null; },{passive:true});
})();

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
  box.innerHTML = data.map((d,i)=>`<div class="step"><div class="sn">${i+1}</div><div class="sc"><b>${d[0]}${d[1]}</b><span>${d[2]}</span></div></div>`).join("");
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
applyLang(); initAccess(); renderLibrary(); renderInstallSteps();
