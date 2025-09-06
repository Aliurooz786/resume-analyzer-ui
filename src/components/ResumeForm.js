
import React, { useState } from "react";
import ResultSection from "./ResultSection";
import CopyButton from "./CopyButton";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InsightsIcon from '@mui/icons-material/Insights';

const ResumeForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert(" Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resumeFile", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8084/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(" Something went wrong while analyzing the resume.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription("");
    setResult(null);
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: 2, borderRadius: 3 }}>
      <Typography variant="h5" align="center" color="secondary" fontWeight={600} gutterBottom>
        <span role="img" aria-label="resume">📄</span> Upload Resume & Paste Job Description <span role="img" aria-label="job">📝</span>
      </Typography>

      <Stack spacing={3}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          color={resumeFile ? 'success' : 'primary'}
        >
          {resumeFile ? resumeFile.name : 'Upload PDF Resume'}
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </Button>

        <TextField
          label="Paste Job Description here..."
          multiline
          minRows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <InsightsIcon />}
            onClick={handleAnalyze}
            disabled={loading}
            sx={{ minWidth: 160 }}
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{ minWidth: 120 }}
          >
            Reset
          </Button>
        </Stack>

        {result && (
          <Box mt={4}>
            <ResultSection result={result} />
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default ResumeForm;