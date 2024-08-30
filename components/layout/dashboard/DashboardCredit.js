"use client";

import { ChevronRight } from "lucide-react";

import React, { useEffect } from "react";
import Link from "next/link";

import FusionCard from "@/components/ui/FusionCard";
import { useSelector } from "react-redux";
import { calculateTotalBalance, usdToEth } from "@/utils/conversionUtils";
import formatAmount from "@/utils/formatAmount";
import useWallet from "@/hooks/useWallet";

const DashboardCredit = () => {
  const token = "USD";

  const [totalEthBalance, setTotalEthBalance] = React.useState(0);
  const [totalBalance, setTotalBalance] = React.useState(0);

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const { getDomain } = useWallet();
  const domain = getDomain();
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
    <FusionCard className={`flex justify-between flex-none p-6`}>
      <div className="space-y-2.5">
        <h2>Active Credit</h2>

        <div className="space-y-1">
          <p className="text-4xl font-semibold">
            {formatAmount(totalBalance, 2)}{" "}
            <span className="uppercase text-2xl font-normal">{token}</span>
          </p>

          <p className="text-sm text-gray-700">
            {formatAmount(totalEthBalance)} ETH
          </p>
        </div>
      </div>

      <Link
        href={`receive?domain=${domain}`}
        className="rounded-full bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <ChevronRight size={20} />
      </Link>
    </FusionCard>
  );
};

export default DashboardCredit;
