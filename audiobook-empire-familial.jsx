import { useState, useEffect, useRef, useCallback } from "react";

const STRIPE_LINK = "https://buy.stripe.com/14A7sK3MYcNKbNTahR3gk0b";

const CHAPTERS = [
  { id: "preface", label: "Préface", subtitle: "Par l'Apôtre Roland Dalo", duration: 3, section: "Ouverture" },
  { id: "intro", label: "Introduction", subtitle: "L'histoire d'Élias de Likasi", duration: 10, section: "Ouverture" },
  { id: "ch1", label: "Chapitre 1", subtitle: "Le mariage est la première pierre d'un empire familial", duration: 28, section: "4 Vérités à savoir" },
  { id: "ch2", label: "Chapitre 2", subtitle: "Les parents sont les architectes de la réussite familiale", duration: 32, section: "4 Vérités à savoir" },
  { id: "ch3", label: "Chapitre 3", subtitle: "Les enfants sont des bâtisseurs et non des héritiers passifs", duration: 28, section: "4 Vérités à savoir" },
  { id: "ch4", label: "Chapitre 4", subtitle: "La spiritualité, une fondation invisible de tout empire familial", duration: 36, section: "4 Vérités à savoir" },
  { id: "ch5", label: "Chapitre 5", subtitle: "La bataille contre les forces spirituelles", duration: 43, section: "4 Batailles à remporter" },
  { id: "ch6", label: "Chapitre 6", subtitle: "La bataille contre les querelles liées à l'héritage", duration: 32, section: "4 Batailles à remporter" },
  { id: "ch7", label: "Chapitre 7", subtitle: "La bataille contre l'appauvrissement", duration: 32, section: "4 Batailles à remporter" },
  { id: "ch8", label: "Chapitre 8", subtitle: "La bataille contre les péchés ou l'immoralité", duration: 36, section: "4 Batailles à remporter" },
  { id: "ch9", label: "Chapitre 9", subtitle: "Les hommes ou chaque membre de la famille", duration: 25, section: "4 Richesses à valoriser" },
  { id: "ch10", label: "Chapitre 10", subtitle: "Les terres et les biens immobiliers", duration: 28, section: "4 Richesses à valoriser" },
  { id: "ch11", label: "Chapitre 11", subtitle: "Les entreprises familiales et les œuvres d'esprit", duration: 28, section: "4 Richesses à valoriser" },
  { id: "ch12", label: "Chapitre 12", subtitle: "Les savoir-faire, les valeurs et l'histoire", duration: 28, section: "4 Richesses à valoriser" },
  { id: "conclusion", label: "Conclusion", subtitle: "Bâtir votre empire commence aujourd'hui", duration: 9, section: "Clôture" },
];

const TOTAL_DURATION = CHAPTERS.reduce((a, c) => a + c.duration, 0);

const KongoSVG = () => (
  <svg width="160" height="16" viewBox="0 0 160 16" style={{ display: "block", margin: "0 auto" }}>
    <line x1="0" y1="8" x2="160" y2="8" stroke="#C4953A" strokeWidth="1" />
    {[20, 48, 80, 112, 140].map((x, i) => (
      <polygon key={i} points={`${x},8 ${x + 8},2 ${x + 16},8 ${x + 8},14`} fill="#C4953A" />
    ))}
  </svg>
);

const PlayIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function AudiobookApp() {
  const [view, setView] = useState("home");
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("listen");
  const [progress, setProgress] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [audioUrls, setAudioUrls] = useState({});
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  // Check stored access
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const result = await window.storage.get("audiobook-access");
        if (result && result.value === "granted") setHasAccess(true);
      } catch (e) { /* no stored access */ }
      try {
        const urls = await window.storage.get("audio-urls");
        if (urls) setAudioUrls(JSON.parse(urls.value));
      } catch (e) { /* no stored urls */ }
    };
    checkAccess();
  }, []);

  const grantAccess = async () => {
    setHasAccess(true);
    try { await window.storage.set("audiobook-access", "granted"); } catch (e) {}
  };

  const handlePlay = useCallback((chapter) => {
    if (!hasAccess) {
      setShowAccessModal(true);
      return;
    }
    if (currentChapter?.id === chapter.id && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
      return;
    }
    setCurrentChapter(chapter);
    setIsPlaying(true);
    setProgress(0);
    setView("player");
  }, [hasAccess, currentChapter, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setIsPlaying(false); return 100; }
          return p + (100 / (currentChapter?.duration * 60));
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, currentChapter]);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}min` : `${m} min`;
  };

  const sections = [...new Set(CHAPTERS.map(c => c.section))];

  // STYLES
  const s = {
    app: { fontFamily: "'Lora', 'Georgia', serif", background: "#FAF6F0", minHeight: "100vh", color: "#1A1A1A", maxWidth: 480, margin: "0 auto", position: "relative" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #E8E2D8", background: "#FAF6F0", position: "sticky", top: 0, zIndex: 100 },
    navBrand: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#2C1810", textTransform: "uppercase" },
    navLink: (active) => ({ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "#C4953A" : "#6B6B6B", background: "none", border: "none", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", padding: "4px 8px" }),
    hero: { padding: "40px 24px", textAlign: "center" },
    heroTitle: { fontFamily: "'Playfair Display', 'Georgia', serif", fontSize: 32, fontWeight: 700, color: "#2C1810", lineHeight: 1.15, marginBottom: 4 },
    heroSub: { fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: 16, fontStyle: "italic", color: "#8B6914", marginBottom: 8 },
    heroAuthor: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: 2, color: "#6B6B6B", textTransform: "uppercase", marginBottom: 20 },
    badge: { display: "inline-flex", alignItems: "center", gap: 6, background: "#2C1810", color: "#C4953A", padding: "8px 18px", borderRadius: 24, fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 24 },
    statsRow: { display: "flex", justifyContent: "center", gap: 24, marginBottom: 28 },
    stat: { textAlign: "center" },
    statNum: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#C4953A" },
    statLabel: { fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 },
    ctaBtn: { display: "block", width: "100%", padding: "16px 24px", background: "#C4953A", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", textDecoration: "none", textAlign: "center", marginBottom: 10, transition: "all 0.2s" },
    ctaSecondary: { display: "block", width: "100%", padding: "14px 24px", background: "transparent", color: "#C4953A", border: "2px solid #C4953A", borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", textAlign: "center", marginBottom: 8 },
    sectionGroup: { margin: "0 16px 8px" },
    sectionHeader: (open) => ({ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: open ? "#2C1810" : "#F0EBE3", borderRadius: open ? "8px 8px 0 0" : 8, cursor: "pointer", marginBottom: open ? 0 : 8, transition: "all 0.2s" }),
    sectionTitle: (open) => ({ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: open ? "#C4953A" : "#2C1810", textTransform: "uppercase" }),
    chapterItem: (active) => ({ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: active ? "#FFF5E0" : "#fff", borderBottom: "1px solid #F0EBE3", cursor: "pointer", transition: "all 0.15s" }),
    chapterNum: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#C4953A", minWidth: 32, textAlign: "center" },
    chapterInfo: { flex: 1 },
    chapterLabel: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, color: "#2C1810", marginBottom: 2 },
    chapterSub: { fontFamily: "'Lora', serif", fontSize: 12, color: "#6B6B6B", lineHeight: 1.3 },
    chapterDuration: { fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#C4953A", fontWeight: 500 },
    playBtn: (active) => ({ width: 36, height: 36, borderRadius: "50%", background: active ? "#C4953A" : "#F0EBE3", color: active ? "#fff" : "#2C1810", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }),
    // Player view
    playerWrap: { padding: "24px 20px" },
    playerBack: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#6B6B6B", background: "none", border: "none", cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 },
    playerTitle: { fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#2C1810", marginBottom: 4 },
    playerSub: { fontFamily: "'Lora', serif", fontSize: 14, color: "#6B6B6B", marginBottom: 24, fontStyle: "italic" },
    playerControls: { background: "#2C1810", borderRadius: 16, padding: "24px 20px", marginBottom: 24 },
    progressBar: { width: "100%", height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, marginBottom: 12, cursor: "pointer" },
    progressFill: (pct) => ({ width: `${pct}%`, height: "100%", background: "#C4953A", borderRadius: 2, transition: "width 0.3s" }),
    timeRow: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
    timeText: { fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)" },
    controlRow: { display: "flex", justifyContent: "center", alignItems: "center", gap: 24 },
    bigPlayBtn: { width: 56, height: 56, borderRadius: "50%", background: "#C4953A", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    skipBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 10 },
    modeToggle: { display: "flex", background: "#F0EBE3", borderRadius: 8, padding: 3, marginBottom: 20 },
    modeBtn: (active) => ({ flex: 1, padding: "10px 16px", borderRadius: 6, border: "none", background: active ? "#fff" : "transparent", color: active ? "#2C1810" : "#6B6B6B", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: active ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }),
    readText: { fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.85, color: "#333", padding: "20px 0" },
    audioPlaceholder: { background: "#F0EBE3", border: "2px dashed #C4953A", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 20 },
    audioPlaceholderText: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#8B6914", fontStyle: "italic" },
    // Modal
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(44,24,16,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
    modal: { background: "#FAF6F0", borderRadius: 16, padding: "32px 24px", maxWidth: 380, width: "100%", textAlign: "center" },
    modalTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2C1810", marginBottom: 8 },
    modalText: { fontFamily: "'Lora', serif", fontSize: 13, color: "#6B6B6B", lineHeight: 1.6, marginBottom: 20 },
    input: { width: "100%", padding: "12px 16px", border: "1px solid #E8E2D8", borderRadius: 8, fontFamily: "'Lora', serif", fontSize: 14, color: "#2C1810", background: "#fff", marginBottom: 12, boxSizing: "border-box", outline: "none" },
    // Footer
    footer: { padding: "32px 20px", textAlign: "center", borderTop: "1px solid #E8E2D8", marginTop: 40 },
    footerText: { fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#6B6B6B", letterSpacing: 1, lineHeight: 1.8 },
    // Sticky player
    stickyPlayer: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#2C1810", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 200, maxWidth: 480, margin: "0 auto" },
    stickyInfo: { flex: 1 },
    stickyLabel: { fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#C4953A", fontWeight: 600 },
    stickySub: { fontFamily: "'Lora', serif", fontSize: 11, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  };

  // HOME VIEW
  const HomeView = () => (
    <div>
      {/* Hero */}
      <div style={s.hero}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ width: 140, height: 200, margin: "0 auto", background: "linear-gradient(135deg, #4a4a5a, #5a5a6a)", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, boxSizing: "border-box" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#E8C170", textAlign: "center", lineHeight: 1.2, marginBottom: 4 }}>BÂTIR</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 10, color: "#E8C170", marginBottom: 0 }}>UN</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: "#E8C170", letterSpacing: 1, marginBottom: 2 }}>EMPIRE</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#E8C170", marginBottom: 8 }}>FAMILIAL</div>
            <div style={{ background: "#E8C170", color: "#4a4a5a", fontFamily: "'Montserrat', sans-serif", fontSize: 7, fontWeight: 700, padding: "2px 8px", borderRadius: 3, letterSpacing: 1 }}>TOME 1</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 6, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>GRÂCE A. SUMBELA</div>
          </div>
        </div>

        <div style={s.heroTitle}>
          Bâtir un Empire<br />Familial
        </div>
        <div style={s.heroSub}>Version Audio — Tome 1</div>
        <div style={s.heroAuthor}>Pasteur Grâce A. Sumbela</div>

        <div style={s.badge}>
          <HeadphonesIcon /> LIVRE AUDIO
        </div>

        <div style={{ marginBottom: 24 }}>
          <KongoSVG />
        </div>

        <div style={s.statsRow}>
          <div style={s.stat}>
            <div style={s.statNum}>15</div>
            <div style={s.statLabel}>Chapitres</div>
          </div>
          <div style={s.stat}>
            <div style={s.statNum}>{formatTime(TOTAL_DURATION).split(" ")[0]}</div>
            <div style={s.statLabel}>{formatTime(TOTAL_DURATION).includes("h") ? "Heures" : "Minutes"}</div>
          </div>
          <div style={s.stat}>
            <div style={s.statNum}>236</div>
            <div style={s.statLabel}>Pages</div>
          </div>
        </div>

        <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={s.ctaBtn}>
          Acheter le livre audio
        </a>
        <button style={s.ctaSecondary} onClick={() => {
          if (hasAccess) setView("chapters");
          else setShowAccessModal(true);
        }}>
          {hasAccess ? "Accéder à mes chapitres" : "J'ai déjà acheté — Accéder"}
        </button>

        <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: "#6B6B6B", marginTop: 8, lineHeight: 1.6, fontStyle: "italic" }}>
          « Un empire familial ne se bâtit pas en un jour. Il se construit pierre après pierre, génération après génération. »
        </div>
      </div>

      {/* Preview chapters */}
      <div style={{ padding: "0 16px 20px" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#C4953A", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
          Aperçu des chapitres
        </div>

        {sections.map(section => (
          <div key={section} style={s.sectionGroup}>
            <div
              style={s.sectionHeader(expandedSection === section)}
              onClick={() => setExpandedSection(expandedSection === section ? null : section)}
            >
              <span style={s.sectionTitle(expandedSection === section)}>{section}</span>
              <ChevronIcon open={expandedSection === section} />
            </div>
            {expandedSection === section && (
              <div style={{ background: "#fff", borderRadius: "0 0 8px 8px", overflow: "hidden", marginBottom: 8 }}>
                {CHAPTERS.filter(c => c.section === section).map((chapter, idx) => (
                  <div
                    key={chapter.id}
                    style={s.chapterItem(currentChapter?.id === chapter.id)}
                    onClick={() => handlePlay(chapter)}
                  >
                    <div style={s.chapterNum}>{chapter.label.includes("Chapitre") ? chapter.label.split(" ")[1] : "◆"}</div>
                    <div style={s.chapterInfo}>
                      <div style={s.chapterLabel}>{chapter.label}</div>
                      <div style={s.chapterSub}>{chapter.subtitle}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={s.chapterDuration}>{chapter.duration} min</div>
                      {!hasAccess && <LockIcon />}
                    </div>
                    <button style={s.playBtn(currentChapter?.id === chapter.id)} onClick={(e) => { e.stopPropagation(); handlePlay(chapter); }}>
                      {currentChapter?.id === chapter.id && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* About section */}
      <div style={{ padding: "32px 24px", background: "#2C1810", color: "#fff" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#C4953A", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>L'Auteur</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
          Pasteur Grâce A. Sumbela
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", textAlign: "center", marginBottom: 16 }}>
          Serviteur de Dieu passionné par la formation, le leadership et la mission. Pasteur Principal de l'Église Pierre Vivante (PIVA-CEM). Président de Vis'A Internationale. Initiateur de « L'École de Vie ». Marié à Mamie-Rachel Sumbela, père de trois enfants.
        </div>
        <div style={{ textAlign: "center" }}>
          <KongoSVG />
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, textAlign: "center", color: "#C4953A", marginTop: 12, letterSpacing: 1 }}>
          @Befamilial
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#2C1810", marginBottom: 16, lineHeight: 1.5 }}>
          « Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »
          <br />
          <span style={{ fontSize: 13, color: "#6B6B6B" }}>— Matthieu 5:14</span>
        </div>
        <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={s.ctaBtn}>
          Acheter le livre audio
        </a>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#6B6B6B", marginTop: 8 }}>
          Aussi disponible en livre papier et Kindle sur Amazon
        </div>
      </div>
    </div>
  );

  // CHAPTERS LIST VIEW
  const ChaptersView = () => (
    <div style={{ padding: "20px 0" }}>
      <div style={{ padding: "0 20px 20px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2C1810", marginBottom: 4 }}>Mes chapitres</div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: "#6B6B6B" }}>
          {formatTime(TOTAL_DURATION)} d'écoute — 15 chapitres
        </div>
      </div>

      {CHAPTERS.map((chapter, idx) => (
        <div
          key={chapter.id}
          style={{ ...s.chapterItem(currentChapter?.id === chapter.id), margin: "0 16px", borderRadius: idx === 0 ? "8px 8px 0 0" : idx === CHAPTERS.length - 1 ? "0 0 8px 8px" : 0 }}
          onClick={() => handlePlay(chapter)}
        >
          <div style={s.chapterNum}>
            {chapter.label.includes("Chapitre") ? chapter.label.split(" ")[1] : idx === 0 ? "P" : "◆"}
          </div>
          <div style={s.chapterInfo}>
            <div style={s.chapterLabel}>{chapter.label}</div>
            <div style={s.chapterSub}>{chapter.subtitle}</div>
            {audioUrls[chapter.id] && (
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#27ae60", marginTop: 2 }}>Audio disponible</div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={s.chapterDuration}>{chapter.duration} min</div>
          </div>
          <button style={s.playBtn(currentChapter?.id === chapter.id)}>
            {currentChapter?.id === chapter.id && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
        </div>
      ))}
    </div>
  );

  // PLAYER VIEW
  const PlayerView = () => {
    if (!currentChapter) return null;
    const chIdx = CHAPTERS.findIndex(c => c.id === currentChapter.id);
    const prevCh = chIdx > 0 ? CHAPTERS[chIdx - 1] : null;
    const nextCh = chIdx < CHAPTERS.length - 1 ? CHAPTERS[chIdx + 1] : null;
    const elapsedSecs = Math.floor((progress / 100) * currentChapter.duration * 60);
    const elapsedMin = Math.floor(elapsedSecs / 60);
    const elapsedSec = elapsedSecs % 60;
    const hasAudio = audioUrls[currentChapter.id];

    return (
      <div style={s.playerWrap}>
        <button style={s.playerBack} onClick={() => setView("chapters")}>
          ← Tous les chapitres
        </button>

        <div style={s.playerTitle}>{currentChapter.label}</div>
        <div style={s.playerSub}>{currentChapter.subtitle}</div>

        {/* Mode toggle */}
        <div style={s.modeToggle}>
          <button style={s.modeBtn(mode === "listen")} onClick={() => setMode("listen")}>
            <HeadphonesIcon /> Écouter
          </button>
          <button style={s.modeBtn(mode === "read")} onClick={() => setMode("read")}>
            <BookIcon /> Lire
          </button>
        </div>

        {/* Audio controls */}
        <div style={s.playerControls}>
          {hasAudio ? (
            <audio ref={audioRef} src={hasAudio} style={{ display: "none" }}
              onTimeUpdate={(e) => {
                const pct = (e.target.currentTime / e.target.duration) * 100;
                setProgress(pct);
              }}
              onEnded={() => setIsPlaying(false)}
            />
          ) : null}

          <div style={s.progressBar} onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(pct);
            if (audioRef.current) audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
          }}>
            <div style={s.progressFill(progress)} />
          </div>

          <div style={s.timeRow}>
            <span style={s.timeText}>{elapsedMin}:{String(elapsedSec).padStart(2, "0")}</span>
            <span style={s.timeText}>{currentChapter.duration}:00</span>
          </div>

          <div style={s.controlRow}>
            <button style={s.skipBtn} onClick={() => prevCh && handlePlay(prevCh)}>
              ⏮ Préc.
            </button>
            <button style={s.bigPlayBtn} onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
                if (audioRef.current) audioRef.current.pause();
              } else {
                setIsPlaying(true);
                if (audioRef.current) audioRef.current.play();
              }
            }}>
              {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
            </button>
            <button style={s.skipBtn} onClick={() => nextCh && handlePlay(nextCh)}>
              Suiv. ⏭
            </button>
          </div>
        </div>

        {/* Audio status */}
        {!hasAudio && (
          <div style={s.audioPlaceholder}>
            <HeadphonesIcon />
            <div style={s.audioPlaceholderText}>
              L'audio de ce chapitre sera bientôt disponible.
              <br />La narration est en cours de production.
            </div>
          </div>
        )}

        {/* Read along text */}
        {mode === "read" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#C4953A", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
              Lecture — {currentChapter.label}
            </div>
            <div style={s.readText}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#C4953A", float: "left", lineHeight: 1, marginRight: 8, marginTop: 4 }}>
                {currentChapter.subtitle.charAt(0)}
              </div>
              {currentChapter.subtitle}
              <br /><br />
              <span style={{ color: "#6B6B6B", fontStyle: "italic" }}>
                Le texte complet de ce chapitre s'affichera ici pendant l'écoute. Les fichiers audio seront synchronisés avec le texte pour une expérience de lecture immersive.
              </span>
              <br /><br />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#C4953A" }}>
                Durée estimée : {currentChapter.duration} minutes
              </span>
            </div>
          </div>
        )}

        {/* Next chapter */}
        {nextCh && (
          <div style={{ marginTop: 20, padding: "16px", background: "#F0EBE3", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => handlePlay(nextCh)}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>Chapitre suivant</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, color: "#2C1810" }}>{nextCh.label}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: "#6B6B6B" }}>{nextCh.subtitle}</div>
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#C4953A" }}>→</div>
          </div>
        )}
      </div>
    );
  };

  // ACCESS MODAL
  const AccessModal = () => (
    <div style={s.modalOverlay} onClick={() => setShowAccessModal(false)}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
        <div style={s.modalTitle}>Accéder au livre audio</div>
        <div style={s.modalText}>
          Achetez le livre audio pour accéder à tous les chapitres, en écoute et en lecture.
        </div>

        <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer"
          style={{ ...s.ctaBtn, marginBottom: 16, display: "block", textDecoration: "none" }}>
          Acheter maintenant
        </a>

        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
          Déjà acheté ?
        </div>

        <input
          type="text"
          placeholder="Entrez votre code d'accès"
          value={accessCode}
          onChange={e => setAccessCode(e.target.value)}
          style={s.input}
        />

        <button
          style={{ ...s.ctaSecondary, marginBottom: 12 }}
          onClick={() => {
            if (accessCode.trim().length > 0) {
              grantAccess();
              setShowAccessModal(false);
              setView("chapters");
            }
          }}
        >
          Accéder
        </button>

        <button
          style={{ background: "none", border: "none", color: "#6B6B6B", fontFamily: "'Lora', serif", fontSize: 12, cursor: "pointer" }}
          onClick={() => setShowAccessModal(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  );

  return (
    <div style={s.app}>
      {/* Nav */}
      <nav style={s.nav}>
        <span style={s.navBrand} onClick={() => setView("home")}>Empire Familial</span>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={s.navLink(view === "home")} onClick={() => setView("home")}>Accueil</button>
          <button style={s.navLink(view === "chapters")} onClick={() => {
            if (hasAccess) setView("chapters");
            else setShowAccessModal(true);
          }}>Chapitres</button>
        </div>
      </nav>

      {/* Views */}
      {view === "home" && <HomeView />}
      {view === "chapters" && hasAccess && <ChaptersView />}
      {view === "player" && hasAccess && <PlayerView />}

      {/* Footer */}
      <div style={s.footer}>
        <KongoSVG />
        <div style={{ ...s.footerText, marginTop: 16 }}>
          BÂTIR UN EMPIRE FAMILIAL — TOME 1
          <br />Pasteur Grâce A. Sumbela
          <br />© 2025 ECKI Publications — Tous droits réservés
          <br />@Befamilial | #MonEmpireFamilial
        </div>
      </div>

      {/* Sticky mini player */}
      {currentChapter && isPlaying && view !== "player" && (
        <div style={s.stickyPlayer} onClick={() => setView("player")}>
          <button style={s.playBtn(true)} onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
          <div style={s.stickyInfo}>
            <div style={s.stickyLabel}>{currentChapter.label}</div>
            <div style={s.stickySub}>{currentChapter.subtitle}</div>
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#C4953A" }}>
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Access Modal */}
      {showAccessModal && <AccessModal />}
    </div>
  );
}
