"use client";

import { Copy, SquareArrowOutUpRight } from "lucide-react";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import FusionTooltip from "@/components/ui/FusionTooltip";
import config from "@/lib/config";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import formatAmount from "@/utils/formatAmount";
import CopyToClipboard from "@/utils/CopyToClipboard";
import { Button } from "@material-tailwind/react";

const TransactionItem = ({ transaction }) => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const currentChain = config.chains.find(
    (chain) => chain.chainId === transaction.chainId
  );
  const currentToken = transaction.tokenSymbol
    ? currentChain.tokens.find(
        (token) => token.address.toLowerCase() === transaction.contractAddress
      )
    : currentChain.tokens.find(
        (token) => token.address === ethers.constants.AddressZero
      );

  return (
    walletAddress &&
    currentChain &&
    currentToken &&
    transaction.hash && (
      <tr className="border-t hover:bg-gray-50 dark:hover:bg-gray-900 my-1 dark:text-white">
        <td className="py-5 pr-0 flex items-center w-40 gap-3 relative">
          <div className="relative">
            <Image
              width={40}
              height={40}
              src={currentToken.logo}
              alt={transaction.hash}
              className="w-10 h-10 mr-2"
            />
            <Image
              width={16}
              height={16}
              src={currentChain.logo}
              alt={transaction.hash}
              className="absolute -bottom-1 right-0"
            />
          </div>

          <div className="w-24 flex flex-col items-start">
            <FusionTooltip label={currentToken.symbol} />

            <p className="text-gray-500 text-sm truncate">
              <FusionTooltip label={currentChain.name}></FusionTooltip>
            </p>
          </div>
        </td>

        <td className="px-4 py-2 text-left">
          <p className="text-sm">{formatTime(transaction.timeStamp)}</p>

          <p className="text-xs text-gray-500">
            {formatDate(transaction.timeStamp)}
          </p>
        </td>

        <td className="p-1">
          <div className="bg-green-50 dark:bg-green-500 flex items-center px-3 py-1 w-fit rounded-lg text-sm">
            <span className="inline-block w-2 h-2 rounded-full mr-2 dark:bg-white bg-green-500"></span>
            <p>Successful</p>
          </div>
        </td>

        <td
          className={`px-4 py-2 ${
            transaction.from === walletAddress.toLowerCase()
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {transaction.from === walletAddress.toLowerCase() ? "-" : "+"}{" "}
          {transaction.tokenDecimal
            ? formatAmount(
                transaction.value / 10 ** Number(currentToken.decimals)
              )
            : formatAmount(transaction.value / 10 ** 18)}{" "}
          {currentToken.symbol}
        </td>

        <td className="px-4 py-2 text-sm">
          <CopyToClipboard
            text={
              transaction.from === walletAddress.toLowerCase()
                ? transaction.to
                : transaction.from
            }
          />
        </td>

        <td className="px-4 py-2">
          <div className="flex gap-2 justify-end">
            <Button
              color="white"
              className="bg-[#b09dff] border-[1px] flex items-center ml-2 gap-2 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-white"
              onClick={() => {
                navigator.clipboard.writeText(transaction.hash);
                toast.success("Transaction hash copied to clipboard");
              }}
            >
              <Copy size={10} />
            </Button>
            <Button
              color="white"
              className="bg-[#b09dff] border-[1px] flex items-center ml-2 gap-2 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-white"
              onClick={() => {
                window.open(
                  currentChain.transactions.browserUrl +
                    "tx/" +
                    transaction.hash,
                  "_blank"
                );
              }}
            >
              <SquareArrowOutUpRight size={10} />
            </Button>
          </div>
        </td>
      </tr>
    )
  );
};

export default TransactionItem;
