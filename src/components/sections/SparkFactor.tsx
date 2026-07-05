import { useEffect, useRef, useState } from 'react';

const orange = '#AD4F2E';
const pad = 'clamp(28px,5cqw,60px)';
const LEAF = '#D7C08E';       // aged palm-leaf tan
const LEAF_DARK = '#B4945D';  // deeper weathered brown

const items: [string, string][] = [
  ['01', 'One designer, one developer — no game of telephone between idea and pixel.'],
  ['02', "A two-person studio, so you're always talking straight to the makers."],
  ['03', "We're genuinely into this craft — it shows in the details."],
  ['04', 'A millennial eye and a Gen Z instinct, working off the same spark.'],
  ['05', 'Startup and AI-product scars — we build for what comes next.'],
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

/* Live scroll → 0‥1 progress. Scrubs both ways: scroll down to stack the leaves
   one by one, scroll back up and the pile unwinds to leaf 01. */
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
        setProgress(clamp01(p));
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

/* Respect the OS "reduce motion" setting — swap the scroll-jacked scene for a
   plain, all-leaves-visible static list. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* One palm-leaf panel. The rough (deRough) filter lives on the background layer
   ALONE, so it can never reach and warp the number/text. `big` switches to the
   full-viewport editorial layout used in the pinned scene. */
function LeafCard({ num, text, elevated, scrim = 0, big = false }: { num: string; text: string; elevated: boolean; scrim?: number; big?: boolean }) {
  const br = big ? 14 : 10;
  return (
    <div style={{
      position: 'relative', height: '100%', display: 'flex', alignItems: 'center',
      gap: big ? 'clamp(20px,3vw,44px)' : 22,
      padding: big ? '0 clamp(28px,5%,60px) 0 clamp(58px,8%,104px)' : '0 38px 0 64px',
    }}>
      {/* Aged palm-leaf body — rough torn edge (deRough) lives on this layer alone */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: br,
        background: `linear-gradient(177deg, ${LEAF} 0%, #C7AC77 52%, ${LEAF_DARK} 100%)`,
        boxShadow: elevated ? '0 26px 50px -18px rgba(0,0,0,0.62)' : '0 9px 20px -12px rgba(0,0,0,0.4)',
        filter: 'url(#deRough)',
      }} />
      {/* Horizontal fibre grain — palm leaves run lengthwise */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: br, backgroundImage: 'repeating-linear-gradient(0deg, rgba(70,45,14,0.09) 0px, rgba(70,45,14,0.09) 1px, transparent 1.5px, transparent 4px)', pointerEvents: 'none' }} />
      {/* Aged mottling / foxing blotches */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: br, mixBlendMode: 'multiply', backgroundImage: 'radial-gradient(ellipse 42% 36% at 15% 26%, rgba(96,60,20,0.18), transparent 60%), radial-gradient(ellipse 38% 28% at 82% 70%, rgba(96,60,20,0.16), transparent 60%), radial-gradient(ellipse 30% 42% at 55% 82%, rgba(120,86,44,0.14), transparent 58%), radial-gradient(ellipse 24% 30% at 64% 16%, rgba(80,50,16,0.12), transparent 60%), radial-gradient(circle 3px at 38% 44%, rgba(72,44,14,0.4), transparent), radial-gradient(circle 2px at 70% 52%, rgba(72,44,14,0.35), transparent)', pointerEvents: 'none' }} />
      {/* Worn darker ends + weathered edge vignette */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: br, background: 'linear-gradient(90deg, rgba(54,32,8,0.34), transparent 8%, transparent 92%, rgba(54,32,8,0.34))', boxShadow: 'inset 0 0 30px rgba(54,32,8,0.4), inset 0 1px 1px rgba(255,244,214,0.35)', pointerEvents: 'none' }} />
      {/* Binding hole, with an aged darkened ring */}
      <div style={{ position: 'absolute', left: big ? 30 : 26, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, borderRadius: '50%', background: '#191510', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.75), 0 0 0 2px rgba(56,34,10,0.4)' }} />
      {/* Inscribed ink — number + line */}
      <div style={{ position: 'relative', fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: big ? 'clamp(44px,6.5vw,84px)' : 38, color: 'rgba(48,29,10,0.88)', lineHeight: 0.9, flex: '0 0 auto' }}>{num}</div>
      <div style={{ position: 'relative', fontSize: big ? 'clamp(17px,2.1vw,24px)' : 16, lineHeight: 1.4, color: '#301d0a', fontWeight: 500, maxWidth: big ? '24ch' : undefined }}>{text}</div>
      {/* Depth scrim — darkens leaves as they sink into the pile */}
      {scrim > 0 && <div style={{ position: 'absolute', inset: 0, borderRadius: br, background: `rgba(22,13,4,${scrim})`, pointerEvents: 'none' }} />}
    </div>
  );
}

function SceneHeader({ activeIdx, showProgress }: { activeIdx: number; showProgress: boolean }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', padding: `0 ${pad}`, flex: '0 0 auto' }}>
      <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.26em', color: orange, textTransform: 'uppercase' }}>Why work with us</div>
      <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 'clamp(24px,3vw,32px)', color: '#F8ECE0', margin: '10px 0 0', letterSpacing: '-0.01em' }}>
        The dawn ember{' '}
        <em style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontWeight: 500, color: orange }}>difference.</em>
      </h2>
      {showProgress && (
        <div role="presentation" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
          {items.map(([num], k) => (
            <span key={num} style={{
              width: k === activeIdx ? 24 : 8, height: 8, borderRadius: 99,
              background: k <= activeIdx ? orange : 'rgba(230,200,172,0.28)',
              transition: 'width .3s ease, background-color .3s ease',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

const ENTER = 120;    // px a fresh leaf starts below its resting spot
const STACK_Y = 10;   // px each buried leaf rises so its edge peeks out
const STACK_S = 0.03; // scale each buried leaf shrinks per depth

export default function SparkFactor() {
  const { ref, progress } = usePinnedProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const n = items.length;
  const head = progress * (n - 1);
  const activeIdx = Math.max(0, Math.min(n - 1, Math.round(head)));

  // Reduced-motion / accessible fallback: a plain bound stack, all leaves shown.
  if (reduced) {
    return (
      <section style={{ padding: `44px ${pad} 8px` }}>
        <SceneHeader activeIdx={n - 1} showProgress={false} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '30px auto 0' }}>
          <div style={{ position: 'absolute', left: 34, top: 12, bottom: 12, width: 2, background: 'linear-gradient(180deg, transparent, rgba(230,200,172,0.5) 6%, rgba(230,200,172,0.5) 94%, transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(([num, text]) => (
              <div key={num} style={{ position: 'relative', height: 106 }}>
                <LeafCard num={num} text={text} elevated />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* Scroll track — its extra height is the scroll distance the reveal spans. */}
      <div ref={ref} style={{ position: 'relative', height: `${n * 40}vh` }}>
        {/* Pinned scene fills the whole viewport: header on top, and a big leaf
            panel area that grows to fill the rest — so the dark background is
            reduced to thin margins instead of a big empty gap. */}
        <div style={{ position: 'sticky', top: 0, height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(46px,7vh,80px)', padding: 'clamp(22px,4vh,44px) 0', overflow: 'hidden' }}>
          <SceneHeader activeIdx={activeIdx} showProgress />

          {/* Big palm-leaf panels — each lands on the pile as you scroll.
              Height is capped so the leaf never blows up into a giant empty
              panel on tall/narrow viewports; the whole header+leaf group is
              centred by the sticky column, so margins stay balanced. */}
          <div style={{ position: 'relative', flex: '0 0 auto', height: 'min(36vh, 270px)', width: '100%', maxWidth: 1000, margin: '0 auto' }}>
            {items.map(([num, text], i) => {
              const rel = head - i;
              let y: number, s: number, o: number, scrim: number;
              if (rel <= 0) {
                const t = smooth(clamp01(-rel));
                y = ENTER * t; s = 1; o = 1 - t; scrim = 0;
              } else {
                const d = Math.min(rel, n - 1);
                y = -STACK_Y * d; s = 1 - STACK_S * d; o = 1; scrim = (d / (n - 1)) * 0.34;
              }
              return (
                <div
                  key={num}
                  style={{
                    position: 'absolute', top: 6, bottom: 6, left: pad, right: pad,
                    transform: `translateY(${y.toFixed(1)}px) scale(${s.toFixed(3)})`,
                    transformOrigin: '50% 50%',
                    opacity: o,
                    zIndex: i,
                    willChange: 'transform, opacity',
                    // Eases the discrete mouse-wheel scroll steps into fluid
                    // motion so the leaf-to-leaf reveal glides instead of snapping.
                    transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease-out',
                  }}
                >
                  <LeafCard num={num} text={text} elevated={rel < 1} scrim={scrim} big />
                </div>
              );
            })}
            {/* Binding cord threading down through the leaves' holes */}
            <div style={{ position: 'absolute', left: `calc(${pad} + 37px)`, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, transparent, rgba(230,200,172,0.5) 14%, rgba(230,200,172,0.5) 86%, transparent)', zIndex: n + 3 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
