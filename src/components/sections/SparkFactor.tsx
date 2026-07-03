import { useEffect, useRef, useState } from 'react';

const orange = '#AD4F2E';
const pad = 'clamp(28px,5cqw,60px)';
const LEAF = '#D9BD8F';
const LEAF_DARK = '#C4A26C';

const items = [
  ['01', 'One designer, one developer — no game of telephone between idea and pixel.'],
  ['02', "A two-person studio, so you're always talking straight to the makers."],
  ['03', "We're genuinely into this craft — it shows in the details."],
  ['04', 'A millennial eye and a Gen Z instinct, working off the same spark.'],
  ['05', 'Startup and AI-product scars — we build for what comes next.'],
];

/* Scroll-pinned progress: 0 while the wrapper's top hasn't reached the
   viewport top, ramps 0→1 across the extra scroll distance the tall
   wrapper provides while its sticky child stays pinned, 1 once the
   wrapper's bottom clears the viewport. Same formula CSS scroll-timelines
   use under the hood, computed by hand so it works everywhere. */
function usePinnedProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? (-rect.top) / total : 0;
        setProgress(Math.min(1, Math.max(0, p)));
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

export default function SparkFactor() {
  const { ref, progress } = usePinnedProgress<HTMLDivElement>();
  const n = items.length;

  return (
    <section style={{ padding: `40px ${pad} 0` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 28, color: '#F8ECE0', margin: 0 }}>
          The dawn ember{' '}
          <em style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontWeight: 500, color: orange }}>difference.</em>
        </h2>
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, rgba(230,200,172,0.5), rgba(230,200,172,0.15) 80%, transparent)', filter: 'url(#deInk)' }} />
      </div>

      {/* Tall scroll track — the sticky stage below stays pinned while the
          user scrolls through this, driving each leaf's reveal. */}
      <div ref={ref} style={{ position: 'relative', height: `${n * 62}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 640, margin: '0 auto', height: 260 }}>
            {/* Binding string threading through every leaf's hole */}
            <div style={{ position: 'absolute', left: 34, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, transparent, rgba(230,200,172,0.5) 8%, rgba(230,200,172,0.5) 92%, transparent)', zIndex: n + 2 }} />

            {items.map(([num, text], i) => {
              // This leaf's own 0→1 progress window within the overall scroll.
              const local = clamp01(progress * n - i);
              const eased = smooth(local);
              const isPast = local >= 1;
              return (
                <div
                  key={num}
                  style={{
                    position: 'absolute', inset: 0,
                    transform: `translateY(${(1 - eased) * 90}px) rotate(${(1 - eased) * -3.5}deg)`,
                    opacity: local === 0 ? 0 : 1,
                    transformOrigin: '34px 50%',
                    zIndex: i,
                    transition: 'transform .08s linear, opacity .15s linear',
                  }}
                >
                  <div style={{
                    position: 'relative', height: '100%', borderRadius: 10,
                    background: `linear-gradient(180deg, ${LEAF}, ${LEAF_DARK})`,
                    boxShadow: isPast
                      ? '0 18px 34px -14px rgba(0,0,0,0.55)'
                      : '0 10px 24px -12px rgba(0,0,0,0.4)',
                    filter: 'url(#deRough)',
                    display: 'flex', alignItems: 'center', gap: 24,
                    padding: '0 40px 0 64px',
                  }}>
                    {/* Fibre streaks — palm-leaf grain */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 10, backgroundImage: 'repeating-linear-gradient(90deg, rgba(90,60,20,0.08) 0px, transparent 2px, transparent 6px)', pointerEvents: 'none' }} />
                    {/* Binding hole */}
                    <div style={{ position: 'absolute', left: 26, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, borderRadius: '50%', background: '#191919', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)' }} />
                    <div style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 40, color: 'rgba(60,38,16,0.75)', lineHeight: 1, flex: '0 0 auto' }}>{num}</div>
                    <div style={{ fontSize: 16.5, lineHeight: 1.55, color: '#3a2610', fontWeight: 500, maxWidth: 460 }}>{text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
