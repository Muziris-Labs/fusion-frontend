"use client";

import React, { useEffect } from "react";
import QrCodeWithLogo from "qrcode-with-logos";

const QRCodeGenerator = ({
  value = "https://github.com/zxpsuper",
  size = 100,
}) => {
  const [src, setSrc] = React.useState("");

  useEffect(() => {
    const qrcode = new QrCodeWithLogo(
      {
        content: value,
        width: size,
        dotsOptions: {
          color: "#000",
          type: "fluid",
        },
        cornersOptions: {
          type: "circle",
          color: "#000",
        },
      },
      [value, size]
    );

    const getImage = async () => {
      const src = (await qrcode.getCanvas()).toDataURL();
      setSrc(src);
    };

    getImage();
  }, [value, size]);

  return src && <img src={src} alt="QR Code with Logo" style={{}} />;
};

export default QRCodeGenerator;
