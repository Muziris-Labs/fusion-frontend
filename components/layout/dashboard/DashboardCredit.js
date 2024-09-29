"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateTotalBalance, usdToEth } from "@/utils/conversionUtils";
import formatAmount from "@/utils/formatAmount";
import useWallet from "@/hooks/useWallet";
import Image from "next/image";
import { Button, Tooltip } from "@material-tailwind/react";
import {
  ArrowDownUp,
  CircleFadingPlus,
  Copy,
  Forward,
  Loader2,
  ScanLine,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MobileButton from "@/components/ui/MobileButton";

const DashboardCredit = () => {
  const [totalEthBalance, setTotalEthBalance] = React.useState(null);
  const [totalBalance, setTotalBalance] = React.useState(null);

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const walletAddress = useSelector((state) => state.user.walletAddress);

  const { getDomain } = useWallet();
  const domain = getDomain();
  const router = useRouter();

  useEffect(() => {
    if (tokenBalanceData && tokenConversionData) {
      const totalBalance = calculateTotalBalance(
        tokenConversionData,
        tokenBalanceData
      );

      setTotalBalance(totalBalance);

      const totalEthBalance = usdToEth(totalBalance, tokenConversionData);

      setTotalEthBalance(totalEthBalance);
    }
  }, [tokenBalanceData, tokenConversionData]);

  return (
    <div
      className={`flex flex-col w-full flex-none border border-black/10 dark:text-white dark:border-white/10 pb-8 border-t-0 border-x-0`}
    >
      <div className="flex flex-col w-full gap-2.5 ">
        <h2 className="font-light">Portfolio Value</h2>

        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/block/eth-block.svg"
              width={30}
              height={30}
              alt="ETH"
              className="mt-0.5 opacity-80 dark:invert"
            />
            <p className="text-5xl font-semibold">
              {totalEthBalance === null ? (
                <Loader2 className="animate-spin" size={50} />
              ) : (
                formatAmount(totalEthBalance)
              )}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Tooltip placement="top" content="Coming Soon">
              <Button
                color="white"
                className="bg-[#6b46fe]/10 dark:bg-[#6b46fe]/20 text-[#6b46fe] hidden lg:flex items-center gap-2 rounded-2xl shadow-md py-3 normal-case font-normal text-sm"
              >
                <CircleFadingPlus size={16} />
                Add Funds
              </Button>
            </Tooltip>

            <Button
              color="white"
              className="bg-[#6b46fe]/70  text-white hidden lg:flex items-center gap-2 rounded-2xl shadow-md py-3 normal-case font-normal text-sm"
              onClick={() => {
                router.push(`/transfer?domain=${domain}`);
              }}
            >
              <Forward size={16} />
              Send
            </Button>

            <Button
              color="white"
              className="bg-transparent border-[1px] flex items-center gap-2 dark:border-white/10 border-black/10 rounded-2xl shadow-md p-3 px-4 normal-case font-normal text-sm text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                toast.success("Address copied to clipboard");
              }}
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>

        <p className="text-normal -mt-1 font-normal text-gray-600 flex items-center gap-2">
          ≈ ${" "}
          {totalBalance === null ? (
            <Loader2 className="animate-spin" size={10} />
          ) : (
            formatAmount(totalBalance, 2)
          )}{" "}
        </p>
      </div>

      <div className="w-full flex items-center mt-5 justify-between lg:hidden">
        <MobileButton
          title="Send"
          onClick={() => {
            router.push(`/transfer?domain=${domain}`);
          }}
        >
          <Forward size={16} className="text-white" />
        </MobileButton>
        <MobileButton
          title="Receive"
          onClick={() => {
            router.push(`/receive?domain=${domain}`);
          }}
        >
          <ScanLine size={16} className="text-white" />
        </MobileButton>
        <MobileButton
          title="History"
          onClick={() => {
            router.push(`/transactions?domain=${domain}`);
          }}
        >
          <ArrowDownUp size={16} className="text-white" />
        </MobileButton>

        <MobileButton
          title="Settings"
          onClick={() => {
            router.push(`/settings?domain=${domain}`);
          }}
        >
          <Settings size={16} className="text-white" />
        </MobileButton>
      </div>
    </div>
  );
};

export default DashboardCredit;
