import { useEffect, useState } from 'react';
import filterCoffeeSelected from '../../assets/images/Filter Coffee Selected.png';
import parrotSelected from '../../assets/images/Parrot Selected.png';

/* Floating action button — pinned bottom-right while scrolling. Reads as
   a "get in touch" nudge (filter coffee badge, same as QuickNav's connect
   icon) for most of the page, then swaps to the parrot badge as a
   "back to top" cue once you've scrolled to the very end. Both PNGs
   already come as complete circular badges, so the button is just the
   image itself cross-fading between the two — no extra ring needed. */
export default function ScrollFab() {
  const [atBottom, setAtBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      const scrollY = window.scrollY;
      const doc = document.documentElement;
      const nearBottom = scrollY + window.innerHeight >= doc.scrollHeight - 24;
      setAtBottom(nearBottom);
      setVisible(scrollY > window.innerHeight * 0.6);
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

  const onClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      aria-label={atBottom ? 'Back to top' : 'Get in touch'}
      onClick={onClick}
      style={{
        position: 'fixed', right: 'clamp(56px,9vw,96px)', bottom: 'clamp(40px,6.5vw,68px)', zIndex: 50,
        width: 108, height: 108, border: 'none', cursor: 'pointer', padding: 0, overflow: 'visible',
        background: 'transparent', boxShadow: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity .3s ease, transform .3s ease',
      }}
    >
      <img src={filterCoffeeSelected} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
        opacity: atBottom ? 0 : 1, transform: atBottom ? 'scale(0.7) rotate(-15deg)' : 'scale(1) rotate(0deg)',
        transition: 'opacity .3s ease, transform .3s ease',
      }} />
      <img src={parrotSelected} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
        opacity: atBottom ? 1 : 0, transform: atBottom ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(15deg)',
        transition: 'opacity .3s ease, transform .3s ease',
      }} />
    </button>
  );
}
