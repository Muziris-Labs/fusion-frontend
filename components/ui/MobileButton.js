"use client";

import { Button } from "@material-tailwind/react";

export default function MobileButton({ children, onClick, title }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <Button
        color="white"
        className="bg-[#b09dff] border-[1px] mt-5 flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-5 px-5 normal-case font-normal text-sm text-gray-600"
        onClick={onClick}
      >
        {children}
      </Button>
      <p className="text-sm font-light dark:text-white">{title}</p>
    </div>
  );
}
