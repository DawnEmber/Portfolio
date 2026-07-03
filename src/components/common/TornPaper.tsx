import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface TornPaperProps {
  children: ReactNode;
}

// Bigger, more irregular torn teeth — varied step sizes and amplitudes
// Left edge: x swings between ~2% and ~10%
// Right edge: x swings between ~90% and ~98%
// Each entry: [x%, y%] — y values are NOT uniform so teeth look organic

const LEFT_EDGE: [number, number][] = [
  [5, 0],
  [9, 0.8], [2, 1.8], [8, 3.1], [3, 4.2], [10, 5.8],
  [2, 6.9], [7, 8.4], [4, 9.3], [9, 11.0],
  [2, 12.2], [8, 13.8], [3, 14.7], [10, 16.5],
  [2, 17.6], [6, 19.1], [4, 20.2], [9, 22.0],
  [2, 23.1], [7, 24.9], [3, 25.8], [10, 27.6],
  [2, 28.8], [8, 30.5], [3, 31.4], [9, 33.2],
  [2, 34.3], [7, 36.1], [4, 37.0], [10, 38.8],
  [2, 40.0], [6, 41.8], [3, 42.7], [9, 44.5],
  [2, 45.6], [8, 47.3], [3, 48.2], [10, 50.0],
  [2, 51.2], [7, 53.0], [4, 53.9], [9, 55.6],
  [2, 56.8], [8, 58.5], [3, 59.4], [10, 61.2],
  [2, 62.4], [6, 64.1], [4, 65.0], [9, 66.8],
  [2, 68.0], [8, 69.7], [3, 70.6], [10, 72.4],
  [2, 73.5], [7, 75.3], [4, 76.2], [9, 78.0],
  [2, 79.1], [8, 80.9], [3, 81.8], [10, 83.6],
  [2, 84.7], [6, 86.5], [4, 87.4], [9, 89.1],
  [2, 90.3], [8, 92.0], [3, 92.9], [10, 94.7],
  [2, 95.8], [7, 97.6], [3, 98.5], [8, 100],
];

const RIGHT_EDGE: [number, number][] = [
  [95, 100],
  [91, 99.2], [98, 98.2], [92, 96.9], [97, 95.8], [90, 94.2],
  [98, 93.1], [93, 91.6], [96, 90.7], [91, 89.0],
  [98, 87.8], [92, 86.2], [97, 85.3], [90, 83.5],
  [98, 82.4], [94, 80.9], [96, 79.8], [91, 78.0],
  [98, 76.9], [93, 75.1], [97, 74.2], [90, 72.4],
  [98, 71.2], [92, 69.5], [97, 68.6], [91, 66.8],
  [98, 65.7], [93, 63.9], [96, 63.0], [90, 61.2],
  [98, 60.0], [94, 58.2], [97, 57.3], [91, 55.5],
  [98, 54.4], [92, 52.7], [97, 51.8], [90, 50.0],
  [98, 48.8], [93, 47.0], [96, 46.1], [91, 44.4],
  [98, 43.2], [92, 41.5], [97, 40.6], [90, 38.8],
  [98, 37.6], [94, 35.9], [96, 35.0], [91, 33.2],
  [98, 32.0], [92, 30.3], [97, 29.4], [90, 27.6],
  [98, 26.5], [93, 24.7], [96, 23.8], [91, 22.0],
  [98, 20.9], [92, 19.1], [97, 18.2], [90, 16.4],
  [98, 15.3], [94, 13.5], [96, 12.6], [91, 10.9],
  [98, 9.7], [92, 8.0], [97, 7.1], [90, 5.3],
  [98, 4.2], [93, 2.4], [97, 1.5], [92, 0],
];

function buildClipPath(): string {
  const topLeft = `${LEFT_EDGE[0][0]}% ${LEFT_EDGE[0][1]}%`;
  const topRight = `${RIGHT_EDGE[RIGHT_EDGE.length - 1][0]}% ${RIGHT_EDGE[RIGHT_EDGE.length - 1][1]}%`;

  // Right edge points (from top-right going DOWN to bottom-right)
  const rightDown = [...RIGHT_EDGE].reverse().map(([x, y]) => `${x}% ${y}%`).join(', ');

  // Left edge points going UP from bottom-left to top-left
  const leftUp = [...LEFT_EDGE].slice(1).reverse().map(([x, y]) => `${x}% ${y}%`).join(', ');

  const bottomLeft = `${LEFT_EDGE[LEFT_EDGE.length - 1][0]}% ${LEFT_EDGE[LEFT_EDGE.length - 1][1]}%`;

  return `polygon(${topLeft}, ${topRight}, ${rightDown}, ${bottomLeft}, ${leftUp})`;
}

const TORN_CLIP = buildClipPath();

export default function TornPaper({ children }: TornPaperProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        width: { xs: '94%', sm: '84%', md: '74%' },
        mx: 'auto',
        backgroundColor: '#141008',
        clipPath: TORN_CLIP,
        filter: 'drop-shadow(-8px 0 32px rgba(0,0,0,0.7)) drop-shadow(8px 0 32px rgba(0,0,0,0.7)) drop-shadow(0 16px 48px rgba(0,0,0,0.5))',
        backgroundImage: `
          radial-gradient(ellipse at 25% 15%, rgba(196,98,45,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 75% 85%, rgba(196,98,45,0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Inner padding box so content never gets near torn edges */}
      <Box sx={{ px: { xs: '10%', md: '9%' } }}>
        {children}
      </Box>
    </Box>
  );
}
