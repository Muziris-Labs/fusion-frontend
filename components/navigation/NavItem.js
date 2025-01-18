"use client";

import React from "react";
import Link from "next/link";

import useWallet from "@/hooks/useWallet";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { CornerDownRight } from "lucide-react";

const NavItem = ({ href, label, icon, submenu = null }) => {
  const { getDomain } = useWallet();

  const { resolvedTheme } = useTheme();

  const pathname = usePathname();

  const domain = getDomain();

  return (
    <li className="text-left hover:text-black dark:hover:text-white text-gray-600 flex flex-col">
      <Link
        href={`${href}?domain=${domain}`}
        className="flex gap-4 items-center font-light transition-colors duration-300"
        style={{
          color:
            pathname === href
              ? resolvedTheme === "light"
                ? "#6b46fe"
                : "#a28cfa"
              : "inherit",
        }}
      >
        {icon}
        {label}
      </Link>
      {submenu && (
        <ul className="flex flex-col gap-2.5 ml-2">
          {submenu.map(
            (item) =>
              item.href === pathname && (
                <li
                  key={item.label}
                  className="text-left flex gap-3 hover:text-black dark:hover:text-white mt-5 -mb-5 text-gray-600"
                >
                  <CornerDownRight
                    size={16}
                    className=""
                    style={{
                      color:
                        pathname === item.href
                          ? resolvedTheme === "light"
                            ? "#6b46fe"
                            : "#a28cfa"
                          : "inherit",
                    }}
                  />
                  <Link
                    href={`${item.href}?domain=${domain}`}
                    className="flex gap-2 items-center text-sm font-light transition-colors duration-300"
                    style={{
                      color:
                        pathname === item.href
                          ? resolvedTheme === "light"
                            ? "#6b46fe"
                            : "#a28cfa"
                          : "inherit",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
