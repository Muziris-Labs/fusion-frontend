"use client";

import SettingItem from "@/components/ui/SettingItem";
import { Button } from "@material-tailwind/react";
import { ArrowRightFromLine, CornerDownLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStep, toggleTokenModal } from "@/redux/slice/transferSlice";
import Image from "next/image";

export default function TransferStep0() {
  const dispatch = useDispatch();
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const tokenModal = useSelector((state) => state.transfer.tokenModal);

  const handleNextStep = () => {
    if (selectedToken && selectedChain && !tokenModal) {
      dispatch(setStep(1));
    }
  };

  const handleToggleTokenDrawer = () => {
    dispatch(toggleTokenModal());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    } else if (event.key === "t") {
      event.preventDefault;
      handleToggleTokenDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedToken, selectedChain, tokenModal]);

  return (
    <section className="flex flex-col h-full w-full gap-10 dark:text-white justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold">Select a token</h1>
        <p className="text-sm text-gray-500">
          Please select a token to transfer.
        </p>
      </div>

      <Button
        color="white"
        className="bg-transparent dark:text-white dark:border-white/20 border-[1px] flex overflow-hidden items-center gap-2 border-black/20 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-black w-full h-20"
        onClick={handleToggleTokenDrawer}
      >
        {!selectedToken && !selectedChain && (
          <div className="flex items-center justify-center w-full h-full gap-2">
            Select a token
            <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg dark:border-white border-black border">
              T
            </div>
          </div>
        )}
        {selectedToken && selectedChain && (
          <div className="flex h-full w-full justify-between p-2 relative ">
            <div className="flex gap-2">
              <div className="flex flex-col items-start">
                <p className="text-sm font-bold">{selectedToken.symbol}</p>
                <p className="text-xs font-normal ">{selectedChain.name}</p>
              </div>
            </div>

            <Image
              src={selectedToken.logo}
              alt={selectedToken.name}
              width={100}
              height={30}
              className="rounded-full absolute -bottom-6 -z-0 -left-10 opacity-10"
            />

            <div className="flex gap-2">
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-light ">Change Token</p>
                <div className="w-4 h-4 flex justify-center items-center rounded-md dark:border-white text-xs p-2 border-black border">
                  T
                </div>
              </div>
            </div>
          </div>
        )}
      </Button>

      <SettingItem
        title="Proceed to Next Step"
        description="Select a token to transfer and proceed to the next step."
        icon={<ArrowRightFromLine size={22} className="mt-1" />}
        isLast
      >
        <Button
          color="white"
          className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
          onClick={handleNextStep}
          disabled={!selectedToken || !selectedChain}
        >
          Next
          <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-white border">
            <CornerDownLeft size={12} />
          </div>
        </Button>
      </SettingItem>
    </section>
  );
}
