import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator = ({
  value,
  size = 164,
  level = "H",
  bgColor = "transparent",
  fgColor = "url(#gradient)",
}) => {
  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#555555", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#2a2a2a", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <QRCodeSVG
        value={value}
        level={level}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </svg>
  );
};

export default QRCodeGenerator;
