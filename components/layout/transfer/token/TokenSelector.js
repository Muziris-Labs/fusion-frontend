"use client";

import config from "@/lib/config";
import Tokens from "./Tokens";

export default function TokenSelector({
  selectedChain = null,
  selectedToken = null,
  setToken = null,
  chainFilter,
  activeStep = 0,
  selectionStep = 0,
}) {
  return config.chains.map((chain) =>
    chainFilter === null || chainFilter === chain.chainId ? (
      <div key={chain.name} id={chain.name} className="flex flex-col gap-3 ">
        <h2 className="text-xs font-normal text-gray-500">{chain.name}</h2>
        <div className="flex gap-4 flex-wrap w-full">
          {chain.tokens.map((token) => (
            <Tokens
              chain={chain}
              token={token}
              key={token.name}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
              setToken={setToken}
              disabled={activeStep !== selectionStep}
            />
          ))}
        </div>
      </div>
    ) : null
  );
}
