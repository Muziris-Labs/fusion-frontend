"use client";

import React from "react";
import { useSelector } from "react-redux";

import FusionCard from "@/components/ui/FusionCard";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import CopyToClipboard from "@/utils/CopyToClipboard";

const ReceiveQRContainer = () => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  console.log(walletAddress);

  return (
    <FusionCard className="p-6 shadow space-y-6">
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-2xl font-semibold">Receive Token</h2>
        <p className="text-sm text-gray-500">
          Scan the QR code or copy the address below to receive token.
        </p>
      </div>

      <div className="w-fit mx-auto text-center">
        <QRCodeGenerator size={320} value={walletAddress} />

        <div className="flex gap-2 justify-center">
          <p>Wallet Address: </p>
          <CopyToClipboard text={walletAddress} />
        </div>
      </div>
    </FusionCard>
  );
};

export default ReceiveQRContainer;
