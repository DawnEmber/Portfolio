import { Fragment } from 'react';
import { InkDivider } from '../common/TornPaperCard';
import anbazhaganShot from '../../assets/images/Dr. Anbazhagan Website Desktop.png';
import sgeShot from '../../assets/images/SGE desktop.png';

const orange = '#AD4F2E';
const pad = 'clamp(28px,5cqw,60px)';

const iconHeal = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 3c0 5.6-7.5 10.2-7.5 10.2Z" />
    <path d="M8.5 11h2l1-2 1.5 4 1-2h2" />
  </svg>
);
const iconCompressor = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="12" height="8" rx="1.5" />
    <circle cx="9" cy="13" r="2.2" />
    <path d="M15 12h2.5a2.5 2.5 0 0 1 0 5H15 M6 9V6.5M12 9V6.5 M5 17v2M13 17v2" />
  </svg>
);

/* Simple laptop frame — the screen shows the actual project screenshot like
   a browser scrolled to the top of the page. objectFit:cover + height:100%
   makes ANY screenshot fill the 16:10 window with no black gaps, regardless
   of its native aspect ratio: wide heroes center-crop, tall full-page
   captures show their top viewport. objectPosition defaults to 'top' but can
   be overridden per project for an odd screenshot that needs a different focus. */
const LaptopMock = ({ src, alt, objectPosition = 'top' }: { src: string; alt: string; objectPosition?: string }) => (
  <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
    <div style={{ position: 'relative', borderRadius: '10px 10px 0 0', border: '7px solid #1c1c1c', borderBottom: 'none', overflow: 'hidden', background: '#000', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
      <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition }} />
      </div>
    </div>
    <div style={{ height: 12, background: 'linear-gradient(180deg,#2a2a2a,#111)', borderRadius: '0 0 6px 6px', position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '18%', height: 4, background: '#0a0a0a', borderRadius: '0 0 4px 4px' }} />
    </div>
  </div>
);

/* Loose organic blob behind each laptop — hand-drawn feel via a wobbly
   closed SVG path, softly filled and blurred at the edge. */
const Blob = () => (
  <svg viewBox="0 0 500 460" style={{ position: 'absolute', inset: '-8% -10%', width: '118%', height: '118%', zIndex: 0 }}>
    <path
      fill={orange} opacity="0.16"
      d="M154 46C221 8 314 4 375 52C436 100 460 187 441 256C422 325 361 376 291 402C221 428 133 429 82 383C31 337 18 245 40 174C62 103 87 84 154 46Z"
    />
  </svg>
);

const LeafSprig = ({ flip = false }: { flip?: boolean }) => (
  <svg width="70" height="90" viewBox="0 0 70 90" style={{ position: 'absolute', bottom: '4%', [flip ? 'left' : 'right']: '2%', opacity: 0.5, transform: flip ? 'scaleX(-1)' : undefined }}>
    <g fill="none" stroke={orange} strokeWidth="1.2" strokeLinecap="round">
      <path d="M35 88 C35 60 30 40 10 20" />
      <ellipse cx="20" cy="32" rx="10" ry="4.5" transform="rotate(-35 20 32)" />
      <ellipse cx="14" cy="46" rx="9" ry="4" transform="rotate(-40 14 46)" />
      <ellipse cx="24" cy="18" rx="8" ry="3.6" transform="rotate(-30 24 18)" />
    </g>
  </svg>
);

interface Project {
  icon: React.ReactNode; name: string; category: string;
  description: string; deliverables: string; shot: string;
  objectPosition?: string;
}

interface ProjectRowProps extends Project { idx: string; flip?: boolean; }

function ProjectRow({ idx, icon, name, category, description, deliverables, shot, flip, objectPosition }: ProjectRowProps) {
  const media = (
    <div key="media" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '30px 10px' }}>
      <Blob />
      <LeafSprig flip={flip} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <LaptopMock src={shot} alt={name} objectPosition={objectPosition} />
      </div>
    </div>
  );

  const copy = (
    <div key="copy" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, padding: '10px clamp(4px,2cqw,28px)' }}>
      <div style={{
        width: 62, height: 62, borderRadius: '50%', border: `1px dashed rgba(173,79,46,0.5)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
      }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(173,79,46,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>
      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: orange }}>{idx}</div>
      <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 30, color: '#F8ECE0', margin: '4px 0 0' }}>{name}</h3>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: orange, marginTop: 2 }}>{category}</div>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#D4B99A', maxWidth: 360, margin: '16px 0 0' }}>{description}</p>
      <div style={{ marginTop: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: orange, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What we did</div>
        <div style={{ fontSize: 14.5, color: '#C4A882', marginTop: 6 }}>{deliverables}</div>
      </div>
      <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#F8ECE0', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 26 }}>
        View project
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );

  return (
    <div className={`dn-work-grid${flip ? ' flip' : ''}`}>
      {flip ? [copy, media] : [media, copy]}
    </div>
  );
}

/* ─── Projects ──────────────────────────────────────────────────────────
   To add a new project, append one entry here. Numbering (01, 02, …),
   the alternating left/right layout, the divider between rows, and the
   perfect-fit laptop mock are all applied automatically.
   Optional `objectPosition` (default 'top') fine-tunes the screenshot crop. */
const projects: Project[] = [
  {
    icon: iconHeal,
    name: 'Dr. K. V. Anbazhagan',
    category: 'Legacy Website',
    description: 'A tribute website celebrating 70 years of Dr. K. V. Anbazhagan — a life of healing, love, and service.',
    deliverables: 'Web Design, Development',
    shot: anbazhaganShot,
  },
  {
    icon: iconCompressor,
    name: 'SGE Air Compressors',
    category: 'Industrial Website',
    description: 'A decade of building compressors out of Coimbatore — a catalogue-driven site for an industrial manufacturer.',
    deliverables: 'Web Design, Development, SEO',
    shot: sgeShot,
  },
];

export default function Work() {
  return (
    <section id="work" style={{ padding: `30px ${pad} 44px` }}>
      <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.26em', color: orange, textTransform: 'uppercase' }}>Our work</div>
      <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 'clamp(28px,3.2vw,38px)', color: '#F8ECE0', margin: '14px 0 0', letterSpacing: '-0.01em' }}>
        Stories woven into the{' '}
        <em style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontWeight: 500, color: orange }}>kolam.</em>
      </h2>
      <p style={{ fontSize: 15.5, color: '#D4B99A', maxWidth: 420, margin: '14px 0 0', lineHeight: 1.65 }}>
        A few of the journeys we've been part of and the impact we've created together.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 34 }}>
        {projects.map((project, i) => (
          <Fragment key={project.name}>
            {i > 0 && <InkDivider style={{ margin: '10px 0' }} />}
            <ProjectRow
              idx={String(i + 1).padStart(2, '0')}
              flip={i % 2 === 1}
              {...project}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
