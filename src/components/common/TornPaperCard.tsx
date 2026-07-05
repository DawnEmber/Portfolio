import type { ReactNode } from 'react';

export const InkDivider = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{
    height: 3, borderRadius: 2,
    background: 'linear-gradient(90deg,transparent,rgba(230,200,172,0.55) 7%,rgba(230,200,172,0.5) 50%,rgba(230,200,172,0.55) 93%,transparent)',
    filter: 'url(#deInk)',
    ...style,
  }} />
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

const TornTop = () => (
  <div aria-hidden style={{ position:'absolute', top: -(OVERLAP), left:-4, right:-4, height: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible' }}>
    <svg width="100%" height={OVERLAP + 30} style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="0" width="100%" height={OVERLAP} fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornBottom = () => (
  <div aria-hidden style={{ position:'absolute', bottom: -(OVERLAP), left:-4, right:-4, height: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible' }}>
    <svg width="100%" height={OVERLAP + 30} style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="30" width="100%" height={OVERLAP} fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornLeft = () => (
  <div aria-hidden style={{ position:'absolute', top:-4, bottom:-4, left: -(OVERLAP), width: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible' }}>
    <svg width={OVERLAP + 30} height="100%" style={{ display:'block', overflow:'visible' }}>
      <rect x="0" y="0" width={OVERLAP} height="100%" fill={C} filter="url(#deTorn)" />
    </svg>
  </div>
);

const TornRight = () => (
  <div aria-hidden style={{ position:'absolute', top:-4, bottom:-4, right: -(OVERLAP), width: OVERLAP + 30, pointerEvents:'none', zIndex:10, overflow:'visible' }}>
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
          sections below (e.g. SparkFactor's pinned scroll scene). */}
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
