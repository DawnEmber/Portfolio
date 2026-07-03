export default function SVGFilters() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <defs>
        {/* Torn paper edge */}
        {/* Torn edge overlay filter — applied to cream rects outside the card.
            Large filter region so displaced cream pixels can travel far into the dark area. */}
        <filter id="deTorn" x="-10%" y="-200%" width="120%" height="500%">
          {/* Low freq = large slow curves, organic paper tear */}
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves={5} seed={5} result="n1" />
          <feDisplacementMap in="SourceGraphic" in2="n1" scale={90} xChannelSelector="R" yChannelSelector="G" result="d1" />
          {/* Mid freq = slight roughness on the curve edge */}
          <feTurbulence type="fractalNoise" baseFrequency="0.08 0.10" numOctaves={3} seed={13} result="n2" />
          <feDisplacementMap in="d1" in2="n2" scale={22} xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Coarse paper grain — visible thick fibers */}
        <filter id="deGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        {/* Paper mottle (dark patches) */}
        <filter id="deMottle">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.04" numOctaves={3} seed={4} />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        {/* Hand-drawn horizontal ink stroke */}
        <filter id="deInk" x="-6%" y="-600%" width="112%" height="1300%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.9" numOctaves={2} seed={9} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Hand-drawn vertical ink stroke */}
        <filter id="deInkV" x="-600%" y="-6%" width="1300%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.013" numOctaves={2} seed={6} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* 2D roughen for box/pill borders */}
        <filter id="deRough" x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.032" numOctaves={2} seed={5} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={4} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
