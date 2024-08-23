"use client";

import useWallet from "@/hooks/useWallet";
import { PowerIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function DashboardProfile() {
  const { getDomain } = useWallet();
  const domain = getDomain();

  const walletAddress = useSelector((state) => state.user.walletAddress);

  return (
    <div className="bg-white shadow-lg flex-1 rounded-3xl flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Image
          src="/fusion-logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="text-left mr-6">
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

      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="rounded-full border-[1px] bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <UserIcon size={20} />
        </Link>
        <Link
          href="/"
          className="rounded-full bg-gray-300 border-red-500 border-[1px] self-start p-2.5 transition-all select-none hover:bg-white active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <PowerIcon size={20} className="text-red-500" />
        </Link>
      </div>
    </div>
  );
}
