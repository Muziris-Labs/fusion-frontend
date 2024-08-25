"use client";

import { SquareArrowOutUpRight } from "lucide-react";

import React from "react";
import Link from "next/link";
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

const TransactionItem = ({ transaction }) => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const currentChain = config.chains.find(
    (chain) => chain.chainId === transaction.chainId
  );
  const currentToken = transaction.tokenSymbol
    ? currentChain.tokens.find(
        (token) => token.address === transaction.contractAddress
      )
    : currentChain.tokens.find(
        (token) => token.address === ethers.constants.AddressZero
      );

  return (
    walletAddress &&
    currentChain &&
    currentToken && (
      <tr className="border-t hover:bg-gray-50 my-1">
        <td className="px-4 py-2 flex items-center w-40 gap-1 relative">
          <div className="relative">
            <Image
              width={40}
              height={40}
              src={currentToken.logo}
              alt={transaction.hash}
              className="w-10 h-10 mr-2"
            />
            <Image
              width={18}
              height={18}
              src={currentChain.logo}
              alt={transaction.hash}
              className="absolute bottom-0 right-0"
            />
          </div>

          <div className="w-24 flex flex-col">
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
          <div className="bg-green-50 flex items-center px-3 py-1 w-fit rounded-lg text-sm">
            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
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
            ? formatAmount(transaction.value) / Number(transaction.tokenDecimal)
            : formatAmount(transaction.value) / 10 ** 18}{" "}
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
          <div className="flex gap-2">
            <Link
              href={
                currentChain.transactions.browserUrl + "tx/" + transaction.hash
              }
              className="text-gray-700"
            >
              <SquareArrowOutUpRight size={15} />
            </Link>

            <div
              className="text-gray-700 hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(transaction.hash);
                toast("Transaction hash copied to clipboard");
              }}
            >
              <CopyToClipboard size={15} />
            </div>
          </div>
        </td>
      </tr>
    )
  );
};

export default TransactionItem;
