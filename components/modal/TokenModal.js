"use client";

import { toggleTokenModal } from "@/redux/slice/transferSlice";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Mouse } from "lucide-react";
import React from "react";
import { setChainFilter, setToken } from "@/redux/slice/transferSlice";
import config from "@/lib/config";
import ChainSelector from "../layout/transfer/token/ChainSelector";
import TokenSelector from "../layout/transfer/token/TokenSelector";

export default function TokenModal() {
  const open = useSelector((state) => state.transfer.tokenModal);
  const dispatch = useDispatch();
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

  const handleDrawer = () => {
    dispatch(toggleTokenModal());
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={handleDrawer}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
        <section className="flex flex-col h-full gap-4 justify-between">
          <div className="flex w-full flex-wrap gap-2">
            <ChainSelector
              chainFilter={chainFilter}
              setChainFilter={setChainFilter}
            />
          </div>
          <div
            className="flex flex-col w-full h-[400px] justify-start overflow-scroll hide-scroll gap-3"
            ref={divRef}
          >
            <TokenSelector
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              setToken={setToken}
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

          <Button
            color="white"
            className="bg-transparent border-[1px] flex items-center gap-2 border-black/20 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-black w-full h-14"
            onClick={() => {
              handleDrawer();
            }}
          >
            <div className="flex items-center justify-center w-full h-full gap-2">
              Confirm
              <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-black border">
                T
              </div>
            </div>
          </Button>
        </section>
      </DialogBody>
    </Dialog>
  );
}
