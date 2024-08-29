"use client";

import React from "react";
import { useSelector } from "react-redux";

import SettingsProfile from "./SettingsProfile";

import FusionCard from "@/components/ui/FusionCard";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import QrCodeWithLogo from "qrcode-with-logos";

const SettingsQRContainer = () => {
  let qrcode = new QrCodeWithLogo({
    // canvas: document.getElementById("canvas"),
    content: "https://github.com/zxpsuper",
    width: 380,
    //   download: true,
    image: document.getElementById("image"),
    logo: {
      src: "https://avatars1.githubusercontent.com/u/28730619?s=460&v=4",
    },
  });
  const walletAddress = useSelector((state) => state.user.walletAddress);

  return (
    <FusionCard className="p-6 shadow text-center flex gap-3 items-center">
      <QRCodeGenerator value={walletAddress} />
      <img
        src={qrcode.getImage()}
        id="image"
        style={{ width: "100px", height: "100px" }}
      />
      <SettingsProfile />
    </FusionCard>
  );
};

export default SettingsQRContainer;
