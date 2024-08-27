"use client";

import formatAmount from "@/utils/formatAmount";
import { Button } from "@material-tailwind/react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Tokens({
  chain,
  token,
  selectedToken,
  setToken,
  selectedChain,
  disabled,
}) {
  const isSelected =
    selectedToken?.address === token.address &&
    selectedChain?.chainId === chain.chainId;

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const currentBalanceData = tokenBalanceData?.find(
    (B) => B.chainId === chain.chainId
  );
  const currentBalance = currentBalanceData?.chainData.find(
    (B) => B.address === token.address
  )?.balance;

  const currentConversionData = tokenConversionData?.find(
    (C) => C.chainId === chain.chainId
  );

  const currentConversion = currentConversionData?.chainData.find(
    (C) => C.address === token.address
  )?.value;

  const dispatch = useDispatch();
  return (
    <div className="relative rounded-2xl overflow-hidden" key={token.name}>
      <Button
        className="border-[1px] w-36 h-36 rounded-2xl border-black flex items-center overflow-hidden font-normal gap-2 px-3 py-2 normal-case"
        color="white"
        style={{
          borderColor: isSelected ? "#1D4ED8" : "black",
          borderWidth: isSelected ? "2px" : "1px",
        }}
        disabled={!currentConversion || !currentBalance || disabled}
        onClick={() => {
          if (!setToken) return;
          dispatch(setToken({ token, chain }));
        }}
      >
        {isSelected && (
          <div className="p-2 rounded-full bg-[#1D4ED8] rounded-t-none rounded-br-none absolute top-0 right-0">
            <Check size={20} color="white" className="-mt-0.5 ml-1" />
          </div>
        )}
        <div className=" flex-col flex h-full w-full justify-between p-2 relative ">
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold text-gray-600">{token.name}</p>
              <p className="text-xs font-normal text-gray-500">
                {token.symbol}
              </p>
            </div>
          </div>

          <Image
            src={token.logo}
            alt={token.name}
            width={100}
            height={30}
            className="rounded-full absolute -bottom-6 -z-0 -right-8 opacity-20"
          />

          <div className="flex flex-col items-start">
            <p className="text-sm font-bold text-black">
              ${" "}
              {currentConversion && currentBalance
                ? formatAmount(
                    (currentBalance / 10 ** token.decimals) * currentConversion
                  )
                : 0}
            </p>
            <p className="text-xs font-normal text-gray-700">
              {currentBalance
                ? formatAmount(currentBalance / 10 ** token.decimals)
                : 0}{" "}
              {token.symbol}
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
}
