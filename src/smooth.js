import Lenis from "lenis";

/* One shared Lenis instance. Skipped entirely for visitors who ask for reduced motion. */
let lenis = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return () => {};
  // autoRaf drives its own loop; anchors handles in-page #links with the sticky-nav offset
  lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 } });
  return () => { lenis?.destroy(); lenis = null; };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72 });
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
