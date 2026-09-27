import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LockIcon from '@mui/icons-material/Lock';

const timelineStages = [
  "Resume Uploaded",
  "Resume Parsed",
  "ATS Optimization",
  "GPT-4o Tailoring",
  "PDF Generation",
  "Preparing Download"
];

const ResumeForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingIndex((prevIndex) => 
          prevIndex < timelineStages.length - 1 ? prevIndex + 1 : prevIndex
        );
      }, 2000); 
    } else {
      setLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);
      setResult(null);
      const response = await fetch("http://localhost:8086/api/v1/resume/tailor", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API error");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ATS_Optimized_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setResult(true);
    } catch (error) {
      alert("Something went wrong while tailoring the resume.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription("");
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // SUCCESS STATE
  if (result) {
    return (
      <Box textAlign="center" p={4} sx={{ bgcolor: 'rgba(52, 211, 153, 0.1)', border: '1px solid', borderColor: '#34D399', borderRadius: 3, color: '#34D399', animation: 'fadeIn 0.5s ease-in' }}>
         <CheckCircleOutlineIcon sx={{ fontSize: 72, mb: 2 }} />
         <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#FFFFFF' }}>
           Ready for Submission!
         </Typography>
         <Typography variant="body1" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
           ✅ ATS Optimized Resume Generated
         </Typography>
         <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, fontWeight: 500 }}>
           ✅ Download Started Automatically
         </Typography>
         <Button 
           variant="contained" 
           onClick={handleReset}
           sx={{ bgcolor: '#34D399', color: '#09090B', '&:hover': { bgcolor: '#10B981' }, fontWeight: 700, px: 4, py: 1.5, borderRadius: 2 }}
           startIcon={<RestartAltIcon />}
         >
           Tailor Another Resume
         </Button>
      </Box>
    );
  }

  // PROCESSING TIMELINE STATE
  if (loading) {
    return (
      <Box p={6} sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: 3, bgcolor: 'rgba(79, 70, 229, 0.05)' }}>
        <Typography variant="h4" fontWeight={800} color="primary.main" textAlign="center" mb={6}>
          Processing with GPT-4o
        </Typography>
        <Stack spacing={4} maxWidth="400px" mx="auto">
          {timelineStages.map((stage, index) => {
            const isCompleted = index < loadingIndex;
            const isActive = index === loadingIndex;
            const isPending = index > loadingIndex;

            return (
              <Box key={index} display="flex" alignItems="center" gap={3} sx={{ opacity: isPending ? 0.3 : 1, transition: 'opacity 0.3s' }}>
                {isCompleted ? (
                  <CheckCircleIcon sx={{ color: '#34D399', fontSize: 28 }} />
                ) : isActive ? (
                  <HourglassEmptyIcon color="primary" sx={{ fontSize: 28, animation: 'spin 2s linear infinite' }} />
                ) : (
                  <Box sx={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid', borderColor: 'text.disabled' }} />
                )}
                <Typography variant="h6" fontWeight={isActive ? 700 : 500} color={isActive ? '#FFFFFF' : 'text.secondary'}>
                  {stage}
                </Typography>
              </Box>
            );
          })}
        </Stack>
        <style>
          {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
        </style>
      </Box>
    );
  }

  // DEFAULT FORM STATE (COMMAND CENTER)
  return (
    <Stack spacing={4}>
      
      <Grid container spacing={4}>
        {/* LEFT COLUMN: UPLOAD */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              1. Upload Resume
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5} sx={{ color: 'success.main' }}>
              <LockIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" fontWeight={600}>Private</Typography>
            </Box>
          </Box>
          
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              height: '240px', // Fixed height to match textarea
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px dashed',
              borderColor: isDragging ? 'primary.main' : (resumeFile ? 'success.main' : 'rgba(255, 255, 255, 0.12)'),
              bgcolor: isDragging ? 'rgba(79, 70, 229, 0.1)' : (resumeFile ? 'rgba(52, 211, 153, 0.05)' : 'rgba(0, 0, 0, 0.2)'),
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: resumeFile ? 'success.main' : 'primary.main',
                bgcolor: resumeFile ? 'rgba(52, 211, 153, 0.1)' : 'rgba(79, 70, 229, 0.05)',
              }
            }}
          >
            <input
              type="file"
              accept=".pdf"
              hidden
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) setResumeFile(e.target.files[0]);
              }}
            />
            {resumeFile ? (
               <PictureAsPdfIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            ) : (
               <CloudUploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            )}
            <Typography variant="h6" fontWeight={700} color={resumeFile ? 'success.main' : '#E2E8F0'}>
              {resumeFile ? resumeFile.name : 'Drag PDF here'}
            </Typography>
            {!resumeFile && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                Click to browse (Max 10MB)
              </Typography>
            )}
          </Box>
        </Grid>

        {/* RIGHT COLUMN: JOB DESCRIPTION */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary" mb={1.5} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            2. Target Job Description
          </Typography>
          <TextField
            placeholder="Paste the job requirements and responsibilities here. Our AI will automatically identify the required hard skills..."
            multiline
            rows={8} // Sized to roughly match the 240px upload box
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '240px',
                alignItems: 'flex-start',
                borderRadius: 3,
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                color: '#E2E8F0',
                transition: 'all 0.2s',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                }
              }
            }}
          />
        </Grid>
      </Grid>

      {/* ACTION BUTTON (FULL WIDTH) */}
      <Box pt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleAnalyze}
          disabled={!resumeFile || !jobDescription.trim()}
          fullWidth
          sx={{ 
            py: 2.5, 
            fontSize: '1.2rem',
            borderRadius: 3,
            backgroundImage: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
            boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundImage: 'linear-gradient(90deg, #4338CA, #6D28D9)',
              transform: 'translateY(-2px)'
            },
            '&:disabled': {
              backgroundImage: 'none',
              bgcolor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)'
            }
          }}
        >
          Tailor My Resume Now
        </Button>
      </Box>
    </Stack>
  );
};

export default ResumeForm;