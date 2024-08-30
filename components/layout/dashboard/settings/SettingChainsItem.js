"use client";

import React, { useEffect } from "react";

import { BookUser, Coins } from "lucide-react";
import { Avatar, Tooltip } from "@material-tailwind/react";

import Image from "next/image";

import shortenAddress from "@/utils/shortenAddress";
import { useSelector } from "react-redux";
import { calculateChainBalance } from "@/utils/conversionUtils";
import formatAmount from "@/utils/formatAmount";
import { ethers } from "ethers";

const TooltipContent = ({ logo, tokenName, address, balance }) => {
  return (
    <>
      <div className="flex gap-1.5 justify-center items-center">
        <Image
          src={logo}
          alt={tokenName}
          width={18}
          height={18}
          className="rounded-full"
        />

        <h3 className="font-bold">{tokenName}</h3>
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
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const selectedAddress = walletAddresses?.find((A) => {
    return (
      A.chainId === chain.chainId && A.address !== ethers.constants.AddressZero
    );
  });
  const [totalBalance, setTotalBalance] = React.useState(0);

  useEffect(() => {
    if (tokenBalanceData && tokenConversionData) {
      const balance = calculateChainBalance(
        chain,
        tokenConversionData,
        tokenBalanceData
      );

      setTotalBalance(balance);
    }
  }, [tokenBalanceData, tokenConversionData]);

  return (
    <Tooltip
      className="border border-blue-gray-50 bg-white text-black p-4 shadow-xl shadow-black/10 space-y-4 min-w-72 rounded-2xl"
      content={
        selectedAddress ? (
          <TooltipContent
            logo={chain.logo}
            tokenName={chain.name}
            address={
              selectedAddress?.address
                ? selectedAddress.address
                : ethers.constants.AddressZero
            }
            balance={
              totalBalance ? "$ " + formatAmount(totalBalance, 2) : "$ 0.00"
            }
          />
        ) : (
          <p className="text-center font-base">Not Deployed yet</p>
        )
      }
    >
      <Avatar
        variant="circular"
        alt="user 1"
        className="border-2 border-white hover:z-10 focus:z-10"
        src={chain.logo}
        style={{
          opacity: selectedAddress ? 1 : 0.5,
        }}
      />
    </Tooltip>
  );
};

export default SettingChainsItem;
