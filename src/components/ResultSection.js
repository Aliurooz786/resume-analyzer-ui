import React from 'react';
import CopyButton from './CopyButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/material/styles';

export default function ResultSection({ result }) {
  if (!result) return null;

  const { matchScore, strengths, suggestions } = result;

  // Render strengths and suggestions as markdown lists
  const strengthsMarkdown = strengths.map(s => `- **${s.split(':')[0]}:**${s.slice(s.indexOf(':') + 1)}`).join('\n');
  const suggestionsMarkdown = suggestions.map(s => `- ${s}`).join('\n');

  const markdown = `**Match Score:** ${matchScore}/100\n\n---\n\n### Strengths\n${strengthsMarkdown}\n\n### Suggestions\n${suggestionsMarkdown}`;

  const formattedText = `Match Score: ${matchScore}/100\n\nStrengths:\n${strengths.map(s => `✓ ${s}`).join('\n')}\n\nSuggestions:\n${suggestions.map(s => `⚠️ ${s}`).join('\n')}`;

  const MarkdownContainer = styled(Box)(({ theme }) => ({
    '& ul': {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& li': {
      marginBottom: theme.spacing(1),
    },
    '& strong': {
      color: theme.palette.secondary.main,
    },
  }));

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, width: '100%', boxSizing: 'border-box', overflowX: 'visible' }}>
      <Typography variant="h6" align="center" color="primary" gutterBottom>
        Result Section
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <MarkdownContainer>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </MarkdownContainer>
      <Box mt={2}>
        <CopyButton text={formattedText} />
      </Box>
      <Typography variant="caption" color="text.disabled" display="block" align="center" mt={2}>
        🔒 We do not store your data
      </Typography>
    </Paper>
  );
}

