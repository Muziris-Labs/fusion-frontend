"use client";

import { Button, Tooltip } from "@material-tailwind/react";
import { ArrowLeft, Loader2, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEthTokenConversion } from "@/utils/conversionUtils";
import formatAmount from "@/utils/formatAmount";
import { usePathname, useRouter } from "next/navigation";
import useWallet from "@/hooks/useWallet";
import config from "@/lib/config";

export default function TopBar() {
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const pathname = usePathname();
  const router = useRouter();
  const { getDomain } = useWallet();
  const domain = getDomain();
  const defaultToken = useSelector((state) => state.user.defaultToken);

  const [ethConversionData, setEthConversionData] = useState(null);

  useEffect(() => {
    if (tokenConversionData) {
      const conversionData = getEthTokenConversion(
        tokenConversionData,
        defaultToken
      );

      setEthConversionData(conversionData);
    }
  }, [tokenConversionData, defaultToken]);

  const isMainnet = config?.chains[0]?.isMainnet;

  return (
    <div className="w-full flex justify-between gap-4 py-14 pb-10 items-center">
      <div className="lg:hidden gap-4 items-center flex">
        {pathname !== "/dashboard" && (
          <Button
            color="white"
            className="bg-transparent border-[1px] flex items-center gap-2 border-black/10 rounded-2xl dark:border-white/10 shadow-md py-3 px-3 normal-case font-normal text-sm text-gray-600"
            onClick={() => {
              router.push("/dashboard?domain=" + domain);
            }}
          >
            <ArrowLeft size={16} />
          </Button>
        )}
        <p className="dark:text-white text-xl">Fusion</p>
        {!isMainnet && (
          <Tooltip placement="top" content="Testnet">
            <div className="bg-red-500/20 -ml-2 rounded-xl p-1 text-xs mt-1 font-light text-red-500">
              <div className="bg-red-700 h-2 rounded-full w-2"></div>
            </div>
          </Tooltip>
        )}
      </div>
      <div className="flex-1 justify-end flex gap-4">
        <div className="rounded-2xl p-4 py-3 gap-2 hidden lg:flex items-center justify-center text-gray-600 dark:border-white/10 border-black/10 font-normal text-sm border-[1px]">
          {defaultToken && (
            <Image
              src={defaultToken?.block}
              className="opacity-40 dark:invert"
              width={18}
              height={18}
              alt="ETH"
            />
          )}
          ≈{" "}
          {ethConversionData ? (
            formatAmount(ethConversionData, 2)
          ) : (
            <Loader2 className="animate-spin" size={16} />
          )}{" "}
          USD
        </div>
        {pathname !== "/settings" && (
          <Button
            color="white"
            className="bg-transparent border-[1px] flex lg:hidden items-center gap-2 border-black/10 rounded-2xl dark:border-white/10 shadow-md py-3 px-3 lg:px-5 normal-case font-normal text-sm text-gray-600"
            onClick={() => {
              router.push("/settings?domain=" + domain);
            }}
          >
            <Settings size={16} className="ml-0 lg:ml-0.5" />
            <span className="hidden lg:block">Settings</span>
          </Button>
        )}
        <Button
          color="white"
          className="bg-transparent border-[1px] flex items-center gap-2 border-black/10 rounded-2xl dark:border-white/10 shadow-md py-3 px-3 lg:px-5 normal-case font-normal text-sm text-gray-600"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <LogOut size={16} className="ml-0 lg:ml-0.5" />
          <span className="hidden lg:block">Logout</span>
        </Button>
      </div>
    </div>
  );
}
