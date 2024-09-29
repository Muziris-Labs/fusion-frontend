"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";
import { usePathname } from "next/navigation";

const NavItem = ({ href, label, icon }) => {
  const { getDomain } = useWallet();

  const pathname = usePathname();

  const domain = getDomain();

  return (
    <li className="text-left hover:text-black dark:hover:text-white text-gray-600">
      <Link
        href={`${href}?domain=${domain}`}
        className="flex gap-4 items-center font-light transition-colors duration-300"
        style={{
          color: pathname === href ? "#6b46fe" : "inherit",
        }}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
