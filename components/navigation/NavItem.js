"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";

const NavItem = ({ href, label }) => {
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <li>
      <Link
        href={`${href}?domain=${domain}`}
        className="w-14 text-center text-gray-600 hover:text-black transition-colors duration-300"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
