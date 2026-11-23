/*
  "Design crew": a few named cursors that draw each `.rv` block as it scrolls into view —
  fly to its top-left corner, drag a selection box to the bottom-right, then let the block resolve.
  Pure DOM work (Web Animations API), so React never re-renders because of it.
  Skipped entirely for reduced-motion visitors: blocks just appear.
*/

const CREW = [
  ["Harsh", "#3b6cff"],
  ["Layout", "#e8590c"],
  ["Type", "#2f9e44"],
  ["Motion", "#ae3ec9"],
];
const EASE = "cubic-bezier(.65,0,.35,1)";
const MAX_QUEUE = 14;

const arrow = (c) =>
  `<svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true"><path d="M1 1l15 8.2-6.6 1.6L6.4 18z" fill="${c}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

export function initCrew(root) {
  if (!root || typeof window === "undefined") return () => {};
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const seen = new WeakSet();
  const timers = new Set();
  const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };

  const show = (el) => { el.classList.remove("draft"); el.classList.add("in"); };

  // reduced motion (or no IntersectionObserver): no crew, everything simply visible
  if (reduce || typeof IntersectionObserver === "undefined") {
    const revealAll = () => root.querySelectorAll(".rv:not(.in)").forEach(show);
    revealAll();
    const mo = new MutationObserver(revealAll);
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }

  const layer = document.createElement("div");
  layer.className = "crew-layer";
  layer.setAttribute("aria-hidden", "true");
  root.appendChild(layer);

  const crew = CREW.map(([name, color]) => {
    const el = document.createElement("div");
    el.className = "crew-cur";
    el.innerHTML = `${arrow(color)}<span style="background:${color}">${name}</span>`;
    layer.appendChild(el);
    return { el, color, busy: false, shown: false, x: 0, y: 0, hide: null };
  });
  const queue = [];

  const nextInView = () => {
    while (queue.length) {
      const el = queue.shift();
      if (!el.isConnected) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) { show(el); continue; }
      return el;
    }
    return null;
  };

  const pump = () => {
    for (const c of crew) {
      if (c.busy) continue;
      const el = nextInView();
      if (!el) return;
      build(c, el);
    }
  };

  const build = (c, el) => {
    c.busy = true;
    clearTimeout(c.hide);
    const base = root.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // measure where the block will end up, not where its rise-in transform has it right now
    const tf = getComputedStyle(el).transform;
    const m = tf && tf !== "none" && typeof DOMMatrixReadOnly !== "undefined" ? new DOMMatrixReadOnly(tf) : null;
    const pad = 6;
    const x = r.left - (m ? m.m41 : 0) - base.left - pad;
    const y = r.top - (m ? m.m42 : 0) - base.top - pad;
    const w = r.width + pad * 2, h = r.height + pad * 2;
    const wasShown = c.shown;
    const fx = wasShown ? c.x : x - 60 - Math.random() * 80;
    const fy = wasShown ? c.y : y + Math.min(h, 160) + 40 + Math.random() * 60;
    c.el.style.opacity = "1";
    c.shown = true;

    const fly = c.el.animate(
      [{ transform: `translate(${fx}px,${fy}px)` }, { transform: `translate(${x}px,${y}px)` }],
      { duration: 380, delay: wasShown ? 0 : Math.random() * 220, easing: EASE, fill: "forwards" }
    );
    fly.onfinish = () => {
      const box = document.createElement("div");
      box.className = "crew-box";
      box.style.cssText = `left:${x}px;top:${y}px;border-color:${c.color};background:${c.color}12`;
      const size = document.createElement("span");
      size.style.background = c.color;
      size.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      box.appendChild(size);
      layer.appendChild(box);
      el.classList.add("draft");

      const dur = 560;
      box.animate([{ width: "0px", height: "0px" }, { width: w + "px", height: h + "px" }], { duration: dur, easing: EASE, fill: "forwards" });
      const drag = c.el.animate(
        [{ transform: `translate(${x}px,${y}px)` }, { transform: `translate(${x + w}px,${y + h}px)` }],
        { duration: dur, easing: EASE, fill: "forwards" }
      );
      drag.onfinish = () => {
        c.x = x + w; c.y = y + h;
        show(el);
        box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 180, fill: "forwards" }).onfinish = () => box.remove();
        c.busy = false;
        c.hide = later(() => { if (!c.busy) { c.el.style.opacity = "0"; c.shown = false; } }, 1400);
        pump();
      };
    };
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      if (queue.length >= MAX_QUEUE) show(e.target); // scrolled fast: don't make anyone wait
      else queue.push(e.target);
    });
    pump();
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  const scan = () => root.querySelectorAll(".rv").forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    io.observe(el);
  });
  scan();
  // blocks that mount later (e.g. the archive) get picked up too
  const mo = new MutationObserver(scan);
  mo.observe(root, { childList: true, subtree: true });

  return () => {
    io.disconnect();
    mo.disconnect();
    timers.forEach(clearTimeout);
    crew.forEach((c) => clearTimeout(c.hide));
    layer.remove();
  };
}
