import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import SVGFilters from './components/common/SVGFilters';
import PageBackground from './components/common/PageBackground';
import TornPaperCard from './components/common/TornPaperCard';
import logoIcon from './assets/images/Logo.svg';
import QuickNav from './components/sections/QuickNav';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import About from './components/sections/About';
import SparkFactor from './components/sections/SparkFactor';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SVGFilters />
      <PageBackground />

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 3, paddingBottom: 64 }}>
        {/* Brand mark — on cream background, centred above the card */}
        <div style={{ textAlign: 'center', paddingTop: 32, paddingBottom: 28 }}>
          <a href="#home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={logoIcon} alt="" style={{ width: 36, height: 36, objectFit: 'contain', display: 'block' }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 20, color: '#191919' }}>DawnEmber</span>
          </a>
        </div>

        <TornPaperCard>
          <QuickNav />
          <Hero />
          <Work />
          <About />
          <SparkFactor />
          <Contact />
        </TornPaperCard>
      </div>
    </ThemeProvider>
  );
}
