/* ============================================================
   Bâtir un Empire Familial — PWA
   ============================================================ */
const STRIPE_LINK = "https://buy.stripe.com/14A7sK3MYcNKbNTahR3gk0b";
const BOOK_PDF = "livre-batir-un-empire-familial.pdf";

/* ---------- CHAPTERS (audio mapped: intro + ch1) ---------- */
const CHAPTERS = [
  { id:"preface", n:"◆", sec:"open", fr:["Préface","Par l'Apôtre Roland Dalo"], en:["Preface","By Apostle Roland Dalo"], min:3 },
  { id:"intro", n:"◆", sec:"open", fr:["Introduction","L'histoire d'Élias de Likasi"], en:["Introduction","The story of Élias of Likasi"], min:6 },
  { id:"ch1", n:"1", sec:"truths", fr:["Chapitre 1","Le mariage, première pierre de l'empire familial"], en:["Chapter 1","Marriage, the first stone of the family empire"], min:17,
    parts:[
      {src:"audio/ch1-1.mp3", pg:"17–20", sec:198},
      {src:"audio/ch1-2.mp3", pg:"20–24", sec:276},
      {src:"audio/ch1-3.mp3", pg:"24–27", sec:202},
      {src:"audio/ch1-4.mp3", pg:"27–29", sec:147},
      {src:"audio/ch1-5.mp3", pg:"29–32", sec:181},
    ]},
  { id:"ch2", n:"2", sec:"truths", fr:["Chapitre 2","Les parents, architectes de la réussite familiale"], en:["Chapter 2","Parents, architects of family success"], min:32, partial:true,
    parts:[
      {src:"audio/ch2-1.mp3", pg:"33–36", sec:172},
    ]},
  { id:"ch3", n:"3", sec:"truths", fr:["Chapitre 3","Les enfants, bâtisseurs et non héritiers passifs"], en:["Chapter 3","Children, builders not passive heirs"], min:28 },
  { id:"ch4", n:"4", sec:"truths", fr:["Chapitre 4","La spiritualité, fondation invisible de l'empire"], en:["Chapter 4","Spirituality, the invisible foundation"], min:36 },
  { id:"ch5", n:"5", sec:"battles", fr:["Chapitre 5","La bataille contre les forces spirituelles"], en:["Chapter 5","The battle against spiritual forces"], min:43 },
  { id:"ch6", n:"6", sec:"battles", fr:["Chapitre 6","La bataille contre les querelles d'héritage"], en:["Chapter 6","The battle against inheritance disputes"], min:32 },
  { id:"ch7", n:"7", sec:"battles", fr:["Chapitre 7","La bataille contre l'appauvrissement"], en:["Chapter 7","The battle against impoverishment"], min:32 },
  { id:"ch8", n:"8", sec:"battles", fr:["Chapitre 8","La bataille contre les péchés et l'immoralité"], en:["Chapter 8","The battle against sin and immorality"], min:36 },
  { id:"ch9", n:"9", sec:"riches", fr:["Chapitre 9","Les hommes — chaque membre de la famille"], en:["Chapter 9","People — every family member"], min:25 },
  { id:"ch10", n:"10", sec:"riches", fr:["Chapitre 10","Les terres et les biens immobiliers"], en:["Chapter 10","Land and real estate"], min:28 },
  { id:"ch11", n:"11", sec:"riches", fr:["Chapitre 11","Les entreprises familiales et œuvres d'esprit"], en:["Chapter 11","Family businesses and works of the mind"], min:28 },
  { id:"ch12", n:"12", sec:"riches", fr:["Chapitre 12","Les savoir-faire, les valeurs et l'histoire"], en:["Chapter 12","Know-how, values and history"], min:28 },
  { id:"conclusion", n:"◆", sec:"close", fr:["Conclusion","Bâtir votre empire commence aujourd'hui"], en:["Conclusion","Building your empire starts today"], min:9 },
];

const SECTIONS = {
  open:   { fr:"Ouverture", en:"Opening" },
  truths: { fr:"4 Vérités à savoir", en:"4 Truths to Know" },
  battles:{ fr:"4 Batailles à remporter", en:"4 Battles to Win" },
  riches: { fr:"4 Richesses à valoriser", en:"4 Treasures to Cultivate" },
  close:  { fr:"Clôture", en:"Closing" },
};

const TESTIS = [
  { src:"media/testi-rachel.mp4", poster:"media/testi-rachel.jpg", name:"Mamie-Rachel Sumbela" },
  { src:"media/testi-lombo.mp4", poster:"media/testi-lombo.jpg", name:"Lord Lombo" },
  { src:"media/testi-james.mp4", poster:"media/testi-james.jpg", name:"James Madi" },
];

/* ---------- i18n ---------- */
const T = {
  fr:{
    nav_home:"Accueil", nav_chap:"Chapitres", kicker:"Livre Audio · Tome 1",
    hsub:"Version audio — Tome 1", st_chap:"Chapitres", st_listen:"D'écoute", st_pages:"Pages",
    teaser_tag:"Bande-annonce", cta_buy:"Acheter le livre audio", cta_have:"J'ai déjà acheté — Accéder",
    cta_access:"Accéder à mes chapitres", cta_read:"Lire le livre",
    hero_quote:"« Un empire familial ne se bâtit pas en un jour. Il se construit pierre après pierre, génération après génération. »",
    pill_eyebrow:"Ce que vous allez bâtir", pill_title:"Quatre fondations",
    p1t:"Les vérités", p1d:"4 vérités qui fondent tout empire familial.",
    p2t:"Les batailles", p2d:"4 combats à remporter pour durer.",
    p3t:"Les richesses", p3d:"4 trésors familiaux à valoriser.",
    p4t:"La fondation", p4d:"La spiritualité, socle invisible de tout.",
    chap_eyebrow:"Le sommaire", chap_title:"Les 15 chapitres",
    auth_eyebrow:"L'auteur", auth_role:"Serviteur · Formateur · Bâtisseur",
    auth_bio:"Pasteur Principal de l'Église Pierre Vivante (PIVA-CEM), Président de Vis'A Internationale et initiateur de « L'École de Vie ». Passionné de formation, de leadership et de mission. Marié à Mamie-Rachel Sumbela, père de trois enfants.",
    testi_eyebrow:"Témoignages", testi_title:"Ils en parlent",
    fam_quote:"« Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »",
    fmt_eyebrow:"Disponible aussi", fmt_title:"En tous formats",
    fmt1t:"Livre audio", fmt1d:"Narration intégrale, ce livre audio.",
    fmt2t:"Livre papier", fmt2d:"Édition imprimée, 236 pages.",
    fmt3t:"Kindle", fmt3d:"Version numérique sur Amazon.",
    install_app:"Installer l'application", minimize:"Réduire", close:"Fermer",
    acc_title:"Accéder au livre audio", acc_text:"Procurez-vous le livre audio pour écouter tous les chapitres et lire le livre intégral.",
    acc_buy:"Acheter maintenant", acc_already:"Déjà acheté ?", acc_unlock:"Déverrouiller",
    ins_title:"Installer l'application", ins_text:"Ajoutez Empire Familial à votre écran d'accueil pour une expérience plein écran, hors-ligne, comme une vraie app.",
    ins_now:"Installer maintenant", reader_title:"Le livre — Tome 1",
    soon:"Narration bientôt disponible", locked_play:"Déverrouillez pour écouter ce chapitre.",
    granted:"Accès déverrouillé ✓", need_code:"Entrez un code d'accès valide.",
    free:"Extrait", available:"Audio disponible",
    part:"Partie", parts:"parties", inprogress:"en cours", pages:"pages",
    ios1b:"Ouvrez ce site dans Safari", ios1s:"L'installation ne fonctionne que depuis Safari sur iPhone/iPad.",
    ios2b:"Touchez Partager", ios2s:"Le bouton carré avec une flèche, en bas de l'écran.",
    ios3b:"« Sur l'écran d'accueil »", ios3s:"Faites défiler et choisissez « Ajouter à l'écran d'accueil ».",
    ios4b:"Touchez « Ajouter »", ios4s:"L'icône Empire Familial apparaît sur votre écran d'accueil.",
    and1b:"Menu du navigateur", and1s:"Touchez les trois points ⋮ en haut à droite dans Chrome.",
    and2b:"« Installer l'application »", and2s:"Ou « Ajouter à l'écran d'accueil ».",
    and3b:"Confirmez", and3s:"L'app s'installe et s'ouvre en plein écran.",
  },
  en:{
    nav_home:"Home", nav_chap:"Chapters", kicker:"Audiobook · Volume 1",
    hsub:"Audio edition — Volume 1", st_chap:"Chapters", st_listen:"Listening", st_pages:"Pages",
    teaser_tag:"Trailer", cta_buy:"Buy the audiobook", cta_have:"Already purchased — Access",
    cta_access:"Open my chapters", cta_read:"Read the book",
    hero_quote:"“A family empire is not built in a day. It is built stone by stone, generation after generation.”",
    pill_eyebrow:"What you will build", pill_title:"Four foundations",
    p1t:"The truths", p1d:"4 truths that ground every family empire.",
    p2t:"The battles", p2d:"4 battles to win in order to last.",
    p3t:"The treasures", p3d:"4 family treasures to cultivate.",
    p4t:"The foundation", p4d:"Spirituality, the invisible bedrock of it all.",
    chap_eyebrow:"Contents", chap_title:"The 15 chapters",
    auth_eyebrow:"The author", auth_role:"Servant · Trainer · Builder",
    auth_bio:"Senior Pastor of the Pierre Vivante Church (PIVA-CEM), President of Vis'A International and founder of “L'École de Vie”. Passionate about training, leadership and mission. Married to Mamie-Rachel Sumbela, father of three.",
    testi_eyebrow:"Testimonials", testi_title:"What people say",
    fam_quote:"“You are the light of the world. A city set on a hill cannot be hidden.”",
    fmt_eyebrow:"Also available", fmt_title:"In every format",
    fmt1t:"Audiobook", fmt1d:"Full narration — this audiobook.",
    fmt2t:"Paperback", fmt2d:"Printed edition, 236 pages.",
    fmt3t:"Kindle", fmt3d:"Digital edition on Amazon.",
    install_app:"Install the app", minimize:"Minimize", close:"Close",
    acc_title:"Access the audiobook", acc_text:"Get the audiobook to listen to every chapter and read the full book.",
    acc_buy:"Buy now", acc_already:"Already purchased?", acc_unlock:"Unlock",
    ins_title:"Install the app", ins_text:"Add Empire Familial to your home screen for a full-screen, offline, app-like experience.",
    ins_now:"Install now", reader_title:"The book — Volume 1",
    soon:"Narration coming soon", locked_play:"Unlock to listen to this chapter.",
    granted:"Access unlocked ✓", need_code:"Enter a valid access code.",
    free:"Sample", available:"Audio available",
    part:"Part", parts:"parts", inprogress:"in progress", pages:"pages",
    ios1b:"Open this site in Safari", ios1s:"Installing only works from Safari on iPhone/iPad.",
    ios2b:"Tap Share", ios2s:"The square icon with an arrow, at the bottom of the screen.",
    ios3b:"“Add to Home Screen”", ios3s:"Scroll and choose “Add to Home Screen”.",
    ios4b:"Tap “Add”", ios4s:"The Empire Familial icon appears on your home screen.",
    and1b:"Browser menu", and1s:"Tap the three dots ⋮ at the top right in Chrome.",
    and2b:"“Install app”", and2s:"Or “Add to Home screen”.",
    and3b:"Confirm", and3s:"The app installs and opens full-screen.",
  }
};

/* ---------- STATE ---------- */
let lang = localStorage.getItem("ef-lang") || "fr";
let hasAccess = false;
let current = null;            // current chapter object
let partIdx = 0;               // current part within chapter
let playing = false;
let speed = 1;
const speeds = [1, 1.25, 1.5, 1.75, 2, 0.75];
let curOS = "ios";
let deferredPrompt = null;
const audio = document.getElementById("audio");

/* ---------- ACCESS (gate + ?preview=1 dev bypass) ---------- */
function initAccess(){
  const url = new URLSearchParams(location.search);
  if (url.get("preview") === "1" || location.hash === "#preview"){
    hasAccess = true;
    sessionStorage.setItem("ef-preview","1");
    document.getElementById("preview-pill").style.display = "block";
  }
  if (sessionStorage.getItem("ef-preview") === "1"){
    hasAccess = true;
    document.getElementById("preview-pill").style.display = "block";
  }
  if (localStorage.getItem("ef-access") === "granted") hasAccess = true;
  refreshAccessUI();
}
function grant(){ hasAccess = true; localStorage.setItem("ef-access","granted"); refreshAccessUI(); toast(T[lang].granted); }
function refreshAccessUI(){
  const lbl = document.getElementById("access-cta-label");
  const ico = document.getElementById("access-ico");
  if (hasAccess){
    lbl.textContent = T[lang].cta_access;
    ico.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/>'; // open lock
  } else {
    lbl.textContent = T[lang].cta_have;
    ico.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>';
  }
  renderChapters();
}
function onAccessCTA(){ if (hasAccess) scrollTo2("chapters"); else openOverlay("ov-access"); }
function submitCode(){
  const v = document.getElementById("acc-code").value.trim();
  if (v.length > 0){ grant(); closeOverlay("ov-access"); scrollTo2("chapters"); }
  else toast(T[lang].need_code);
}

/* ---------- i18n apply ---------- */
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el=>{
    const k = el.getAttribute("data-i");
    if (T[lang][k] != null) el.textContent = T[lang][k];
  });
  document.getElementById("lang-label").textContent = lang === "fr" ? "EN" : "FR";
  [ "cta-buy","cta-buy-2","acc-buy" ].forEach(id=>{ const a=document.getElementById(id); if(a) a.href = STRIPE_LINK; });
  refreshAccessUI();
  renderTesti();
  renderInstallSteps();
}
function toggleLang(){ lang = lang === "fr" ? "en" : "fr"; localStorage.setItem("ef-lang", lang); applyLang(); }

/* ---------- CHAPTERS RENDER ---------- */
let openSec = "open";
function renderChapters(){
  const tree = document.getElementById("chapter-tree");
  const order = ["open","truths","battles","riches","close"];
  tree.innerHTML = order.map(sec=>{
    const items = CHAPTERS.filter(c=>c.sec===sec);
    const isOpen = openSec===sec;
    const rows = items.map(c=>{
      const [label,sub] = c[lang];
      const hasParts = !!(c.parts && c.parts.length);
      const unlocked = hasAccess;
      const isCur = current && current.id===c.id;
      const partsTxt = hasParts ? `${c.parts.length} ${T[lang].parts}${c.partial?` · ${T[lang].inprogress}`:""}` : "";
      return `<div class="row">
        <div class="num">${c.n}</div>
        <div class="info">
          <div class="rl">${label}</div>
          <div class="rs">${sub}</div>
          ${hasParts?`<div class="tag-audio"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/></svg>${T[lang].available} · ${partsTxt}</div>`:""}
        </div>
        <div class="meta">
          <div class="dur">${c.min} min</div>
          ${(!unlocked)?`<svg class="lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`:""}
        </div>
        <button class="pbtn ${isCur&&playing?'on':''}" onclick="onRowPlay('${c.id}')">
          ${isCur&&playing
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'}
        </button>
      </div>`;
    }).join("");
    return `<div class="secgroup">
      <div class="sechead ${isOpen?'open':''}" onclick="toggleSec('${sec}')">
        <span class="st">${SECTIONS[sec][lang]}</span>
        <span style="display:flex;align-items:center;gap:8px"><span class="ct">${items.length}</span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>
      </div>
      <div class="seclist" style="${isOpen?'max-height:1200px':''}">${rows}</div>
    </div>`;
  }).join("");
}
function toggleSec(sec){ openSec = openSec===sec?null:sec; renderChapters(); }

/* ---------- PLAYER ---------- */
function onRowPlay(id){
  const c = CHAPTERS.find(x=>x.id===id);
  if (!(c.parts && c.parts.length)){ toast(T[lang].soon); return; }
  if (!hasAccess){ openOverlay("ov-access"); return; }
  if (current && current.id===id){ togglePlay(); return; }
  loadChapter(c, true, 0);
}
function loadChapter(c, autoplay, idx){
  current = c; partIdx = idx || 0;
  loadPart(autoplay);
  showPlayer();
  renderChapters();
}
function loadPart(autoplay){
  const c = current, p = c.parts[partIdx], multi = c.parts.length > 1;
  audio.src = p.src; audio.playbackRate = speed;
  const [label,sub] = c[lang];
  document.getElementById("mini-title").textContent = label;
  document.getElementById("mini-sub").textContent = multi ? `${sub} — ${T[lang].part} ${partIdx+1}/${c.parts.length}` : sub;
  document.getElementById("full-title").textContent = label;
  document.getElementById("full-sub").textContent = sub;
  document.getElementById("player-note").textContent =
    (multi ? `${T[lang].part} ${partIdx+1}/${c.parts.length} · ` : "") + `${T[lang].pages} ${p.pg}`;
  renderPartsStrip();
  if (autoplay) play();
}
function renderPartsStrip(){
  const el = document.getElementById("parts-strip");
  if (!current || current.parts.length < 2){ el.innerHTML = ""; el.style.display = "none"; return; }
  el.style.display = "flex";
  el.innerHTML = current.parts.map((p,i)=>`<button class="chip ${i===partIdx?'on':''}" onclick="goPart(${i})" title="${T[lang].pages} ${p.pg}">${i+1}</button>`).join("");
}
function goPart(i){ if(!current) return; partIdx = Math.max(0, Math.min(current.parts.length-1, i)); loadPart(true); }
function showPlayer(){ const p=document.getElementById("player"); if(!p.classList.contains("full")) p.classList.add("mini"); }
function expandPlayer(){ const p=document.getElementById("player"); p.classList.remove("mini"); p.classList.add("full"); }
function collapsePlayer(){ const p=document.getElementById("player"); p.classList.remove("full"); p.classList.add("mini"); }
function closePlayer(){ pause(); current=null; const p=document.getElementById("player"); p.classList.remove("full","mini"); renderChapters(); }
function play(){ audio.play().then(()=>{ playing=true; setPlayIcons(); }).catch(()=>{}); }
function pause(){ audio.pause(); playing=false; setPlayIcons(); }
function togglePlay(){ if(!current) return; playing?pause():play(); }
function skip(s){ if(!current) return; audio.currentTime = Math.max(0, Math.min(audio.duration||0, audio.currentTime+s)); }
function cycleSpeed(){ const i=(speeds.indexOf(speed)+1)%speeds.length; speed=speeds[i]; audio.playbackRate=speed; document.getElementById("spd").textContent=speed+"×"; }
function setPlayIcons(){
  const playP='<path d="M8 5v14l11-7z"/>', pauseP='<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
  document.getElementById("mini-icon").innerHTML = playing?pauseP:playP;
  document.getElementById("big-icon").innerHTML = playing?pauseP:playP;
  document.getElementById("player").classList.toggle("paused", !playing);
  renderChapters();
}
function fmtTime(s){ s=Math.floor(s||0); const m=Math.floor(s/60); return m+":"+String(s%60).padStart(2,"0"); }
audio.addEventListener("timeupdate", ()=>{
  const pct = audio.duration ? (audio.currentTime/audio.duration*100) : 0;
  document.getElementById("seek-fill").style.width = pct+"%";
  document.getElementById("t-cur").textContent = fmtTime(audio.currentTime);
  document.getElementById("t-dur").textContent = fmtTime(audio.duration);
});
audio.addEventListener("ended", ()=>{
  if (current && partIdx < current.parts.length-1){ partIdx++; loadPart(true); return; }
  playing=false; setPlayIcons();
  const i=CHAPTERS.findIndex(c=>c.id===current?.id);
  const nx=CHAPTERS.slice(i+1).find(c=>c.parts && c.parts.length);
  if(nx && hasAccess) loadChapter(nx,true,0);
});
document.getElementById("seek").addEventListener("click",(e)=>{
  if(!audio.duration) return; const r=e.currentTarget.getBoundingClientRect();
  audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;
});

/* ---------- TESTIMONIALS ---------- */
function renderTesti(){
  const wrap=document.getElementById("testi");
  wrap.innerHTML = TESTIS.map((t,i)=>`<div class="tcard" id="tc${i}" onclick="playTesti(${i})">
    <video id="tv${i}" src="${t.src}" poster="${t.poster}" playsinline preload="none" loop></video>
    <div class="play-ov"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.4)"/><path d="M9 7.5v9l7-4.5z" fill="#fff"/></svg></div>
    <div class="name">${t.name}</div></div>`).join("");
}
function playTesti(i){
  TESTIS.forEach((_,j)=>{ const v=document.getElementById("tv"+j); const c=document.getElementById("tc"+j);
    if(j===i){ if(v.paused){ v.play(); c.classList.add("playing"); } else { v.pause(); c.classList.remove("playing"); } }
    else { v.pause(); c.classList.remove("playing"); } });
}

/* ---------- READER (strictly the book PDF) ---------- */
function openReader(){
  if(!hasAccess){ openOverlay("ov-access"); return; }
  document.getElementById("reader-frame").src = BOOK_PDF + "#view=FitH";
  document.getElementById("reader").classList.add("show");
}
function closeReader(){ const r=document.getElementById("reader"); r.classList.remove("show"); document.getElementById("reader-frame").src=""; }
function downloadBook(){ const a=document.createElement("a"); a.href=BOOK_PDF; a.download=BOOK_PDF; a.click(); }

/* ---------- INSTALL ---------- */
function openInstall(){ openOverlay("ov-install"); }
function setOS(os){ curOS=os; document.getElementById("os-ios").classList.toggle("on",os==="ios"); document.getElementById("os-and").classList.toggle("on",os==="and"); renderInstallSteps(); }
function renderInstallSteps(){
  const t=T[lang]; const box=document.getElementById("install-steps");
  const share='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"/></svg>';
  const plus='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 9v6M9 12h6"/></svg>';
  const dots='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
  const ok='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
  const data = curOS==="ios"
    ? [["",t.ios1b,t.ios1s],[share,t.ios2b,t.ios2s],[plus,t.ios3b,t.ios3s],[ok,t.ios4b,t.ios4s]]
    : [[dots,t.and1b,t.and1s],[plus,t.and2b,t.and2s],[ok,t.and3b,t.and3s]];
  box.innerHTML = data.map((d,i)=>`<div class="step"><div class="sn">${i+1}</div><div class="sc"><b>${d[0]}${d[1]}</b><span>${d[2]}</span></div></div>`).join("");
}
window.addEventListener("beforeinstallprompt",(e)=>{ e.preventDefault(); deferredPrompt=e; const b=document.getElementById("install-now"); if(b) b.style.display="flex"; });
function triggerInstall(){ if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.finally(()=>{ deferredPrompt=null; document.getElementById("install-now").style.display="none"; }); } }

/* ---------- OVERLAYS / NAV ---------- */
function openOverlay(id){ document.getElementById(id).classList.add("show"); }
function closeOverlay(id){ document.getElementById(id).classList.remove("show"); }
function goHome(){ window.scrollTo({top:0,behavior:"smooth"}); }
function scrollTo2(id){ document.getElementById(id).scrollIntoView({behavior:"smooth"}); }
function toast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2200); }

/* nav active state on scroll */
const chSection = ()=>document.getElementById("chapters");
window.addEventListener("scroll",()=>{
  const y=window.scrollY+120; const ch=chSection().offsetTop;
  document.getElementById("nav-home").classList.toggle("active", y<ch);
  document.getElementById("nav-chap").classList.toggle("active", y>=ch);
  // scroll progress + to-top
  const doc=document.documentElement;
  const max=(doc.scrollHeight-doc.clientHeight)||1;
  const pct=Math.min(100,Math.max(0,(window.scrollY/max)*100));
  document.getElementById("scroll-bar").style.width=pct+"%";
  document.getElementById("to-top").classList.toggle("show", window.scrollY>520);
},{passive:true});

/* reveal on scroll */
const io=new IntersectionObserver((ents)=>{ ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }); },{threshold:.15});
function initReveal(){ document.querySelectorAll(".reveal").forEach(el=>io.observe(el)); }

/* ---------- SW ---------- */
if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{})); }

/* ---------- BOOT ---------- */
applyLang();
initAccess();
renderTesti();
renderInstallSteps();
initReveal();
