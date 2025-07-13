import React, { useState } from "react";
import ResultSection from "./ResultSection";
import CopyButton from "./CopyButton";
import "../styles/ResumeForm.css";

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
      const response = await fetch("https://resume-ai-analyzer-production.up.railway.app/api/resume/analyze", {
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
    <div className="resume-box">
      <h2 className="section-title">📄 Upload Resume & Paste Job Description 📝</h2>

      <div className="input-section">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="file-input"
        />

        <textarea
          rows={8}
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="jd-textarea"
        />
      </div>

      <div className="button-row">
        <button className="analyze" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : " Analyze Resume"}
        </button>
        <button className="reset" onClick={handleReset}>🔄 Reset</button>
      </div>

      {result && (
        <div className="result-box">
          <h3>------------------- Result Section -------------------</h3>
          <p><strong>Match Score:</strong>  {result.matchScore}/100</p>

          <div>
            <strong>Strengths:</strong>
            <ul>
              {result.strengths.map((s, i) => <li key={i}>✓ {s}</li>)}
            </ul>
          </div>

          <div>
            <strong>Suggestions:</strong>
            <ul>
              {result.suggestions.map((s, i) => <li key={i}>⚠️ {s}</li>)}
            </ul>
          </div>

          <CopyButton text={
            `Match Score: ${result.matchScore}/100\n\nStrengths:\n${result.strengths.map(s => `✓ ${s}`).join('\n')}\n\nSuggestions:\n${result.suggestions.map(s => `⚠️ ${s}`).join('\n')}`
          } />

          <p className="footer">🔒 We do not store your data</p>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;