"use client";

import FusionCard from "@/components/ui/FusionCard";
import CopyToClipboard from "@/utils/CopyToClipboard";
import shortenAddress from "@/utils/shortenAddress";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { BookUser, Coins } from "lucide-react";
import Image from "next/image";

const TooltipContent = () => {
  return (
    <>
      <div className="flex gap-1.5 justify-center items-center">
        <Image
          src="/fusion-logo.svg"
          alt="logo"
          width={32}
          height={32}
          className="rounded-full"
        />

        <h3>OP Sepolia</h3>
      </div>

      <div>
        <div className="px-3 py-2 rounded-t-lg border border-gray-300 space-y-1 bg-gray-100">
          <div className="flex gap-1">
            <BookUser className="text-black" size={16} />
            <p className="text-xs text-gray-600">Wallet Address</p>
          </div>

          <p className="ml-5">{shortenAddress("0x1234567890abcdef")}</p>
        </div>

        <div className="px-3 py-2 rounded-b-lg border border-gray-300 space-y-1 bg-gray-100">
          <div className="flex gap-1">
            <Coins className="text-black" size={16} />
            <p className="text-xs text-gray-600">Fetched Balance</p>
          </div>

          <p className="ml-5">2.34</p>
        </div>
      </div>
    </>
  );
};

const SettingsChains = () => {
  return (
    <div className="flex items-center -space-x-4">
      <Tooltip
        className="border border-blue-gray-50 bg-white text-black py-4 px-3 shadow-xl shadow-black/10 space-y-4 min-w-72 rounded-2xl"
        content={<TooltipContent />}
      >
        <Avatar
          variant="circular"
          alt="user 1"
          className="border-2 border-white hover:z-10 focus:z-10"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </Tooltip>

      <Avatar
        variant="circular"
        alt="user 2"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
      />

      <Avatar
        variant="circular"
        alt="user 3"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
      />

      <Avatar
        variant="circular"
        alt="user 4"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
      />

      <Avatar
        variant="circular"
        alt="user 5"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
      />
    </div>
  );
};

export default SettingsChains;
