"use client";

import config from "@/lib/config";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ChainSelector({ chainFilter, setChainFilter }) {
  const dispatch = useDispatch();
  return config.chains.map((chain) => (
    <>
      <Button
        className="border-[1px] border-black flex items-center font-normal gap-2 px-3 py-2 normal-case"
        color="white"
        onClick={() => dispatch(setChainFilter(null))}
      >
        All
      </Button>

      <Button
        key={chain.name}
        className="border-[1px] border-black flex items-center font-normal gap-2 px-3 py-2 normal-case"
        color="white"
        onClick={() => dispatch(setChainFilter(chain.chainId))}
        style={{
          borderColor: chainFilter === chain.chainId ? "#1D4ED8" : "black",
          borderWidth: chainFilter === chain.chainId ? "2px" : "1px",
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <Image
          src={chain.logo}
          alt={chain.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        {chain.name}
      </Button>
    </>
  ));
}
