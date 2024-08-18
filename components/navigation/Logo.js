import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link
      className="flex gap-1.5 items-center px-8 py-2.5 bg-gray-100 w-fit rounded-full font-semibold"
      href="/"
    >
      Fusion
    </Link>
  );
}

export default Logo;
