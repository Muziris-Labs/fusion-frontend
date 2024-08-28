"use client";

import React from "react";
import { useSelector } from "react-redux";

import SettingsProfile from "./SettingsProfile";

import FusionCard from "@/components/ui/FusionCard";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";

const SettingsQRContainer = () => {
  const walletAddress = useSelector((state) => state.user.walletAddress);

  return (
    <FusionCard className="p-6 shadow text-center flex gap-5 items-center">
      <QRCodeGenerator value={walletAddress} />

      <SettingsProfile />
    </FusionCard>
  );
};

export default SettingsQRContainer;
