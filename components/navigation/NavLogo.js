"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";

const NavLogo = () => {
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <Link href={`/dashboard?domain=${domain}`}>
      <div className="flex items-center gap-2 font-medium text-xl mb-5">
        Fusion
      </div>
    </Link>
  );
};

export default NavLogo;
