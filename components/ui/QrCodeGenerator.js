import React, { useEffect, useRef } from "react";
import QrCodeWithLogo from "qrcode-with-logos";

const QRCodeGenerator = ({
  value = "https://github.com/zxpsuper",
  size = 380,
  logoSrc = "/fusion-logo.png",
}) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const qrcode = new QrCodeWithLogo({
      content: value,
      width: size,
      logo: {
        src: logoSrc,
      },
      dotsOptions: {
        color: "#000",
        type: "rounded",
      },
      cornersOptions: {
        type: "circle",
        color: "#000",
      },
    });

    const getImage = async () => {
      if (imageRef.current) {
        imageRef.current.src = (await qrcode.getCanvas()).toDataURL();
      }
    };

    getImage();
  }, [value, size, logoSrc]);

  return (
    <img
      ref={imageRef}
      alt="QR Code with Logo"
      style={{ width: `164px`, height: `164px` }}
    />
  );
};

export default QRCodeGenerator;
