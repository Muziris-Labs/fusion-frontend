"use client";

import React from "react";
import { useSelector } from "react-redux";
import useWallet from "@/hooks/useWallet";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import config from "@/lib/config";

const SettingsProfile = () => {
  const { getDomain } = useWallet();
  const domain = getDomain();

  const walletAddress = useSelector((state) => state.user.walletAddress);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 relative z-10">
        <QRCodeGenerator value={walletAddress} />
        <div className="text-left">
          <p className="text-black text-2xl font-semibold">
            {domain
              ? domain.length > 9
                ? `${domain.slice(0, 6)}...`
                : domain
              : "---"}
            .fusion.id
          </p>
          <p className="text-sm">
            {walletAddress
              ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
              : "---"}
          </p>
        </div>
      </div>

      <div className="flex flex-col p-5 px-6 bg-blue-50 w-full rounded-3xl relative z-10">
        <div className="flex justify-between w-full mt-1.5">
          <p className="text-base text-gray-500">Build</p>
          <div className="text-lg font-base  flex flex-col items-end">
            Fusion Wallet Alpha
          </div>
        </div>
        <div className="flex justify-between w-full mt-1.5">
          <p className="text-base text-gray-500">Version</p>
          <div className="text-base  flex flex-col items-end">
            <p className="text-xl font-base">V0.0.2</p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-1.5">
          <p className="text-base text-gray-500">Networks</p>
          <div className="text-base  flex flex-col items-end">
            <p className="text-xl font-base">{config.chains.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
