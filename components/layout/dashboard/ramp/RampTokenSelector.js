"use client";

import config from "@/lib/config";
import RampTokens from "./RampTokens";

export default function RampTokenSelector({
  selectedChain = null,
  selectedToken = null,
  setToken = null,
  chainFilter,
}) {
  return config.chains.map((chain) =>
    chainFilter === null || chainFilter === chain.chainId ? (
      <div
        key={chain.name}
        id={chain.name}
        className="flex flex-col items-start gap-3 "
      >
        <h2 className="text-xs font-normal text-gray-500">{chain.name}</h2>
        <div className="flex flex-col gap-2 w-full">
          {chain.tokens.map((token) => (
            <RampTokens
              chain={chain}
              token={token}
              key={token.name}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
              setToken={setToken}
            />
          ))}
        </div>
      </div>
    ) : null
  );
}
