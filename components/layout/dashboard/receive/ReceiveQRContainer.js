"use client";

import React from "react";
import { useSelector } from "react-redux";

import FusionCard from "@/components/ui/FusionCard";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import CopyToClipboard from "@/utils/CopyToClipboard";
import useWallet from "@/hooks/useWallet";

const ReceiveQRContainer = () => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const { getDomain } = useWallet();
  const domain = getDomain();

  return (
    <FusionCard className="p-6 shadow flex flex-col gap-6">
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-2xl font-semibold">Receive Token</h2>
        <p className="text-sm text-gray-500">
          Scan the QR code or copy the address below to receive token.
        </p>
      </div>

      <p className="font-bold text-2xl w-full text-center">
        {domain}
        <span className="font-normal text-sm text-gray-700">.fusion.id</span>
      </p>

      <div className="w-fit mx-auto -mt-6 text-center">
        <QRCodeGenerator size={273} value={walletAddress} />

        <div className="flex gap-2 justify-center font-semibold py-2 ">
          <CopyToClipboard text={walletAddress} />
        </div>
      </div>
    </FusionCard>
  );
};

export default ReceiveQRContainer;
