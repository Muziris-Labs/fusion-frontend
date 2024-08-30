"use client";

import config from "@/lib/config";
import Chains from "./Chains";
import React from "react";
import { Mouse } from "lucide-react";
import { setStep } from "@/redux/slice/deploySlice";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

export default function DeployStep1() {
  const divRef = React.useRef(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const selectedChain = useSelector((state) => state.deploy.selectedChain);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!divRef.current) return;

    if (divRef.current.scrollHeight > divRef.current.clientHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [config]);

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">Select Chain</h1>
        <p className="text-sm text-left text-gray-500">
          Choose the chain you want to deploy your Fusion on
        </p>
      </div>

      <div
        className="max-h-[200px] w-[320px] overflow-scroll hide-scroll"
        ref={divRef}
      >
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {config.chains.map((chain) => (
            <Chains key={chain.chainId} chain={chain} />
          ))}
        </div>
      </div>

      {isOverflowing && (
        <div className="w-full -mt-4 flex justify-center gap-1 text-xs font-light items-center">
          <Mouse size={15} className="animate-bounce" />
          Scroll to see more Chains
        </div>
      )}

      <Button
        className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={!selectedChain}
      >
        Next
      </Button>
    </>
  );
}
