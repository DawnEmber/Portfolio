import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#AD4F2E' },
    background: { default: '#F8ECE0', paper: '#191919' },
    text: { primary: '#F8ECE0', secondary: '#D4B99A' },
  },
  typography: { fontFamily: "'Hanken Grotesk', sans-serif" },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: clip; }
        body { background: #F8ECE0; -webkit-font-smoothing: antialiased; }
        ::selection { background: #AD4F2E; color: #fff; }
        section[id] { scroll-margin-top: 96px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F8ECE0; }
        ::-webkit-scrollbar-thumb { background: #AD4F2E; border-radius: 2px; }
      `,
    },
  },
});

export default theme;
