import illAbout from '../../assets/images/Parrot Selected.png';
import illWork from '../../assets/images/Laptop Selected.png';
import illConnect from '../../assets/images/Filter Coffee Selected.png';
import { Reveal } from '../common/Reveal';

const navItems = [
  { href: '#about',   label: 'about',   ill: illAbout   },
  { href: '#work',    label: 'work',    ill: illWork    },
  { href: '#contact', label: 'connect', ill: illConnect },
];

/* Hand-drawn rough underline — reusable "sight follows" hover accent.
   Wavy, irregular path stretched (preserveAspectRatio="none") to exactly
   match the width of the word above it, run through the deInk
   displacement filter so it never reads as a straight/clean CSS border. */
const RoughUnderline = () => (
  <svg
    className="dn-underline"
    viewBox="0 0 120 16" preserveAspectRatio="none"
    style={{ position: 'absolute', left: 0, right: 0, top: '100%', width: '100%', height: 14, overflow: 'visible' }}
  >
    <path
      d="M3 9 C 18 5, 30 12, 45 8 C 58 4.5, 72 11, 86 7 C 96 4.5, 106 9, 117 6"
      fill="none" stroke="#AD4F2E" strokeWidth="2.6" strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      filter="url(#deInk)"
    />
  </svg>
);

export default function QuickNav() {
  return (
    <div style={{ paddingBottom: 8 }}>
      <style>{`
        .dn-underline {
          opacity: 0;
          transform: scaleX(0.55);
          transform-origin: center;
          transition: opacity .25s ease, transform .3s ease;
        }
        .dn-nav-item:hover .dn-underline {
          opacity: 1;
          transform: scaleX(1);
        }
        /* Single pre-composed badge (icon already centered on its own
           textured circle) at every breakpoint — no separate glow layer.
           Hover/selection just pops it up slightly. */
        .dn-nav-badge-wrap {
          display: inline-block;
          /* The solid circle sits ~2% left / ~4.6% up of the PNG's own
             canvas center (the leaf sprig extends past the circle on the
             bottom-right, which visually reads as "left aligned" once the
             whole image is centered) — nudge the image right+down so the
             circle itself lands centered instead of the raw image bbox. */
          transform: translate(5%, 4.6%);
        }
        .dn-nav-badge {
          height: 110px; width: auto; object-fit: contain; display: block;
          transition: transform .3s ease;
          transform: scale(1);
        }
        .dn-nav-item:hover .dn-nav-badge {
          transform: scale(1.08);
        }
        @media (max-width: 599px) {
          .dn-nav-badge { height: 60px; }
        }
      `}</style>

      {/* Quick nav band inside the card */}
      <Reveal as="div" className="dn-nav-band" style={{ padding: '12px clamp(4px,3cqw,60px) 10px' }}>
        <div className="dn-nav-grid">
          {navItems.map(({ href, label, ill }) => (
            <a key={label} href={href} className="dn-nav-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4, textDecoration: 'none', padding: '16px 8px 10px' }}>
              <span className="dn-nav-badge-wrap">
                <img src={ill} alt="" className="dn-nav-badge" />
              </span>
              <span style={{ position: 'relative', display: 'inline-block', marginTop: 8 }}>
                <span className="dn-nav-label" style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: 42, color: '#F8ECE0', lineHeight: 0.9, whiteSpace: 'nowrap' }}>{label}</span>
                <RoughUnderline />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
