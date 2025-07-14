// App.js


import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';



function App() {
  const [mode, setMode] = useState('light');
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#10b981',
      },
      background: {
        default: mode === 'light' ? '#f6f8fa' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 3,
          p: { xs: 2, sm: 4, md: 6 },
          width: { xs: '100%', sm: '90%', md: '75%' },
          mx: 'auto',
        }}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={2}>
            <Typography variant="h3" color="primary" fontWeight={700} sx={{ flexGrow: 1, textAlign: 'center' }}>
              AI Resume Analyzer
            </Typography>
            <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="primary" sx={{ ml: 2 }}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <ResumeForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;