import { useState } from 'react';
import { InkDivider } from '../common/TornPaperCard';
import coffeeImg from '../../assets/images/coffe 1.png';
import favicon2 from '../../assets/images/Favicon 2.svg';

const orange = '#AD4F2E';
const pad = 'clamp(28px,5cqw,60px)';

/* Hand-drawn ornamental vertical divider — SVG instead of the raster PNG,
   which had blurred glow margins that got cropped/cut off at odd points.
   Lines flex to fill whatever height the row needs; the knot ornament in
   the middle stays fixed size, so it always fits perfectly, never crops. */
const OrnamentalDivider = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: 40, opacity: 0.4 }}>
    {/* Short lead-in so the flourish sits near the top, not centered */}
    <div style={{ flex: '0 0 20px', width: 1.5, background: 'linear-gradient(180deg, transparent, rgba(230,200,172,0.7))', filter: 'url(#deInkV)' }} />
    {/* Single simple loop-knot, fully vector so it never blurs, crops,
        or misaligns at any height. */}
    <svg width="26" height="30" viewBox="0 0 26 30" style={{ flex: '0 0 auto' }}>
      <path
        d="M13 0 V11 C8 6 3 8 3 12 C3 16.5 9 16 13 11 C17 16 23 16.5 23 12 C23 8 18 6 13 11 V30"
        fill="none" stroke="#E6C8AC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        filter="url(#deRough)"
      />
    </svg>
    <div style={{ flex: 1, minHeight: 12, width: 1.5, background: 'linear-gradient(0deg, transparent, rgba(230,200,172,0.7))', filter: 'url(#deInkV)' }} />
  </div>
);

const icons = {
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v14H4z" /><path d="M4 6l8 6 8-6" />
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.18 2A17 17 0 0 1 3 5.18 2 2 0 0 1 5 4Z" />
    </svg>
  ),
  social: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </svg>
  ),
};

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M7.5 10v6.5M7.5 7.2v.1M12 16.5V13c0-1.4 1-2.5 2.3-2.5 1.3 0 2.2 1 2.2 2.5v3.5M12 10v6.5" />
    </svg>
  )},
  { name: 'Instagram', href: 'https://www.instagram.com', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.2" cy="6.8" r="0.9" fill="#F8ECE0" stroke="none" />
    </svg>
  )},
  { name: 'Facebook', href: 'https://www.facebook.com', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F8ECE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 21v-7h2.5l.5-3H14V9c0-1 .3-1.7 1.7-1.7H17V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H8.5v3H11v7Z" />
    </svg>
  )},
];

const infoItems = [
  { icon: icons.mail,   label: 'Email us', lines: ['hello@dawnember.in'] },
  { icon: icons.phone,  label: 'Call us',  lines: ['+91 12345 67890'] },
];

const fieldStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderRadius: 10, padding: '14px 16px', fontSize: 14.5, color: '#F8ECE0',
  fontFamily: "'Hanken Grotesk',sans-serif", outline: 'none', position: 'relative', zIndex: 1,
};

/* Hand-drawn wobbly border — same deRough filter used for the badge/chip
   outlines elsewhere, so form fields read as sketched rather than
   machine-perfect rounded rects. */
const RoughField = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative' }}>
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 10,
      border: '1.5px solid rgba(230,200,172,0.55)',
      filter: 'url(#deRough)', pointerEvents: 'none',
    }} />
    {children}
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email}, ${form.phone})`);
    window.location.href = `mailto:hello@dawnember.in?subject=${encodeURIComponent(`Message from ${form.name || 'website'}`)}&body=${body}`;
  };

  return (
    <>
      <section id="contact" style={{ padding: `58px ${pad} 54px` }}>
        <div className="dn-contact-grid">
          {/* Left */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.26em', color: orange, textTransform: 'uppercase' }}>Let's brew something great,</div>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 'clamp(32px,3.5vw,42px)', lineHeight: 1.06, color: '#F8ECE0', margin: '16px 0 0', letterSpacing: '-0.02em' }}>
              Let's talk{' '}
              <em style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontWeight: 500, color: orange }}>over a filter.</em>
            </h2>
            <div style={{ width: 60, height: 3, borderRadius: 2, background: orange, margin: '18px 0 22px', filter: 'url(#deInk)' }} />
            <p style={{ fontSize: 15.5, color: '#F8ECE0', maxWidth: 420, margin: '0 0 34px', lineHeight: 1.6 }}>
              Have a project in mind or just want to say hi?<br />
              Drop us a message. We'd love to hear from you.
            </p>

            <div className="dn-contact-inner-grid" style={{ display: 'grid', gap: 30, alignItems: 'start' }}>
              {/* Contact info list */}
              <div style={{ position: 'relative', paddingLeft: 4 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                  {infoItems.map(({ icon, label, lines }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                      <div style={{ position: 'relative', zIndex: 1, flex: '0 0 auto', width: 44, height: 44, borderRadius: '50%', background: orange, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px -8px rgba(173,79,46,0.7)' }}>
                        {icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14.5, color: '#F8ECE0' }}>{label}</div>
                        {lines.map(l => (
                          <div key={l} style={{ fontSize: 13.5, color: '#C4A882', lineHeight: 1.5 }}>{l}</div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Social */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                    <div style={{ position: 'relative', zIndex: 1, flex: '0 0 auto', width: 44, height: 44, borderRadius: '50%', background: orange, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px -8px rgba(173,79,46,0.7)' }}>
                      {icons.social}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: '#F8ECE0', marginBottom: 6 }}>Social</div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {socialLinks.map(({ name, href, icon }) => (
                          <a key={name} href={href} target="_blank" rel="noopener" aria-label={name} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 32, height: 32, borderRadius: '50%',
                            border: '1.5px solid rgba(230,200,172,0.35)', textDecoration: 'none',
                          }}>
                            {icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ornamental vertical divider before the form fields */}
              <OrnamentalDivider />

              {/* Form — every field gets a hand-drawn wobbly border */}
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <RoughField>
                  <input
                    type="text" placeholder="Your name" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={fieldStyle}
                  />
                </RoughField>
                <RoughField>
                  <input
                    type="tel" placeholder="Mobile number" required
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={fieldStyle}
                  />
                </RoughField>
                <RoughField>
                  <input
                    type="email" placeholder="Email address" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={fieldStyle}
                  />
                </RoughField>
                <RoughField>
                  <textarea
                    placeholder="How can we help?" required rows={3}
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: 84, fontFamily: "'Hanken Grotesk',sans-serif", display: 'block' }}
                  />
                </RoughField>

                {/* Rough hand-painted pill — double outline like a sketched button */}
                <button type="submit" style={{
                  position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  background: orange, color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '15px 26px', borderRadius: 999, boxShadow: '0 14px 30px -10px rgba(173,79,46,0.7)',
                  border: 'none', cursor: 'pointer', marginTop: 4,
                }}>
                  <span style={{
                    position: 'absolute', inset: -4, borderRadius: 999,
                    border: '1.5px solid rgba(230,200,172,0.55)',
                    filter: 'url(#deRough)', pointerEvents: 'none',
                  }} />
                  Send message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Right — coffee art */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: '6% 4%', background: 'radial-gradient(58% 52% at 54% 40%, rgba(173,79,46,0.25), rgba(173,79,46,0.06) 55%, transparent 72%)', pointerEvents: 'none' }} />
            <img src={coffeeImg} alt="Filter coffee by the window" style={{ position: 'relative', width: '100%', maxWidth: 470, height: 'auto', display: 'block' }} />
          </div>
        </div>

        {/* Footer bar */}
        <div style={{ marginTop: 46, paddingTop: 30, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
          <InkDivider style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={favicon2} alt="" style={{ width: 26, height: 26, objectFit: 'contain', display: 'block' }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: '#F8ECE0' }}>DawnEmber</span>
          </div>
          <div style={{ fontSize: 12.5, color: '#9A8468', letterSpacing: '0.04em' }}>
            Made with <span style={{ color: orange }}>&#9829;</span> by Anbu &amp; Aswin &nbsp;·&nbsp; © 2025 Dawn Ember
          </div>
        </div>
      </section>
    </>
  );
}
