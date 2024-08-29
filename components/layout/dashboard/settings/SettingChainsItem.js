import React from "react";

import { BookUser, Coins } from "lucide-react";
import { Avatar, Tooltip } from "@material-tailwind/react";

import Image from "next/image";

import shortenAddress from "@/utils/shortenAddress";

const TooltipContent = ({ logo, tokenName, address, balance }) => {
  return (
    <>
      <div className="flex gap-1.5 justify-center items-center">
        <Image
          src={logo}
          alt={tokenName}
          width={32}
          height={32}
          className="rounded-full"
        />

        <h3>{tokenName}</h3>
      </div>

      <div>
        <div className="px-3 py-2 rounded-t-lg border border-gray-300 space-y-1 bg-gray-100">
          <div className="flex gap-1">
            <BookUser className="text-black" size={16} />
            <p className="text-xs text-gray-600">Wallet Address</p>
          </div>

          <p className="ml-5">{shortenAddress(address)}</p>
        </div>

        <div className="px-3 py-2 rounded-b-lg border border-gray-300 space-y-1 bg-gray-100">
          <div className="flex gap-1">
            <Coins className="text-black" size={16} />
            <p className="text-xs text-gray-600">Fetched Balance</p>
          </div>

          <p className="ml-5">{balance}</p>
        </div>
      </div>
    </>
  );
};

const SettingChainsItem = ({ chain }) => {
  return (
    <Tooltip
      className="border border-blue-gray-50 bg-white text-black py-4 px-3 shadow-xl shadow-black/10 space-y-4 min-w-72 rounded-2xl"
      content={
        <TooltipContent
          logo={"/fusion-logo.svg"}
          tokenName={"OP Sepolia"}
          address={"0x1234567890abcdef"}
          balance={"2.33"}
        />
      }
    >
      <Avatar
        variant="circular"
        alt="user 1"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </Tooltip>
  );
};

export default SettingChainsItem;
