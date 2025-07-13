import React from "react";
import CopyButton from "./CopyButton";
import "../styles/ResultSection.css";

const ResultSection = ({ result }) => {
  if (!result) return null;

  const { matchScore, strengths, suggestions } = result;

  const formattedText = `
Match Score:  ${matchScore}/100

Strengths:
${strengths.map((s) => `✓ ${s}`).join("\n")}

Suggestions:
${suggestions.map((s) => ` ${s}`).join("\n")}
`;

  return (
    <div className="result-section">
      <h3>------------------- Result Section -------------------</h3>

      <p className="score">Match Score: {matchScore}/100</p>

      <div className="section-block">
        <strong>Strengths:</strong>
        <ul>
          {strengths.map((point, idx) => (
            <li key={idx}>✓ {point}</li>
          ))}
        </ul>
      </div>

      <div className="section-block">
        <strong>Suggestions:</strong>
        <ul>
          {suggestions.map((point, idx) => (
            <li key={idx}> {point}</li>
          ))}
        </ul>
      </div>

      <CopyButton text={formattedText} />
      <p className="footer">🔒 We do not store your data</p>
    </div>
  );
};

export default ResultSection;