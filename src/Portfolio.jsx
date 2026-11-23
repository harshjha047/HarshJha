import { useEffect, useMemo, useRef, useState } from "react";
import { WORK, WORK_CATS, JOBS, STACK } from "./data/portfolio.js";
import { scrollToId, stopScroll, startScroll } from "./smooth.js";
import "./portfolio.css";

/* ---------- static content ---------- */

const B = "/assets/brands/";
/* Stable, shareable résumé URL (lives in /public, so the filename never gets a hash) */
const RESUME = "/Harsh-Jha-Resume.pdf";
const LINKEDIN = "https://www.linkedin.com/in/harsh-jha0047/";
const INSTAGRAM = "https://www.instagram.com/harsh_jha0";
const GITHUB = "https://github.com/harshjha047";
/* Optional: set VITE_CONTACT_ENDPOINT (e.g. a Formspree form URL) to send the brief without a mail app */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

const LOGOS = {
  gorevive: B + "gorevive.avif",
  div: B + "div.webp",
  cc: B + "creative-circuit-light.webp",
  ac: B + "academor.webp",
  ff: B + "fab5.webp",
  ty: B + "testyantra-dark.svg",
};
const JOB_LOGO = { gr: "gorevive", cc: "cc", ty: "ty", ac: "ac", ff: "ff" };

const BRANDS = [
  { name: "GoRevive", src: B + "gorevive.avif", link: "https://gorevive.in" },
  { name: "Fab Five Network", src: B + "fab5.webp", link: "https://fab5network.com" },
  { name: "DIV", src: B + "div.webp", link: "https://thediv.in" },
  { name: "Creative Circuit", src: B + "creative-circuit-light.webp", link: "https://creative-circuit.vercel.app/", tall: true },
  { name: "Bharat Radius", src: B + "bharat-radius.webp", link: "https://bharatradius.com/" },
  { name: "Qspiders · Test Yantra", src: B + "testyantra-dark.svg", link: "https://www.testyantra.com" },
  { name: "Bahikhata", src: B + "bahikhata.webp", link: "https://bahikhata.fab5connect.com/", tall: true },
  { name: "Samadhan", src: B + "samadhan.webp", link: "https://samadhan.fab5connect.com/", tall: true },
  { name: "Drishti", src: B + "drishti.webp", link: "https://drishti-tan.vercel.app", tall: true },
  { name: "DIV Sign", src: B + "divsign.webp", tall: true },
  { name: "Finvia", src: B + "finvia.webp", tall: true },
  { name: "Academor", src: B + "academor.webp", link: "https://academor.com", tall: true },
  { name: "Playbeat", src: B + "playbeat.webp", link: "https://spontaneous-parfait-fee957.netlify.app/", tall: true },
  { name: "DAV Networks", link: "https://davnetworks.in/" },
  { name: "Ulfat", link: "https://ulfat-in.vercel.app" },
  { name: "Samridhi", link: "https://samridhisi.vercel.app" },
  { name: "FABTECH", link: "https://fabtech-five.vercel.app" },
];

const CLONES = [
  { name: "Div.me", link: "https://harshjha047.github.io/-DIV--Hackathon/" },
  { name: "Cyberpunk", link: "https://cyberpunk-spyder.vercel.app/" },
  { name: "E-comm product", link: "https://ecomm-react-tau.vercel.app/" },
  { name: "Kamyafood", link: "https://harshjha047.github.io/kamyafood/" },
  { name: "Tesla", link: "https://harshjha047.github.io/Tesla/" },
  { name: "Microsoft", link: "https://harshjha047.github.io/Microsoft/" },
  { name: "REDUX", link: "https://harshjha047.github.io/REDUX/" },
];

const WORDS = ["Full-stack", "Real-time", "Product", "B2B Platform"];
const NEEDS = ["Web platform", "Mobile app", "Brand site", "Real-time / WebRTC", "Full-time role"];
const EMAIL = "harshjha.00004@gmail.com";
const AVAILABILITY = "Open to roles & freelance";
const THEMES = {
  light: { "--bg": "#ffffff", "--fg": "#000000", "--muted": "#6b6b6b", "--line": "rgba(0,0,0,.12)", "--soft": "#f4f4f4" },
  dark: { "--bg": "#111111", "--fg": "#ffffff", "--muted": "#9a9a9a", "--line": "rgba(255,255,255,.16)", "--soft": "#1b1b1b" },
};

const THEME_KEY = "pf-theme";
const initialDark = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === "dark";
  } catch { /* storage unavailable */ }
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;
};

/* Case studies get their own URL (#work/<id>) so a recruiter can share one project directly */
const caseFromHash = () => {
  const m = typeof window !== "undefined" && window.location.hash.match(/^#work\/(.+)$/);
  return m ? decodeURIComponent(m[1]) : null;
};

const norm = (t) => t.replace(/\s+\d[\d.]*$/, "").trim();
const STRIPES = "repeating-linear-gradient(135deg,rgba(127,127,127,.10) 0 10px,rgba(127,127,127,.17) 10px 20px)";
/* Fallback only: projects without a local `img` get a remote screenshot. Prefer adding a local .webp to data/portfolio.js. */
const shotSrc = (u, w = 960) => "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(u) + `?w=${w}&h=${Math.round(w * 0.625)}`;
const withBase = (src) => (src && src.startsWith("assets/") ? "/" + src : src);
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/* ---------- shared styles ---------- */

const PAD = "clamp(20px,4.5vw,64px)";
const H2 = { fontFamily: "'Clash',sans-serif", fontWeight: 600, fontSize: "clamp(48px,7vw,96px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 };
const MUTED = { color: "var(--muted)" };
const pill = (t) => ({ fontFamily: "inherit", fontWeight: 500, fontSize: 14, borderRadius: 999, padding: "7px 14px", cursor: "pointer", whiteSpace: "nowrap", flex: "none", border: `1px solid ${t.border}`, background: t.bg, color: t.fg });
const tag = { fontWeight: 500, fontSize: 15, border: "1px solid var(--line)", borderRadius: 4, padding: "4px 14px" };
const lineInput = { font: "inherit", fontWeight: 500, fontSize: 20, color: "var(--fg)", background: "transparent", border: 0, borderBottom: "1px solid var(--line)", padding: "12px 0", outline: "none" };
const ctaBtn = { display: "inline-flex", alignItems: "center", fontWeight: 500, fontSize: 14, lineHeight: 1.2, whiteSpace: "nowrap", borderRadius: 999, padding: "10px 16px", border: "1px solid var(--line)", textDecoration: "none", transition: "transform .3s ease,border-color .2s ease" };
const caseLink = {fontWeight: 500, fontSize: 15, border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px", textDecoration: "none" };

/* ---------- small pieces ---------- */

function BrandLogo({ b }) {
  const [failed, setFailed] = useState(false);
  if (b.src && !failed) {
    return <img src={b.src} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} style={{ maxWidth: "100%", maxHeight: b.tall ? 66 : 48, objectFit: "contain", display: "block" }} />;
  }
  return <span style={{ display: "block", fontFamily: "'Clash',sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: "#111", textAlign: "center", lineHeight: 1.15 }}>{b.name}</span>;
}

function JobLogo({ k, alt }) {
  return (
    <span aria-hidden="true" style={{ flex: "none", width: 56, height: 56, borderRadius: 14, background: "#fff", border: "1px solid rgba(0,0,0,.1)", display: "grid", placeItems: "center", overflow: "hidden", padding: 8 }}>
      <img src={LOGOS[k]} alt={alt || ""} loading="lazy" referrerPolicy="no-referrer" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
    </span>
  );
}

/* Hover zoom is pure CSS (.card:hover .thumb-img), so hovering never re-renders the page */
function Thumb({ p }) {
  const [imgOk, setImgOk] = useState(true);
  const src = withBase(p.img) || (p.live ? shotSrc(p.live) : null);
  return (
    <>
      <span style={{ position: "absolute", inset: 0, background: STRIPES, display: "flex", alignItems: "flex-end", padding: 14, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 12, color: "#8a8a8a" }}>{p.shot || ""}</span>
      {src && imgOk && <img src={src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setImgOk(false)} className="thumb-img"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", background: "#fff" }} />}
    </>
  );
}

function CaseImage({ cs }) {
  const [failed, setFailed] = useState(false);
  const src = withBase(cs.img) || (cs.live ? shotSrc(cs.live, 1440) : null);
  if (src && !failed) {
    return <img src={src} alt="" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />;
  }
  return <span style={{ position: "absolute", left: 20, bottom: 16, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 13, color: "#8a8a8a" }}>{cs.shot}</span>;
}

/* Ticking pieces live in their own components so only they re-render, not the whole page */
function Clock() {
  const fmt = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

function RotatingWord() {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setW((x) => (x + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);
  return <span key={w} style={{ display: "inline-block", animation: "pf-rise .5s cubic-bezier(.2,.8,.2,1)" }}>{WORDS[w]}</span>;
}

/* ---------- page ---------- */

export default function Portfolio() {
  const [dark, setDark] = useState(initialDark);
  const [caseId, setCaseId] = useState(caseFromHash);
  const [jobOpen, setJobOpen] = useState({ gr: true });
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [needs, setNeeds] = useState([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [type, setType] = useState("All");
  const [year, setYear] = useState("All");
  const [tech, setTech] = useState("All");
  const [techOpen, setTechOpen] = useState(false);
  const rail = useRef(null);
  const dialog = useRef(null);
  const copyT = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => () => clearTimeout(copyT.current), []);

  /* theme: follow the OS by default, remember an explicit choice */
  const toggleDark = () => setDark((d) => {
    try { localStorage.setItem(THEME_KEY, d ? "light" : "dark"); } catch { /* storage unavailable */ }
    return !d;
  });

  /* case study <-> URL hash, so links are shareable and the browser Back button closes the case study */
  useEffect(() => {
    const sync = () => setCaseId(caseFromHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, []);
  const openCase = (id) => {
    const url = "#work/" + encodeURIComponent(id);
    if (caseFromHash()) window.history.replaceState(window.history.state, "", url);
    else window.history.pushState({ pfCase: true }, "", url);
    setCaseId(id);
  };
  const closeCase = () => {
    if (window.history.state?.pfCase) window.history.back();
    else { window.history.replaceState(null, "", window.location.pathname + window.location.search); setCaseId(null); }
  };

  /* while a case study is open: lock page scroll, Escape closes, Tab stays inside the dialog */
  const caseOpen = !!caseId;
  useEffect(() => {
    if (!caseOpen) return;
    returnFocus.current = document.activeElement;
    stopScroll();
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") { closeCase(); return; }
      if (e.key !== "Tab" || !dialog.current) return;
      const els = [...dialog.current.querySelectorAll(FOCUSABLE)];
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      startScroll();
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [caseOpen]);

  const copyEmail = () => {
    try { navigator.clipboard.writeText(EMAIL); } catch { /* clipboard unavailable */ }
    setCopied(true);
    clearTimeout(copyT.current);
    copyT.current = setTimeout(() => setCopied(false), 1800);
  };

  const t = dark ? THEMES.dark : THEMES.light;
  const tone = (on) => ({ bg: on ? t["--fg"] : "transparent", fg: on ? t["--bg"] : t["--fg"], border: on ? t["--fg"] : t["--line"] });

  /* ----- work data ----- */
  const all = useMemo(() => WORK.map((p) => ({
    ...p,
    techs: [...new Set([...p.tags, ...(p.stack || "").split(" · ")].map(norm).filter(Boolean))],
    typeLabel: p.client ? "Client" : "Personal",
    y: String(p.year).slice(0, 4),
  })), []);
  const techOpts = useMemo(() => {
    const counts = {};
    all.forEach((p) => p.techs.forEach((x) => { counts[x] = (counts[x] || 0) + 1; }));
    return Object.keys(counts).filter((x) => counts[x] >= 2).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b)).slice(0, 18);
  }, [all]);
  const years = useMemo(() => [...new Set(all.map((p) => p.y))].sort().reverse(), [all]);
  const cats = useMemo(() => WORK_CATS.filter((c) => all.some((p) => p.cat === c)), [all]);

  const ql = q.trim().toLowerCase();
  const list = all.filter((p) => (cat === "All" || p.cat === cat) && (type === "All" || p.typeLabel === type) && (year === "All" || p.y === year) && (tech === "All" || p.techs.includes(tech))
    && (!ql || [p.title, p.kind, p.summary, p.cat, ...p.techs].join(" ").toLowerCase().includes(ql)));
  const filtered = cat !== "All" || type !== "All" || year !== "All" || tech !== "All" || !!ql;
  const clearFilters = () => { setQ(""); setCat("All"); setType("All"); setYear("All"); setTech("All"); };
  const opts = (value, setter, values, labels) => values.map((v, i) => ({ v, label: labels ? labels[i] : v, ...tone(value === v), pick: () => setter(value === v && v !== "All" ? "All" : v) }));

  const railBy = (dir) => { const r = rail.current; if (r) r.scrollBy({ left: dir * r.clientWidth * 0.8, behavior: "smooth" }); };

  /* ----- case study ----- */
  const seq = list.some((p) => p.id === caseId) ? list : all;
  const csIdx = seq.findIndex((p) => p.id === caseId);
  const cs = csIdx >= 0 ? seq[csIdx] : null;
  const next = cs && seq.length ? seq[(csIdx + 1) % seq.length] : null;
  const nextCase = () => { if (next) { openCase(next.id); if (dialog.current) dialog.current.scrollTop = 0; } };

  /* ----- contact ----- */
  const setField = (k) => (e) => { const v = e.target.value; setForm((f) => ({ ...f, [k]: v })); };
  const mailtoHref = () => {
    const body = `Hi Harsh,\n\n${form.msg}\n\nLooking for: ${needs.join(", ") || "—"}\n\n— ${form.name} (${form.email})`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent("Project brief from " + form.name)}&body=${encodeURIComponent(body)}`;
  };
  const submit = async (e) => {
    e.preventDefault();
    setSendError(false);
    if (!CONTACT_ENDPOINT) { window.location.href = mailtoHref(); setSent(true); return; }
    setSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.msg, looking_for: needs.join(", "), _subject: "Portfolio brief from " + form.name }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const card = (p, isWide) => (
    <button key={p.id} type="button" className="card" onClick={() => openCase(p.id)}
      style={isWide
        ? { flex: "none", width: "min(84vw,620px)", scrollSnapAlign: "start", fontFamily: "inherit", color: "inherit", textAlign: "left", background: "transparent", border: 0, padding: 0, cursor: "pointer", display: "flex", flexDirection: "column" }
        : { fontFamily: "inherit", color: "inherit", textAlign: "left", background: "transparent", border: 0, padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <span style={{ display: "block", position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: isWide ? 20 : 16, overflow: "hidden", background: "var(--soft)" }}>
        <Thumb p={p} />
        <span style={{ position: "absolute", left: isWide ? 14 : 12, top: isWide ? 14 : 12, fontSize: 12, fontWeight: 500, background: "var(--bg)", color: "var(--fg)", borderRadius: 999, padding: "4px 10px" }}>{p.typeLabel}</span>
      </span>
      <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: isWide ? 16 : 12, marginTop: isWide ? 16 : 14, width: "100%" }}>
        <span style={{ fontWeight: 500, fontSize: isWide ? "clamp(22px,2vw,28px)" : 22, lineHeight: isWide ? 1.2 : 1.25, minWidth: 0 }}>{p.title}</span>
        <span style={{ fontSize: 14, ...MUTED, whiteSpace: "nowrap" }}>{p.year}</span>
      </span>
      {isWide
        ? <span style={{ display: "block", fontSize: 14, ...MUTED, marginTop: 4 }}>{p.summary}</span>
        : <>
            <span style={{ display: "block", fontSize: 14, ...MUTED, marginTop: 2 }}>{p.kind}</span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {p.tags.slice(0, 3).map((tg) => <span key={tg} style={{ fontWeight: 500, fontSize: 12, border: "1px solid var(--line)", borderRadius: 4, padding: "2px 8px" }}>{tg}</span>)}
            </span>
          </>}
    </button>
  );

  return (
    <div className="pf" style={t}>
      <nav style={{ position: "sticky", top: 0, zIndex: 30, background: "var(--bg)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: `18px ${PAD}`, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", gap: 16, flex: 1, flexWrap: "wrap", fontSize: 14, ...MUTED }}>
            <a href="#top" className="navlink" style={{ textDecoration: "none" }}>Home</a>
            <a href="#work" className="navlink" style={{ textDecoration: "none" }}>Work</a>
            <a href="#experience" className="navlink" style={{ textDecoration: "none" }}>Experience</a>
            <a href="#contact" className="navlink" style={{ textDecoration: "none" }}>Contact</a>
          </div>
          <a href={RESUME} target="_blank" rel="noopener" style={{ fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>Résumé ↗</a>
          <button type="button" onClick={toggleDark} aria-label="Toggle dark mode" className="ring-hover"
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", display: "grid", placeItems: "center", cursor: "pointer", fontSize: 15 }}>{dark ? "☾" : "☀"}</button>
        </div>
      </nav>

      <main id="top" style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${PAD}` }}>
        {/* hero */}
        <section style={{ minHeight: "calc(100svh - 72px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", alignContent: "flex-end", gap: "32px 48px", padding: "40px 0 clamp(32px,6vh,64px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,2vh,20px)", minWidth: 0, flex: "0 1 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 28px", fontSize: 14, ...MUTED }}>
              <span>{AVAILABILITY}</span>
              <span>SDE @ GoRevive</span>
              <span>Noida · <Clock /> IST</span>
            </div>
            <h1 className="clash" style={{ fontWeight: 600, fontSize: "clamp(42px,7.2vw,110px)", lineHeight: 1.22, letterSpacing: "-0.01em", margin: 0 }}>
              <span style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0 .2em" }}>Hi, I’m Harsh,
                <span className="avatar" style={{ display: "inline-block", width: "1.45em", height: "1.45em", borderRadius: "50%", overflow: "hidden", flex: "none", transition: "transform .35s cubic-bezier(.3,1.6,.5,1)" }}>
                  <img src="/assets/harsh.webp" alt="Harsh Jha" width="160" height="160" fetchpriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </span>
              </span>
              <span style={{ display: "block" }}>a <RotatingWord /></span>
              <span style={{ display: "block" }}>Developer.</span>
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "34ch", margin: "0 0 .6em" }}>
            <dl style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", justifyContent: "start", columnGap: 36, margin: 0, whiteSpace: "nowrap" }}>
              {[["Projects built", "250+"], ["Years building", "3Yrs"], ["Years coding", "6Yrs"]].map(([k, v]) => (
                <div key={k}><dt style={{ fontSize: 13, ...MUTED }}>{k}</dt><dd className="clash" style={{ margin: "2px 0 0", fontWeight: 600, fontSize: 36, lineHeight: 1.1 }}>{v}</dd></div>
              ))}
            </dl>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, ...MUTED }}>I design and build full-stack products — B2B platforms, payment flows, real-time apps and the sites that sell them.</p>
            {/* the three things a recruiter looks for first */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <a href={RESUME} target="_blank" rel="noopener" className="grow" style={{ ...ctaBtn, color: "var(--bg)", background: "var(--fg)", border: "1px solid var(--fg)" }}>Résumé ↗</a>
              <a href={`mailto:${EMAIL}`} className="case-link" style={ctaBtn}>Email</a>
              <a href={LINKEDIN} target="_blank" rel="noopener" className="case-link" style={ctaBtn}>LinkedIn ↗</a>
            </div>
          </div>
        </section>

        {/* logo wall */}
        <section aria-labelledby="brands-h" style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
          <h2 id="brands-h" style={{ fontWeight: 500, fontSize: 14, ...MUTED, margin: "0 0 16px" }}>Companies, clients &amp; products I’ve built for</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,170px),1fr))", gap: 12 }}>
            {BRANDS.map((b) => (
              <a key={b.name} href={b.link} target="_blank" rel="noopener" aria-label={b.name} title={b.name} className="brand"
                style={{ display: "grid", placeItems: "center", height: 96, padding: "14px 20px", background: "#fff", border: "1px solid var(--line)", borderRadius: 10, textDecoration: "none", transition: "transform .25s ease,box-shadow .25s ease,border-color .25s ease" }}>
                <BrandLogo b={b} />
              </a>
            ))}
          </div>
        </section>

        {/* work */}
        <section id="work" style={{ scrollMarginTop: 72, paddingTop: "clamp(40px,6vw,80px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "12px 32px", marginBottom: 28 }}>
            <h2 style={H2}>Work</h2>
            <span style={{ fontSize: 14, ...MUTED, paddingBottom: 14 }}>{all.length} selected from 250+ built · tap any for the case study</span>
          </div>

          {!filtered && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                <span style={{ fontWeight: 500, fontSize: 14, ...MUTED }}>Selected</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Previous", "←", -1], ["Next", "→", 1]].map(([label, glyph, dir]) => (
                    <button key={label} type="button" onClick={() => railBy(dir)} aria-label={label} className="ring-hover"
                      style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", cursor: "pointer", fontSize: 16 }}>{glyph}</button>
                  ))}
                </div>
              </div>
              <div ref={rail} className="no-scrollbar" style={{ display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", margin: `0 calc(-1 * ${PAD})`, padding: `0 ${PAD} 8px`, scrollPadding: `0 ${PAD}` }}>
                {all.filter((p) => p.featured).map((p) => card(p, true))}
              </div>
            </>
          )}

          <div style={{ position: "sticky", top: 72, zIndex: 20, background: "var(--bg)", marginTop: "clamp(48px,6vw,80px)", padding: "14px 0", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px 24px" }}>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects or tech…" aria-label="Search projects" className="line-input"
                style={{ ...lineInput, fontSize: 18, flex: "1 1 240px", maxWidth: 380, minWidth: 0, padding: "8px 0" }} />
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 20px" }}>
                <div style={{ display: "flex", gap: 6 }}>{opts(type, setType, ["All", "Client", "Personal"]).map((c) => <button key={c.v} type="button" onClick={c.pick} style={pill(c)}>{c.label}</button>)}</div>
                <div style={{ display: "flex", gap: 6 }}>{opts(year, setYear, ["All", ...years]).map((c) => <button key={c.v} type="button" onClick={c.pick} style={pill(c)}>{c.label}</button>)}</div>
                <button type="button" onClick={() => setTechOpen((o) => !o)} style={pill(tone(tech !== "All"))}>{tech === "All" ? "Stack " + (techOpen ? "▴" : "▾") : tech + " ✕"}</button>
              </div>
            </div>
            <div className="no-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto" }}>
              {opts(cat, setCat, ["All", ...cats], ["All work", ...cats]).map((c) => <button key={c.v} type="button" onClick={c.pick} style={pill(c)}>{c.label}</button>)}
            </div>
            {techOpen && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {opts(tech, setTech, techOpts).map((c) => <button key={c.v} type="button" onClick={c.pick} style={pill(c)}>{c.label}</button>)}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 20, fontSize: 14, ...MUTED }}>
            <span>{filtered ? `${list.length} of ${all.length} projects` : `All ${all.length} projects`}</span>
            {filtered && <button type="button" onClick={clearFilters} style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 500, color: "var(--fg)", background: "transparent", border: 0, borderBottom: "1px solid currentColor", padding: "0 0 2px", cursor: "pointer" }}>Clear filters</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))", gap: "48px 24px", marginTop: 24 }}>
            {list.map((p) => card(p, false))}
          </div>
          {list.length === 0 && (
            <div style={{ padding: "64px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <div className="clash" style={{ fontWeight: 600, fontSize: 32, lineHeight: 1.15 }}>Nothing matches that.</div>
              <button type="button" onClick={clearFilters} style={{ fontFamily: "inherit", fontWeight: 500, fontSize: 15, color: "var(--fg)", background: "transparent", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }}>Clear filters</button>
            </div>
          )}
          {/* practice clones: kept, but low-key so client work leads */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 56, fontSize: 14, ...MUTED }}>
            <span style={{ marginRight: 4 }}>Practice clones:</span>
            {CLONES.map((c) => (
              <a key={c.name} href={c.link} target="_blank" rel="noopener" className="chip-link" style={{ ...tag, fontSize: 13, padding: "2px 12px", textDecoration: "none", transition: "transform .2s ease,box-shadow .2s ease" }}>{c.name}</a>
            ))}
          </div>
        </section>

        {/* experience */}
        <section id="experience" style={{ scrollMarginTop: 72, paddingTop: "clamp(72px,9vw,120px)" }}>
          <h2 style={{ ...H2, marginBottom: 20 }}>Experience</h2>
          {JOBS.map((j) => {
            const isOpen = !!jobOpen[j.id];
            return (
              <div key={j.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <button type="button" onClick={() => setJobOpen((s) => ({ ...s, [j.id]: !isOpen }))} aria-expanded={isOpen}
                  style={{ fontFamily: "inherit", color: "inherit", textAlign: "left", width: "100%", background: "transparent", border: 0, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px 24px", padding: "16px 8px", cursor: "pointer" }}>
                  {JOB_LOGO[j.id] && <JobLogo k={JOB_LOGO[j.id]} alt={j.company} />}
                  <span style={{ flex: "1 1 280px", minWidth: 0 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 500, fontSize: "clamp(24px,2.4vw,32px)", lineHeight: 1.2 }}>
                      {j.company}
                      {j.current && <span style={{ fontSize: 12, fontWeight: 500, background: "var(--fg)", color: "var(--bg)", borderRadius: 999, padding: "3px 10px" }}>Now</span>}
                    </span>
                    <span style={{ display: "block", fontWeight: 500, fontSize: 14, ...MUTED, marginTop: 2 }}>{j.role} | {j.place}</span>
                  </span>
                  <span style={{ fontSize: 15, ...MUTED, whiteSpace: "nowrap" }}>{j.dates}</span>
                  <span style={{ flex: "none", width: 44, height: 44, display: "grid", placeItems: "center", fontSize: 22 }}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <ul style={{ listStyle: "none", margin: 0, padding: "0 8px 24px", display: "flex", flexDirection: "column", gap: 8, maxWidth: 760 }}>
                    {j.points.map((pt) => <li key={pt} style={{ display: "flex", gap: 12, fontSize: 16, ...MUTED }}><span style={{ flex: "none" }}>↳</span><span>{pt}</span></li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </section>

        {/* stack */}
        <section style={{ paddingTop: "clamp(72px,9vw,120px)" }}>
          <h2 style={{ ...H2, marginBottom: 28 }}>Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "28px 48px" }}>
            {STACK.map((s) => (
              <div key={s.label}>
                <div style={{ fontWeight: 500, fontSize: 14, ...MUTED, marginBottom: 10 }}>{s.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{s.items.map((it) => <span key={it} style={tag}>{it}</span>)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "24px 48px", marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
            {[["Leadership", "Technical Head, Playbeat Cultural Society — led a team of 4"], ["Hackathons", "Top 5 placement, multiple participations"], ["Education", "BCA, IITM College of Engineering, Delhi · 2022–25"]].map(([k, v]) => (
              <div key={k}><div style={{ fontWeight: 500, fontSize: 14, ...MUTED }}>{k}</div><div style={{ fontWeight: 500, fontSize: 20, marginTop: 6 }}>{v}</div></div>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" style={{ scrollMarginTop: 72, paddingTop: "clamp(96px,12vw,180px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "40px clamp(40px,6vw,96px)", alignItems: "start" }}>
          <div>
            <h2 style={{ ...H2, lineHeight: 1.05 }}>Let’s work together</h2>
            <p style={{ fontSize: 18, ...MUTED, margin: "20px 0 0", maxWidth: "40ch" }}>Have a product to build or a role to fill? Send a short brief — I reply within a day.</p>
            <button type="button" onClick={copyEmail} style={{ fontFamily: "inherit", marginTop: 28, display: "inline-flex", alignItems: "center", gap: 12, fontWeight: 500, fontSize: 18, color: "var(--fg)", background: "transparent", border: 0, borderBottom: "1px solid var(--fg)", padding: "0 0 4px", cursor: "pointer" }}>{copied ? "Copied ✓" : EMAIL + " ⧉"}</button>
          </div>
          {!sent ? (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <input value={form.name} onChange={setField("name")} required placeholder="Your name" aria-label="Name" className="line-input" style={lineInput} />
              <input type="email" value={form.email} onChange={setField("email")} required placeholder="Email" aria-label="Email" className="line-input" style={lineInput} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {NEEDS.map((n) => {
                  const on = needs.includes(n);
                  return <button key={n} type="button" onClick={() => setNeeds((s) => (on ? s.filter((x) => x !== n) : [...s, n]))} style={{ ...pill(tone(on)), fontSize: 15, padding: "8px 16px", flex: undefined, whiteSpace: undefined }}>{n}</button>;
                })}
              </div>
              <textarea value={form.msg} onChange={setField("msg")} rows={3} placeholder="Tell me about the project" aria-label="Message" className="line-input" style={{ ...lineInput, resize: "vertical" }} />
              {sendError && (
                <p role="alert" style={{ fontSize: 15, margin: 0, ...MUTED }}>
                  Couldn’t send that. <a href={mailtoHref()} style={{ textDecoration: "underline" }}>Open it in your mail app</a> or email {EMAIL}.
                </p>
              )}
              <button type="submit" disabled={sending} className="grow" style={{ opacity: sending ? 0.6 : 1, alignSelf: "flex-start", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 12, fontWeight: 500, fontSize: 16, color: "var(--bg)", background: "var(--fg)", border: 0, borderRadius: 999, padding: "16px 32px", cursor: "pointer", transition: "transform .3s ease" }}>{sending ? "Sending…" : "Send brief"} <span>↗</span></button>
            </form>
          ) : (
            <div>
              <div className="clash" style={{ fontWeight: 600, fontSize: 36, lineHeight: 1.15 }}>Thanks, {(form.name || "friend").split(" ")[0]} {CONTACT_ENDPOINT ? "— got it. I’ll reply within a day." : "— your mail app has the brief ready."}</div>
              <button type="button" onClick={() => { setSent(false); setForm({ name: "", email: "", msg: "" }); setNeeds([]); }} style={{ fontFamily: "inherit", marginTop: 20, fontWeight: 500, fontSize: 15, color: "var(--fg)", background: "transparent", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }}>Write another</button>
            </div>
          )}
        </section>
      </main>

      <footer style={{ maxWidth: 1400, margin: "0 auto", padding: `clamp(120px,16vw,220px) ${PAD} 40px` }}>
        <div style={{ fontSize: 16 }}>Need more information about me? Here’s my <a href={RESUME} target="_blank" rel="noopener" style={MUTED}>↗ Résumé</a></div>
        <div className="clash" style={{ fontWeight: 500, fontSize: "clamp(40px,6vw,80px)", lineHeight: 1.2, ...MUTED, marginTop: "clamp(48px,8vw,96px)" }}>GitHub:</div>
        <a href={GITHUB} target="_blank" rel="noopener" className="clash gh" style={{ display: "inline-block", fontWeight: 500, fontSize: "clamp(40px,6vw,80px)", lineHeight: 1.2, color: "var(--fg)", textDecoration: "none", transition: "letter-spacing .3s ease" }}>@harshjha047</a>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 64, fontSize: 13, ...MUTED }}>
          <span>© {new Date().getFullYear()} Harsh Jha</span>
          <span style={{ display: "flex", gap: 20 }}>
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
            <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
          </span>
          <span>Noida, India · <Clock /> IST</span>
        </div>
      </footer>

      {cs && (
        <div ref={dialog} data-lenis-prevent role="dialog" aria-modal="true" aria-label={cs.title} style={{ position: "fixed", inset: 0, zIndex: 60, background: "var(--bg)", color: "var(--fg)", overflow: "auto" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--bg)" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: `18px ${PAD}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <button type="button" onClick={closeCase} className="ring-hover" style={{ fontFamily: "inherit", fontWeight: 500, fontSize: 15, color: "var(--fg)", background: "transparent", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }}>← Back</button>
              <span style={{ fontSize: 14, ...MUTED }}>{String(csIdx + 1).padStart(2, "0")} / {String(seq.length).padStart(2, "0")}</span>
              <button type="button" onClick={nextCase} style={{ fontFamily: "inherit", fontWeight: 500, fontSize: 15, color: "var(--bg)", background: "var(--fg)", border: 0, borderRadius: 999, padding: "9px 18px", cursor: "pointer" }}>Next →</button>
            </div>
          </div>
          <article style={{ maxWidth: 1400, margin: "0 auto", padding: `clamp(40px,7vw,96px) ${PAD} 96px` }}>
            <div style={{ fontWeight: 500, fontSize: 15, ...MUTED }}>{cs.year} | {cs.kind}</div>
            <h1 className="clash" style={{ fontWeight: 600, fontSize: "clamp(44px,7.6vw,112px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: "12px 0 0", maxWidth: "14ch" }}>{cs.title}</h1>
            <p style={{ fontSize: "clamp(19px,1.8vw,24px)", lineHeight: 1.45, maxWidth: "46ch", margin: "24px 0 0" }}>{cs.summary}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>{cs.tags.map((x) => <span key={x} style={{ ...tag, fontSize: 14 }}>{x}</span>)}</div>
            <div style={{ marginTop: 48, aspectRatio: "16/8", width: "100%", borderRadius: 28, overflow: "hidden", position: "relative", background: "repeating-linear-gradient(135deg,#efefef 0 10px,#e6e6e6 10px 20px)" }}>
              <CaseImage key={cs.id} cs={cs} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "40px 64px", marginTop: 64 }}>
              {cs.problem && <div><div style={{ fontWeight: 500, fontSize: 14, ...MUTED, marginBottom: 12 }}>The problem</div><p style={{ fontSize: 18, lineHeight: 1.6, margin: 0 }}>{cs.problem}</p></div>}
              {cs.points.length > 0 && (
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, ...MUTED, marginBottom: 12 }}>What I built</div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {cs.points.map((pt) => <li key={pt} style={{ display: "flex", gap: 12, fontSize: 17 }}><span style={{ flex: "none", ...MUTED }}>↳</span><span>{pt}</span></li>)}
                  </ul>
                </div>
              )}
              {cs.outcome && <div><div style={{ fontWeight: 500, fontSize: 14, ...MUTED, marginBottom: 12 }}>Outcome</div><p className="clash" style={{ fontWeight: 600, fontSize: 32, lineHeight: 1.15, margin: 0 }}>{cs.outcome}</p></div>}
            </div>
            <div style={{ marginTop: 56, fontSize: 15, ...MUTED }}>{cs.stack}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {[["live", "Live site"], ["github", "GitHub"], ["play", "Google Play"], ["ios", "App Store"], ["ms", "Microsoft Store"]].filter(([k]) => cs[k]).map(([k, label]) => (
                <a key={k} href={cs[k]} target="_blank" rel="noopener" className="case-link" style={caseLink}>{label} ↗</a>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
              <button type="button" onClick={() => { closeCase(); setTimeout(() => scrollToId("contact"), 120); }} style={{ fontFamily: "inherit", fontWeight: 500, fontSize: 16, color: "var(--bg)", background: "var(--fg)", border: 0, borderRadius: 999, padding: "16px 28px", cursor: "pointer" }}>Build something like this ↗</button>
              {next && <button type="button" onClick={nextCase} style={{ fontFamily: "inherit", fontWeight: 500, fontSize: 16, color: "var(--fg)", background: "transparent", border: "1px solid var(--line)", borderRadius: 999, padding: "16px 28px", cursor: "pointer" }}>Next: {next.title}</button>}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

