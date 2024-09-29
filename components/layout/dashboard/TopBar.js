"use client";

import { Button } from "@material-tailwind/react";
import { Loader2, LogOut } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEthTokenConversion } from "@/utils/conversionUtils";
import formatAmount from "@/utils/formatAmount";

export default function TopBar() {
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const [ethConversionData, setEthConversionData] = useState(null);

  useEffect(() => {
    if (tokenConversionData) {
      const conversionData = getEthTokenConversion(tokenConversionData);

      setEthConversionData(conversionData);
    }
  }, [tokenConversionData]);

  return (
    <div className="w-full flex justify-between gap-4 py-14 pb-10 items-center">
      <div className="lg:hidden gap-2 items-center flex">
        <p className="dark:text-white text-xl">Fusion</p>
        <div className="bg-red-500/20 rounded-xl p-1 px-2 text-xs font-light text-red-500">
          Testnet
        </div>
      </div>
      <div className="flex-1 justify-end flex gap-4">
        <div className="rounded-2xl p-4 py-3 gap-2 hidden lg:flex items-center justify-center text-gray-600 dark:border-white/10 border-black/10 font-normal text-sm border-[1px]">
          <Image
            src="/block/eth-block.svg"
            className="opacity-40 dark:invert"
            width={18}
            height={18}
            alt="ETH"
          />
          ≈{" "}
          {ethConversionData ? (
            formatAmount(ethConversionData, 2)
          ) : (
            <Loader2 className="animate-spin" size={16} />
          )}{" "}
          USD
        </div>
        <Button
          color="white"
          className="bg-transparent border-[1px] flex items-center gap-2 border-black/10 rounded-2xl dark:border-white/10 shadow-md py-3 normal-case font-normal text-sm text-gray-600"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <LogOut size={16} />
          <span className="hidden lg:block">Logout</span>
        </Button>
      </div>
    </div>
  );
}
