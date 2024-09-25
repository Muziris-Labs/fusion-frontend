"use client";

import config from "@/lib/config";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import formatAmount from "@/utils/formatAmount";
import { Loader2 } from "lucide-react";

export default function Token({ resolvedToken, isLast }) {
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const [totalBalance, setTotalBalance] = useState(null);
  const [totalTokenBalance, setTotalTokenBalance] = useState(null);

  useEffect(() => {
    if (tokenBalanceData && tokenConversionData) {
      let tokens = [];

      resolvedToken.chainId.forEach((chainId) => {
        const chain = config.chains.find((chain) => chain.chainId === chainId);

        chain.tokens.forEach((token) => {
          if (token.id === resolvedToken.token.id) {
            tokens.push({
              chainId: chainId,
              token: token,
            });
          }
        });
      });

      let totalBalance = 0;
      let totalTokenBalance = 0;

      tokens.forEach((token) => {
        const chainData = tokenBalanceData.find(
          (chainData) => chainData.chainId === token.chainId
        );

        const conversionChain = tokenConversionData.find(
          (conversion) => conversion.chainId === token.chainId
        );

        if (chainData && conversionChain) {
          const currentToken = chainData.chainData.find(
            (T) => T.address === token.token.address
          );

          const conversionToken = conversionChain.chainData.find(
            (conversion) => conversion.address === token.token.address
          );

          if (currentToken && conversionToken) {
            totalBalance +=
              (currentToken.balance / 10 ** token.token.decimals) *
              conversionToken.value;

            totalTokenBalance += currentToken.balance;
          }
        }
      });

      setTotalBalance(totalBalance);
      setTotalTokenBalance(totalTokenBalance);
    }
  }, [tokenBalanceData, tokenConversionData]);

  return (
    <div className="flex gap-7 items-center">
      <Image
        src={resolvedToken.token.logo}
        width={35}
        height={35}
        alt={`${resolvedToken.token.name} logo`}
        className="pb-5"
      />

      <div
        className="flex-1 flex items-center justify-between border-[1px] pb-5 border-black/10 border-t-0 border-x-0"
        style={{
          borderBottomWidth: isLast ? "0" : "1px",
        }}
      >
        <div className="flex flex-col gap-1 w-3/4">
          <p className="text-base font-slight">{resolvedToken.token.symbol}</p>
          <p className="text-xs font-light">{resolvedToken.token.name}</p>
        </div>

        <div className="flex flex-col w-32 gap-1 items-center">
          <div className="flex gap-2 items-center">
            {resolvedToken.chainId.map((chainId, index) => {
              const currentChain = config.chains.find(
                (chain) => chain.chainId === chainId
              );

              return (
                <Image
                  key={index}
                  src={currentChain.logo}
                  width={30}
                  height={20}
                  alt={`${currentChain.name} logo`}
                  className={
                    index === resolvedToken.chainId.length - 1 ? "" : "-mr-5"
                  }
                />
              );
            })}
          </div>

          <p className="text-xs font-light">Active Networks</p>
        </div>

        <div className="flex flex-col gap-1 items-end w-32">
          <div className="flex items-center gap-2">
            <Image
              src={resolvedToken.token.block}
              width={18}
              height={18}
              alt="ETH"
              className="opacity-100"
            />
            <p className="text-base font-slight">
              {totalTokenBalance === null ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                formatAmount(
                  totalTokenBalance / 10 ** resolvedToken.token.decimals,
                  4
                )
              )}
            </p>
          </div>
          <p className="text-xs font-light flex items-center gap-1">
            ≈ ${" "}
            {totalBalance === null ? (
              <Loader2 size={10} className="animate-spin" />
            ) : (
              formatAmount(totalBalance, 4)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
