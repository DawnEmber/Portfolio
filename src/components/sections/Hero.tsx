import kolam1 from '../../assets/images/Kolam 1.png';
import kolam2 from '../../assets/images/Kolam 2.png';
import { Reveal } from '../common/Reveal';
import { DrawLine } from '../common/TornPaperCard';

const orange = '#AD4F2E';

const DotGrid = ({ top, right, bottom, left, color, cols, rows, gap }: {
  top?: string; right?: string; bottom?: string; left?: string;
  color: string; cols: number; rows: number; gap: number;
}) => {
  const w = (cols - 1) * gap + 4, h = (rows - 1) * gap + 4;
  const dots = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++)
    dots.push(<circle key={`${i}_${j}`} cx={2 + i * gap} cy={2 + j * gap} r={1.3} fill={color} />);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', top, right, bottom, left }}>
      {dots}
    </svg>
  );
};

const Crosshair = ({ top, left, w, h }: { top: string; left: string; w: number; h: number }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="rgba(173,79,46,0.35)" strokeWidth={1} style={{ position: 'absolute', top, left }}>
    <line x1={0} y1={h * 0.62} x2={w * 0.72} y2={h * 0.62} />
    <line x1={w * 0.28} y1={0} x2={w * 0.28} y2={h} />
    <circle cx={w * 0.28} cy={h * 0.62} r={2.4} fill="rgba(173,79,46,0.55)" stroke="none" />
  </svg>
);

const Plus = ({ top, right, bottom, left }: { top?: string; right?: string; bottom?: string; left?: string }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" stroke="rgba(242,235,222,0.3)" strokeWidth={1.2} style={{ position: 'absolute', top, right, bottom, left }}>
    <path d="M8 2 V14 M2 8 H14" />
  </svg>
);

export default function Hero() {
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', padding: '10px clamp(28px,5cqw,60px) 74px' }}>
      {/* Watermark decoration */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <span style={{ position: 'absolute', fontFamily: "'Noto Sans Tamil',serif", fontSize: 150, lineHeight: 1, color: '#F8ECE0', opacity: 0.05, top: '6%', left: '7%' }}>ழ</span>
        <span style={{ position: 'absolute', fontFamily: "'Noto Sans Tamil',serif", fontSize: 140, lineHeight: 1, color: '#F8ECE0', opacity: 0.05, bottom: '4%', right: '9%' }}>அ</span>
        <span style={{ position: 'absolute', fontFamily: "'Noto Sans Tamil',serif", fontSize: 96, lineHeight: 1, color: '#F8ECE0', opacity: 0.04, top: '30%', right: '6%' }}>ஃ</span>
        <span style={{ position: 'absolute', fontFamily: "'Noto Sans Tamil',serif", fontSize: 92, lineHeight: 1, color: '#F8ECE0', opacity: 0.04, bottom: '8%', left: '11%' }}>இ</span>
        <DotGrid top="14%" right="17%" color="rgba(242,235,222,0.16)" cols={7} rows={5} gap={13} />
        <DotGrid bottom="18%" left="15%" color="rgba(173,79,46,0.3)" cols={6} rows={4} gap={13} />
        <div style={{ position: 'absolute', top: '7%', left: '41%' }}>
          <img src={kolam1} alt="" style={{ width: 128, height: 128, objectFit: 'contain', opacity: 0.5, filter: 'sepia(1) saturate(3) hue-rotate(-15deg) brightness(0.7)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '6%', left: '23%' }}>
          <img src={kolam2} alt="" style={{ width: 86, height: 86, objectFit: 'contain', opacity: 0.42, filter: 'sepia(1) saturate(3) hue-rotate(-15deg) brightness(0.7)' }} />
        </div>
        <div style={{ position: 'absolute', top: '40%', right: '20%' }}>
          <img src={kolam1} alt="" style={{ width: 64, height: 64, objectFit: 'contain', opacity: 0.4, filter: 'sepia(0.5) saturate(0.8)' }} />
        </div>
        <Crosshair top="18%" left="13%" w={150} h={110} />
        <Plus top="12%" right="26%" />
        <Plus bottom="26%" right="14%" />
      </div>

      {/* Content */}
      <Reveal style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: 'clamp(10px,2.6vw,13px)', letterSpacing: '0.28em', color: orange, textTransform: 'uppercase', marginBottom: 'clamp(14px,4vw,28px)' }}>
          Design&nbsp;&nbsp;•&nbsp;&nbsp;Develop&nbsp;&nbsp;•&nbsp;&nbsp;Deliver
        </div>

        <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 'clamp(38px,5.5vw,64px)', lineHeight: 1.03, letterSpacing: '-0.02em', color: '#F8ECE0', margin: 0, textAlign: 'center' }}>
          We craft<br />
          digital products<br />
          <em style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontStyle: 'italic', color: orange, letterSpacing: 0 }}>that people</em><br />
          love to use<span style={{ color: orange }}>.</span>
        </h1>

        <p style={{ maxWidth: 470, fontSize: 17, lineHeight: 1.7, color: '#D4B99A', margin: '30px auto 34px', textAlign: 'center' }}>
          A design &amp; development studio from Coimbatore. We help ambitious brands and startups build meaningful digital experiences.
        </p>

        <a href="#work" className="dn-hero-cta" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: 'clamp(14px,3vw,18px) clamp(24px,6vw,44px)', whiteSpace: 'nowrap' }}>
          {/* Hand-drawn sketch outline — hidden by default, sketches in on hover.
              Transparent fill (not solid) + wobbly deRough border = pencil-sketch look. */}
          <span className="dn-hero-cta-bg" style={{
            position: 'absolute', inset: 0, borderRadius: 999,
            border: `2px solid ${orange}`, background: 'transparent',
            filter: 'url(#deRough)', opacity: 0, transform: 'scale(0.94)',
            transition: 'opacity .3s ease, transform .3s ease', pointerEvents: 'none',
          }} />
          {/* Text block stays perfectly centred — the diagonal hover arrow is
              a separate absolute overlay, never part of this flex flow. */}
          <span style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <span className="dn-hero-cta-label" style={{ fontWeight: 600, fontSize: 'clamp(11px,2.6vw,13px)', letterSpacing: '0.22em', color: '#F8ECE0', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Explore our work</span>
              {/* Persistent down-chevron — a "there's more below" cue shown
                  at every breakpoint, unlike the hover-only diagonal arrow.
                  Run through the deInk displacement filter so it reads as a
                  hand-drawn stroke like the underline and section rules. */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="5 9 12 16 19 9" filter="url(#deInk)" />
              </svg>
            </span>
            <DrawLine className="dn-hero-cta-underline" color="rgba(173,79,46,0.95)" style={{ width: '100%', transition: 'opacity .25s ease' }} />
          </span>
          <svg className="dn-hero-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', right: 20, top: '50%', opacity: 0, transform: 'translate(-6px,-50%)', transition: 'opacity .3s ease, transform .3s ease' }}>
            <line x1="7" y1="17" x2="17" y2="7" filter="url(#deInk)" /><polyline points="8 7 17 7 17 16" filter="url(#deInk)" />
          </svg>
        </a>
        <style>{`
          .dn-hero-cta:hover .dn-hero-cta-bg { opacity: 1; transform: scale(1); }
          .dn-hero-cta:hover .dn-hero-cta-underline { opacity: 0; }
          .dn-hero-cta:hover .dn-hero-cta-arrow { opacity: 1; transform: translate(0,-50%); }
        `}</style>
      </Reveal>
    </section>
  );
}
