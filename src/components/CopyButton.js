
import React, { useState } from "react";
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

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
    <Button
      variant={copied ? "contained" : "outlined"}
      color={copied ? "success" : "primary"}
      startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
      onClick={handleCopy}
      sx={{ minWidth: 220 }}
    >
      {copied ? "Copied!" : "Copy Result to Clipboard"}
    </Button>
  );
};

export default CopyButton;