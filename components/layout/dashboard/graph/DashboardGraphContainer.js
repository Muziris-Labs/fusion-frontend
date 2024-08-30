"use client";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";

import React from "react";
import Link from "next/link";

import DashboardGraph from "./DashboardGraph";
import FusionCard from "@/components/ui/FusionCard";
import { useSelector } from "react-redux";

const DashboardGraphContainer = () => {
  const [percentage, setPercentage] = React.useState(0);
  const marketData = useSelector((state) => state.user.marketData);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setActive(true);

    if (marketData) {
      const differene =
        marketData[0].closing_price -
        marketData[marketData.length - 1].closing_price;

      const percentage = (differene / marketData[0].closing_price) * 100;
      setPercentage(percentage.toFixed(2));
    }
  }, [marketData]);

  return (
    active && (
      <FusionCard>
        <div className="flex justify-between p-6 pb-0">
          <div className="flex flex-col">
            <h2>Featured Graph</h2>

            <p className="text-2xl font-semibold -mt-2 flex flex-col gap-2">
              <span className=" font-normal text-sm mt-2">Ethereum</span>
              <div className="flex items-end">
                {percentage > 0 ? (
                  <ArrowUp size={30} className="text-green-500" />
                ) : (
                  <ArrowDown size={30} className="text-red-500" />
                )}
                <span className="text-4xl">{Math.abs(percentage)}</span>%
              </div>
            </p>
          </div>

          <Link
            href="https://coinmarketcap.com/currencies/ethereum/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
        <div className="h-[260px]">
          <DashboardGraph />
        </div>
      </FusionCard>
    )
  );
};

export default DashboardGraphContainer;
