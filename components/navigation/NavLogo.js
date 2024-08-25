"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";
import Image from "next/image";

const NavLogo = () => {
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <Link href={`/dashboard?domain=${domain}`}>
      <Image
        src="/fusion-logo.svg"
        alt="logo"
        width={75}
        height={75}
        className="invert group-hover:motion-safe:animate-spin-slow"
      />
    </Link>
  );
};

export default NavLogo;
