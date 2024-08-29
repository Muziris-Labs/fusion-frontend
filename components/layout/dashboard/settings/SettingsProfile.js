"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Image from "next/image";
import useWallet from "@/hooks/useWallet";

const SettingsProfile = () => {
  const { getDomain } = useWallet();
  const domain = getDomain();

  const walletAddress = useSelector((state) => state.user.walletAddress);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Image
          src="/fusion-logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />

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

      <div className="flex rounded-full overflow-hidden">
        <Link
          href={`/transfer?domain=${domain}`}
          className="bg-gray-100 rounded-l-full border py-1.5 min-w-20 prevent-select"
        >
          Send
        </Link>

        <Link
          href={`/receive?domain=${domain}`}
          className="bg-transparent rounded-r-full border py-1.5 min-w-20 prevent-select"
        >
          Receive
        </Link>
      </div>
    </div>
  );
};

export default SettingsProfile;
