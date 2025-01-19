"use client";

import React from "react";
import { useSelector } from "react-redux";

import TransactionList from "../../transaction/TransactionList";
import {
  ExternalLinkIcon,
  RefreshCcw,
  TriangleAlert,
  XCircleIcon,
} from "lucide-react";
import { Button } from "@material-tailwind/react";
import useWallet from "@/hooks/useWallet";
import { ethers } from "ethers";
import config from "@/lib/config";
import Image from "next/image";

const DashboardTable = ({ size = 3 }) => {
  const history = useSelector((state) => state.user.history);

  const mainAddress = useSelector((state) => state.user.walletAddress);

  const { loadTransactions } = useWallet();

  let transactions = [];
  if (size !== 0) {
    transactions = history.slice(0, size);
  } else {
    transactions = history;
  }

  const walletAddresses = useSelector((state) => state.user.walletAddresses);

  const allDeployed = walletAddresses
    ? walletAddresses.every(
        (address) => address.address !== ethers.constants.AddressZero
      )
    : false;

  return (
    <div
      className="min-h-[200px] flex flex-col gap-5 w-full h-full"
      style={{
        justifyContent:
          transactions && transactions.length > 0 ? "flex-start" : "center",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-normal dark:text-white mb-2">
          Transactions
        </h1>

        <Button
          color="white"
          className="bg-[#6b46fe]/70 text-white flex items-center gap-2 rounded-2xl shadow-md py-3 normal-case font-normal text-sm"
          onClick={() => {
            loadTransactions();
          }}
        >
          <RefreshCcw size={16} />
          <span className="hidden lg:block">Refresh</span>
        </Button>
      </div>
      <div className="flex-1 overflow-y-scroll hide-scroll rounded-t-xl">
        {!allDeployed && (
          <div className="border flex items-center rounded-2xl mb-5 border-light-blue-700 dark:text-white relative p-4 pb-5 overflow-hidden">
            <div className="relative h-full">
              <TriangleAlert
                size={250}
                className="text-light-blue-700 opacity-10 sm:opacity-15 -top-[120px] -left-14 absolute"
              />
            </div>
            <div className="flex flex-col flex-1 sm:ml-[100px] z-10">
              <h1 className="text-lg">Don't see your tokens</h1>
              <p className="text-gray-500 text-sm mb-2">
                Your Fusion Wallet is not deployed yet so we can only display
                your balance. Deploy your wallet by making your first
                transaction through the Fusion Wallet. You can always view your
                transactions on the block explorer.
              </p>

              {config.chains.map((chain) => {
                const walletAddress =
                  walletAddresses &&
                  walletAddresses.find(
                    (address) => address.chainId === chain.chainId
                  );

                if (
                  walletAddress &&
                  walletAddress.address !== ethers.constants.AddressZero
                )
                  return null;

                return (
                  <div className="flex items-center gap-2" key={chain.chainId}>
                    <Image
                      width={16}
                      height={16}
                      src={chain.logo}
                      alt={chain.name}
                    />
                    <a
                      key={chain.chainId}
                      href={
                        chain.transactions.browserUrl + "address/" + mainAddress
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-light-blue-700 flex gap-1 text-sm underline"
                    >
                      {chain.name} Explorer{" "}
                      <ExternalLinkIcon size={16} className="mt-0.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {transactions && transactions.length > 0 && (
          <div className="min-w-full">
            <TransactionList transactions={transactions} />
          </div>
        )}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center text-gray-500 w-full flex flex-col items-center justify-center">
            <XCircleIcon size={50} className="mb-2" />
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
