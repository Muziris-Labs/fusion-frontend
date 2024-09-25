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
    <div className="w-full flex justify-end gap-4 py-14 pb-10">
      <div className="rounded-2xl p-4 py-3 gap-2 flex items-center justify-center text-gray-600 border-black/10 font-normal text-sm border-[1px] ">
        <Image
          src="/block/eth-block.svg"
          className="opacity-40"
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
        className="bg-transparent border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-gray-600"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
}
