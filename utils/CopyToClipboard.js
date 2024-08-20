"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import shortenAddress from "./shortenAddress";

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    });
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={handleCopy}
    >
      <span>{shortenAddress(text)}</span>

      {copied ? (
        <Check className="ml-2 text-green-500" size={16} />
      ) : (
        <Copy className="ml-2 text-gray-500" size={16} />
      )}
    </div>
  );
};

export default CopyToClipboard;
