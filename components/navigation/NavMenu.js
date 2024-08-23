"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function NavMenu() {
  return (
    <nav className="flex justify-between items-center gap-10 h-16 bg-white rounded-full p-5 px-9 shadow-md">
      <Link
        href="/"
        className="w-14 text-center text-gray-600 hover:text-black transition-colors duration-300"
      >
        Send
      </Link>
      <Link
        href="/receive"
        className="w-14 text-center text-gray-600 hover:text-black transition-colors duration-300"
      >
        Receive
      </Link>
      <div className="w-20 h-20 rounded-full hover:cursor-pointer bg-black flex items-center justify-center group ">
        <Image
          src="/fusion-logo.svg"
          alt="logo"
          width={75}
          height={75}
          className="invert group-hover:motion-safe:animate-spin-slow"
        />
      </div>
      <Link
        href="/transactions"
        className="w-14 text-center text-gray-600 hover:text-black transition-colors duration-300"
      >
        History
      </Link>
      <Link
        href="/settings"
        className="w-14 text-center text-gray-600 hover:text-black transition-colors duration-300"
      >
        Settings
      </Link>
    </nav>
  );
}
