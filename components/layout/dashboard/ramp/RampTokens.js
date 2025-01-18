"use client";

import { Button, Tooltip } from "@material-tailwind/react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function RampTokens({
  chain,
  token,
  selectedToken,
  setToken,
  selectedChain,
}) {
  const isSelected =
    selectedToken?.address === token.address &&
    selectedChain?.chainId === chain.chainId;

  const dispatch = useDispatch();
  return (
    <div
      className="relative rounded-2xl w-full overflow-hidden"
      key={token.name}
    >
      <Button
        className="border-[1px] w-full rounded-2xl border-black flex items-center overflow-hidden font-normal gap-2 px-3 py-2 normal-case"
        color="white"
        style={{
          borderColor: isSelected ? "#1D4ED8" : "black",
          borderWidth: isSelected ? "2px" : "1px",
        }}
        disabled={token.ramp.isSupported ? false : true}
        onClick={() => {
          if (!setToken) return;

          dispatch(setToken({ token, chain }));
        }}
      >
        {isSelected && (
          <div className="p-2 rounded-full bg-[#1D4ED8] rounded-t-none rounded-br-none absolute top-0 right-0">
            <Check size={10} color="white" className="-mt-0.5 ml-1" />
          </div>
        )}
        <div className="flex h-full w-full justify-between p-2 relative ">
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold text-black">{token.name}</p>
              <p className="text-xs font-normal text-black">{token.symbol}</p>
            </div>
          </div>

          <Image
            src={token.logo}
            alt={token.name}
            width={100}
            height={30}
            className="rounded-full absolute -bottom-6 -z-0 -left-10 opacity-10"
          />

          <div className="flex flex-col items-end">
            {!token.ramp.isSupported && (
              <>
                {" "}
                <p className="text-sm font-bold text-black">Unavailable</p>
                <p className="text-xs font-normal text-gray-700">
                  No Ramp support
                </p>
              </>
            )}

            {token.ramp.isSupported && (
              <div className="flex items-center -space-x-3 relative">
                {token.ramp.providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="bg-gray-100 group rounded-full relative p-1 hover:border-black border border-transparent transition-colors z-0 hover:z-10"
                  >
                    <Image
                      src={provider.logo}
                      alt="Ramp"
                      width={25}
                      height={25}
                      className="rounded-full"
                    />

                    <div className="hidden group-hover:block absolute -bottom-5 -left-1 z-10 bg-gray-50 p-1 text-xs rounded-lg shadow-md">
                      {provider.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Button>
    </div>
  );
}
