
import React from "react";
import CopyButton from "./CopyButton";

const ResultDisplay = ({ result }) => {
  const { matchScore, strengths, suggestions } = result;

  const formattedText = `
Match Score: ${matchScore}/100

Strengths:
${strengths.map((s) => `✓ ${s}`).join("\n")}

Suggestions:
${suggestions.map((s) => `⚠️ ${s}`).join("\n")}
`;

  return (
    <div>
      <h3>------------------- Result Section -------------------</h3>
      <p><strong>Match Score:</strong> ✅ {matchScore}/100</p>

      <h4>Strengths:</h4>
      <ul>
        {strengths.map((s, i) => (
          <li key={i}>✓ {s}</li>
        ))}
      </ul>

      <h4>Suggestions:</h4>
      <ul>
        {suggestions.map((s, i) => (
          <li key={i}>⚠️ {s}</li>
        ))}
      </ul>

      <CopyButton text={formattedText} />
      <p>🔒 We do not store your data</p>
    </div>
  );
};

export default ResultDisplay;