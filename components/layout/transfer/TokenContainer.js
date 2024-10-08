"use client";

import FusionCard from "@/components/ui/FusionCard";
import config from "@/lib/config";
import { Mouse } from "lucide-react";
import React from "react";
import ChainSelector from "./token/ChainSelector";
import TokenSelector from "./token/TokenSelector";
import { useSelector } from "react-redux";
import { setChainFilter, setToken } from "@/redux/slice/transferSlice";

export default function TokenContainer({
  height = "h-[450px]",
  selectable = true,
}) {
  const divRef = React.useRef(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const chainFilter = useSelector((state) => state.transfer.chainFilter);
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);

  React.useEffect(() => {
    if (!divRef.current) return;

    if (divRef.current.scrollHeight > divRef.current.clientHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [config]);

  return (
    <FusionCard className={`flex flex-col gap-4 p-6 flex-none ${height}`}>
      <div className="flex w-full flex-wrap gap-2">
        <ChainSelector
          chainFilter={chainFilter}
          setChainFilter={setChainFilter}
        />
      </div>
      <div
        className="flex-1 flex flex-col w-full justify-start overflow-scroll hide-scroll gap-3"
        ref={divRef}
      >
        <TokenSelector
          selectedChain={selectable ? selectedChain : null}
          selectedToken={selectable ? selectedToken : null}
          setToken={selectable ? setToken : null}
          chainFilter={chainFilter}
          activeStep={0}
          selectionStep={0}
        />
      </div>
      {isOverflowing && (
        <div className="w-full flex justify-center gap-1 -mb-2 text-xs font-light items-center">
          <Mouse size={15} className="animate-bounce" />
          Scroll to see more tokens
        </div>
      )}
    </FusionCard>
  );
}
