import { Box, Container, Typography } from '@mui/material';
import logo from '../../assets/images/Logo 3.png';
import thankYou from '../../assets/images/Thank you.png';

export default function Footer() {
  return (
    <Box
      sx={{
        py: 5,
        borderTop: '1px solid rgba(196,98,45,0.12)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 0.8 }}>
            <Box
              component="img"
              src={logo}
              alt="DawnEmber"
              sx={{ height: 28, filter: 'invert(1) sepia(0.3) saturate(1.5)' }}
            />
            <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              © 2024 DawnEmber. All rights reserved.
            </Typography>
          </Box>

          <Box
            component="img"
            src={thankYou}
            alt="Thank you"
            sx={{ height: 50, opacity: 0.6, filter: 'invert(1)' }}
          />

          <Box sx={{ display: 'flex', gap: 3 }}>
            {['about', 'work', 'connect'].map((item) => (
              <Box
                key={item}
                component="a"
                href={`#${item}`}
                sx={{
                  fontFamily: '"Gochi Hand", cursive',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  '&:hover': { color: '#AD4F2E' },
                  transition: 'color 0.2s',
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
