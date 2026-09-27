import React from "react";
import ResumeForm from "./components/ResumeForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TerminalIcon from '@mui/icons-material/Terminal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#818CF8', // Soft Indigo
        dark: '#4F46E5'
      },
      secondary: {
        main: '#C084FC',
      },
      background: {
        default: '#09090B', // Deepest black/gray
        paper: '#18181B', // Slightly elevated surface
      },
      success: {
        main: '#34D399'
      }
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 900, letterSpacing: '-0.04em' },
      h2: { fontWeight: 800, letterSpacing: '-0.03em' },
      h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 700, borderRadius: 12, padding: '16px 24px' },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle Background Glow */}
        <Box sx={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: -1 }} />

        {/* Header Bar */}
        <Box sx={{ width: '100%', px: { xs: 2, md: 4 }, py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <TerminalIcon sx={{ color: '#818CF8' }} />
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: '#FFFFFF', letterSpacing: 1, textTransform: 'uppercase' }}>
              AI Resume Tailor
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { xs: 4, md: 8 } }}>
          
          {/* Centered Micro-Hero */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }, mb: 2, color: '#FFFFFF' }}>
              Beat the ATS.
            </Typography>
            <Typography variant="h6" sx={{ color: '#A1A1AA', fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
              Upload your resume and paste the job description. Our AI will surgically rewrite your experience to match exactly what they are looking for.
            </Typography>
          </Box>

          {/* The Command Center Form */}
          <Box sx={{ 
            bgcolor: 'rgba(24, 24, 27, 0.6)', 
            backdropFilter: 'blur(16px)',
            borderRadius: 4, 
            p: { xs: 3, sm: 4, md: 6 },
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            position: 'relative',
            zIndex: 20
          }}>
            <ResumeForm />
          </Box>

          {/* Minimalist Trust Badges */}
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" mt={6} sx={{ opacity: 0.8 }}>
            <Chip icon={<CheckCircleIcon />} label="ATS Friendly" color="default" variant="outlined" sx={{ border: 'none', color: '#A1A1AA' }} />
            <Chip icon={<TerminalIcon />} label="GPT-4o Powered" color="default" variant="outlined" sx={{ border: 'none', color: '#A1A1AA' }} />
            <Chip icon={<SecurityIcon />} label="100% Private" color="default" variant="outlined" sx={{ border: 'none', color: '#A1A1AA' }} />
            <Chip icon={<SpeedIcon />} label="Instant Download" color="default" variant="outlined" sx={{ border: 'none', color: '#A1A1AA' }} />
          </Stack>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;