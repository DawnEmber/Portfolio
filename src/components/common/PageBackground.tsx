import { useEffect, useRef, useState } from 'react';
import kolam1 from '../../assets/images/Kolam 1.png';
import kolam2 from '../../assets/images/Kolam 2.png';
import kolam3 from '../../assets/images/Kolam 3.png';
import kolam4 from '../../assets/images/Kolam 4.png';

const C = '#E6C8AC';
const F = "'Noto Sans Tamil', sans-serif";

/* Elements spread across the full viewport, radiating from centre outward.
   data-depth drives parallax: higher = moves more on scroll (closer to viewer).
   Centre elements are hidden behind the dark card (zIndex 3); only cream-area
   elements remain visible, giving the "spreading out from card" feel. */

const items = [
  // Centre cluster — hidden behind card, but give the spread feeling
  { type:'letter', char:'அ',  size:180, opacity:0.18, top:'8%',  left:'42%', depth:0.06 },
  { type:'kolam',  src:kolam1, size:48,  opacity:0.20, top:'15%', left:'55%', depth:0.10 },
  { type:'letter', char:'ழ',  size:90,  opacity:0.14, top:'28%', left:'38%', depth:0.04 },
  { type:'kolam',  src:kolam3, size:36,  opacity:0.18, top:'40%', left:'60%', depth:0.08 },
  { type:'letter', char:'இ',  size:120, opacity:0.14, top:'52%', left:'44%', depth:0.06 },
  { type:'kolam',  src:kolam2, size:52,  opacity:0.16, top:'65%', left:'52%', depth:0.10 },
  { type:'letter', char:'ம',  size:80,  opacity:0.14, top:'78%', left:'40%', depth:0.05 },
  { type:'kolam',  src:kolam4, size:30,  opacity:0.18, top:'88%', left:'58%', depth:0.08 },

  // Mid-left — transitioning from centre to gutter
  { type:'letter', char:'க',  size:110, opacity:0.28, top:'12%', left:'22%', depth:0.12 },
  { type:'kolam',  src:kolam4, size:32,  opacity:0.32, top:'23%', left:'28%', depth:0.18 },
  { type:'letter', char:'ந',  size:72,  opacity:0.26, top:'38%', left:'18%', depth:0.14 },
  { type:'kolam',  src:kolam2, size:44,  opacity:0.30, top:'50%', left:'25%', depth:0.20 },
  { type:'letter', char:'ப',  size:88,  opacity:0.24, top:'65%', left:'20%', depth:0.10 },
  { type:'kolam',  src:kolam1, size:36,  opacity:0.28, top:'80%', left:'27%', depth:0.16 },

  // Mid-right
  { type:'kolam',  src:kolam3, size:40,  opacity:0.30, top:'10%', left:'72%', depth:0.14 },
  { type:'letter', char:'ண',  size:100, opacity:0.26, top:'22%', left:'76%', depth:0.12 },
  { type:'kolam',  src:kolam1, size:28,  opacity:0.28, top:'36%', left:'70%', depth:0.18 },
  { type:'letter', char:'ற',  size:78,  opacity:0.24, top:'50%', left:'74%', depth:0.16 },
  { type:'kolam',  src:kolam4, size:46,  opacity:0.32, top:'64%', left:'72%', depth:0.22 },
  { type:'letter', char:'ன',  size:64,  opacity:0.22, top:'78%', left:'76%', depth:0.12 },

  // Far left gutter — large anchor + small accents
  { type:'letter', char:'அ',  size:210, opacity:0.52, top:'3%',  left:'-1vw', depth:0.26 },
  { type:'kolam',  src:kolam3, size:28,  opacity:0.42, top:'22%', left:'1vw',  depth:0.30 },
  { type:'letter', char:'க',  size:52,  opacity:0.38, top:'33%', left:'0.5vw',depth:0.20 },
  { type:'kolam',  src:kolam1, size:44,  opacity:0.44, top:'46%', left:'0.8vw',depth:0.34 },
  { type:'letter', char:'ம',  size:44,  opacity:0.35, top:'60%', left:'0.3vw',depth:0.22 },
  { type:'kolam',  src:kolam2, size:22,  opacity:0.36, top:'74%', left:'3vw',  depth:0.28 },
  { type:'letter', char:'ன',  size:36,  opacity:0.30, top:'86%', left:'1vw',  depth:0.18 },
  { type:'kolam',  src:kolam4, size:34,  opacity:0.38, top:'93%', left:'0.5vw',depth:0.26 },

  // Far right gutter
  { type:'letter', char:'ழ',  size:210, opacity:0.52, top:'3%',  right:'-1vw', depth:0.26 },
  { type:'kolam',  src:kolam2, size:36,  opacity:0.40, top:'20%', right:'1.2vw',depth:0.30 },
  { type:'letter', char:'இ',  size:48,  opacity:0.36, top:'31%', right:'0.5vw',depth:0.20 },
  { type:'kolam',  src:kolam4, size:22,  opacity:0.36, top:'43%', right:'4vw', depth:0.32 },
  { type:'letter', char:'ண',  size:42,  opacity:0.35, top:'54%', right:'0.3vw',depth:0.22 },
  { type:'kolam',  src:kolam1, size:48,  opacity:0.42, top:'65%', right:'0.8vw',depth:0.28 },
  { type:'letter', char:'ற',  size:38,  opacity:0.30, top:'78%', right:'0.5vw',depth:0.18 },
  { type:'kolam',  src:kolam3, size:28,  opacity:0.38, top:'90%', right:'1.5vw',depth:0.24 },
] as const;

export default function PageBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    /* Tamil glyphs render as blank tofu boxes in fallback fonts — wait for
       the actual Noto Sans Tamil webfont before showing letters, to avoid
       giant blank shapes flashing on the cream background before it loads. */
    document.fonts.load(`210px "Noto Sans Tamil"`)
      .then(() => setFontReady(true))
      .catch(() => setFontReady(true));
  }, []);

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      const y = window.scrollY || 0;
      containerRef.current?.querySelectorAll<HTMLElement>('[data-depth]').forEach(el => {
        const d = parseFloat(el.getAttribute('data-depth') || '0');
        el.style.transform = `translate3d(0, ${(y * d).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes dawnShake {
          0%,100%{ transform:translate(0,0) rotate(0deg); }
          20%{ transform:translate(-3px,2px) rotate(-8deg); }
          40%{ transform:translate(3px,-2px) rotate(7deg); }
          60%{ transform:translate(-2px,3px) rotate(-6deg); }
          80%{ transform:translate(2px,-1px) rotate(5deg); }
        }
        @keyframes dawnSpin { to { transform: rotate(360deg); } }
        .bg-letter:hover { color: #AD4F2E !important; opacity: 1 !important; animation: dawnShake 0.45s ease-in-out infinite; }
        .bg-kolam:hover { animation: dawnSpin 3s linear infinite; }
      `}</style>

      <div ref={containerRef} aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden',
      }}>
        {items.map((item, i) => {
          const pos: React.CSSProperties = {
            position: 'absolute',
            top: item.top,
            left: 'left' in item ? item.left as string : undefined,
            right: 'right' in item ? item.right as string : undefined,
          };
          if (item.type === 'letter') {
            if (!fontReady) return null;
            return (
              <span
                key={i}
                data-depth={item.depth}
                className="bg-letter"
                style={{
                  ...pos,
                  fontFamily: F,
                  fontSize: item.size,
                  lineHeight: 1,
                  color: C,
                  opacity: item.opacity,
                  userSelect: 'none',
                  pointerEvents: 'auto',
                  cursor: 'default',
                  transition: 'color .2s',
                  willChange: 'transform',
                }}
              >{item.char}</span>
            );
          }
          return (
            <div
              key={i}
              data-depth={item.depth}
              className="bg-kolam"
              style={{
                ...pos,
                transformOrigin: '50% 50%',
                pointerEvents: 'auto',
                cursor: 'default',
                willChange: 'transform',
              }}
            >
              <img src={item.src} alt="" style={{ width: item.size, height: item.size, objectFit: 'contain', opacity: item.opacity, display: 'block' }} />
            </div>
          );
        })}
      </div>
    </>
  );
}
