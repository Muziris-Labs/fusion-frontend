"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";

const NavLogo = () => {
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <Link href={`/dashboard?domain=${domain}`}>
      <div className="flex items-center gap-2 font-medium dark:text-white text-xl mb-5">
        Fusion
        <div className="bg-red-500/20 rounded-xl p-1 px-2 text-xs font-light text-red-500">
          Testnet
        </div>
      </div>
    </Link>
  );
};

export default NavLogo;
