import React, { useState } from "react";
import "../styles/CopyButton.css";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button className="copy-button" onClick={handleCopy}>
      📋 {copied ? "Copied!" : "Copy Result to Clipboard"}
    </button>
  );
};

export default CopyButton;