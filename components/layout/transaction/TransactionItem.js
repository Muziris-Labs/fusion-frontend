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
import { Button, Tooltip } from "@material-tailwind/react";
import { useTheme } from "next-themes";

const TransactionItem = ({ transaction }) => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const currentChain = config.chains.find(
    (chain) => chain.chainId === Number(transaction.chainId)
  );
  const currentToken =
    transaction.token !== ethers.constants.AddressZero
      ? currentChain.tokens.find(
          (token) =>
            token.address.toLowerCase() === transaction.token.toLowerCase()
        )
      : currentChain.tokens.find(
          (token) => token.address === ethers.constants.AddressZero
        );
  const { resolvedTheme } = useTheme();

  return (
    walletAddress &&
    currentChain &&
    currentToken &&
    transaction.hash && (
      <div
        className="border flex flex-col rounded-2xl my-1 dark:text-white p-4"
        style={{
          backgroundColor:
            resolvedTheme === "light" ? "#6b46fe06" : "#a28cfa10",
          borderColor: resolvedTheme === "light" ? "#6b46fe" : "#a28cfa",
        }}
      >
        <div className="flex w-full justify-between items-center">
          <div className=" pr-0 flex items-center gap-3 relative">
            <div className="relative">
              <Tooltip content={currentToken.symbol}>
                <Image
                  width={40}
                  height={40}
                  src={currentToken.logo}
                  alt={transaction.hash}
                  className="w-10 h-10 mr-2 ml-2"
                />
              </Tooltip>
              <Tooltip content={currentChain.name}>
                <Image
                  width={16}
                  height={16}
                  src={currentChain.logo}
                  alt={transaction.hash}
                  className="absolute -bottom-1 right-0"
                />
              </Tooltip>
            </div>

            <div className="flex-col items-start hidden md:flex">
              {currentToken?.symbol}

              <p className="text-gray-500 text-sm">{currentChain?.name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-1">
              {transaction.status === "success" ? (
                <div className="bg-green-50 dark:bg-green-500 my-auto flex items-center px-3 py-1 w-fit rounded-lg text-sm">
                  <span className="inline-block w-2 h-2 rounded-full mr-2 dark:bg-white bg-green-500"></span>
                  <p>Successful</p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-500 my-auto flex items-center px-3 py-1 w-fit rounded-lg text-sm">
                  <span className="inline-block w-2 h-2 rounded-full mr-2 dark:bg-white bg-red-500"></span>
                  <p>Failed</p>
                </div>
              )}
            </div>

            <div className="px-4 py-2 text-right">
              <p className="text-sm">{formatTime(Number(transaction.time))}</p>

              <p className="text-xs text-gray-500">
                {formatDate(Number(transaction.time))}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-end">
          <div className="flex flex-col">
            <div
              className={`px-2 py-2 flex ${
                transaction.from.toLowerCase() === walletAddress.toLowerCase()
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              <span className=" mr-1 sm:hidden block ">
                {transaction.from.toLowerCase() === walletAddress.toLowerCase()
                  ? "-"
                  : "+"}{" "}
              </span>
              <span className="dark:text-white mr-1 sm:block hidden text-black">
                {transaction.from.toLowerCase() === walletAddress.toLowerCase()
                  ? "Sent"
                  : "Received"}{" "}
              </span>
              {transaction.token !== ethers.constants.AddressZero
                ? formatAmount(
                    transaction.value / 10 ** Number(currentToken.decimals)
                  )
                : formatAmount(transaction.value / 10 ** 18)}{" "}
              {currentToken.symbol}
              <span className="dark:text-white ml-1.5 sm:block hidden text-black">
                {transaction.from.toLowerCase() === walletAddress.toLowerCase()
                  ? "to"
                  : "from"}{" "}
              </span>
            </div>
            <div className="px-2 text-sm">
              <CopyToClipboard
                text={
                  transaction.from.toLowerCase() === walletAddress.toLowerCase()
                    ? transaction.to
                    : transaction.from
                }
              />
            </div>
          </div>

          {transaction.status === "success" && (
            <div className="px-4 py-2">
              <div className="flex gap-2 justify-end">
                <Tooltip content="Copy transaction hash">
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
                </Tooltip>
                <Tooltip content="View on explorer">
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
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default TransactionItem;
