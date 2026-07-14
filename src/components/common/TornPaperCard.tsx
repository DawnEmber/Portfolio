import type { ReactNode } from 'react';
import { useRevealOnScroll } from './Reveal';

/* Draws itself in when scrolled into view — a real SVG stroke animated via
   stroke-dashoffset (the "line completes on scroll" technique), rather than
   a static gradient/color div, so every rule on the page reads as freshly
   hand-drawn instead of simply appearing. Shared by every horizontal rule
   on the site (section dividers, the hero CTA underline, the About index
   rule, the Contact "let's talk" rule) so they all draw in consistently. */
export const DrawLine = ({ color = 'rgba(230,200,172,0.55)', height = 3, style, className }: {
  color?: string; height?: number; style?: React.CSSProperties; className?: string;
}) => {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>(0.6);
  return (
    <div ref={ref} className={className} style={{ height, ...style }}>
      <svg width="100%" height={height} viewBox={`0 0 200 ${height}`} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
        <line
          x1="3" y1={height / 2} x2="197" y2={height / 2}
          stroke={color} strokeWidth={height} strokeLinecap="round"
          vectorEffect="non-scaling-stroke" filter="url(#deInk)"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: visible ? 0 : 200,
            transition: 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)',
          }}
        />
      </svg>
    </div>
  );
};

export const InkDivider = ({ style }: { style?: React.CSSProperties }) => (
  <DrawLine style={style} />
);

export const InkDividerV = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{
    position: 'absolute', top: '16%', bottom: '16%', right: 0, width: 3, borderRadius: 2,
    background: 'linear-gradient(180deg,transparent,rgba(230,200,172,0.5) 10%,rgba(230,200,172,0.45) 90%,transparent)',
    filter: 'url(#deInkV)',
    ...style,
  }} />
);

export const RoughBorder = ({ radius = 14 }: { radius?: number }) => (
  <div style={{
    position: 'absolute', inset: 0, borderRadius: radius,
    border: '1.5px solid rgba(230,200,172,0.28)',
    filter: 'url(#deRough)', pointerEvents: 'none',
  }} />
);

const C = '#F8ECE0';

/* Cream overlay approach:
   A cream-coloured rect sits just OUTSIDE each card edge.
   The deTorn filter displaces it — cream pixels that land on the dark card
   create natural torn teeth. Cream pixels displaced away from card are invisible
   (same colour as background). Zero gray, zero bleed. */

const OVERLAP = 75; // px the cream rect overlaps into the card
/* Cross-axis inset for each torn strip — generous overlap at all four
   corners (rather than a thin -4px) so the top/bottom and left/right
   overlays always cover each other's corner regardless of viewport width. */
const CORNER = 100;
/* Belt-and-suspenders: fade each strip to transparent at its own cross-axis
   ends (via CSS mask, applied on top of the deTorn-displaced pixels) so a
   corner can never show a hard rectangular edge — only ever a soft taper —
   no matter how the turbulence displacement happens to land at that width. */
const fadeH = 'linear-gradient(90deg, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)';
const fadeV = 'linear-gradient(180deg, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)';

const TornTop = () => (
  <div aria-hidden style={{
    position:'absolute', top: -(OVERLAP), left:-CORNER, right:-CORNER, height: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible',
    WebkitMaskImage: fadeH, maskImage: fadeH,
  }}>
    <svg width="100%" height={OVERLAP + 30} style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="0" width="100%" height={OVERLAP} fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornBottom = () => (
  <div aria-hidden style={{
    position:'absolute', bottom: -(OVERLAP), left:-CORNER, right:-CORNER, height: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible',
    WebkitMaskImage: fadeH, maskImage: fadeH,
  }}>
    <svg width="100%" height={OVERLAP + 30} style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="30" width="100%" height={OVERLAP} fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornLeft = () => (
  <div aria-hidden style={{
    position:'absolute', top:-CORNER, bottom:-CORNER, left: -(OVERLAP), width: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible',
    WebkitMaskImage: fadeV, maskImage: fadeV,
  }}>
    <svg width={OVERLAP + 30} height="100%" style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="0" width={OVERLAP} height="100%" fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornRight = () => (
  <div aria-hidden style={{
    position:'absolute', top:-CORNER, bottom:-CORNER, right: -(OVERLAP), width: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible',
    WebkitMaskImage: fadeV, maskImage: fadeV,
  }}>
    <svg width={OVERLAP + 30} height="100%" style={{ display:'block', overflow:'visible' }}>
      <rect x="30" y="0" width={OVERLAP} height="100%" fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

export default function TornPaperCard({ children }: { children: ReactNode }) {
  return (
    <div style={{
      position: 'relative', width: '82vw', maxWidth: 1140, margin: '0 auto', zIndex: 3,
    }}>
      {/* Inner: overflow:clip clips grain/mottle — torn overlays are siblings
          outside. Must be `clip`, NOT `hidden`: `hidden` would make this a
          scroll container and silently break `position: sticky` in the
          sections below (SparkFactor's pinned horizontal scrollytelling). */}
      <div style={{ position: 'relative', overflow: 'clip', containerType: 'inline-size' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
        <div style={{ position: 'absolute', inset: 0, filter: 'url(#deGrain)', opacity: 0.44, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, filter: 'url(#deMottle)', opacity: 0.28, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.55)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>{children}</div>
      </div>

      {/* Cream torn edge overlays — organic, no gray */}
      <TornTop />
      <TornBottom />
      <TornLeft />
      <TornRight />
    </div>
  );
}
