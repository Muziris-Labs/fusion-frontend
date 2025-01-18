"use client";

import { setAmount, setStep } from "@/redux/slice/rampSlice";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRightFromLine,
  ArrowUpDown,
  Check,
  CornerDownLeft,
  Minus,
  Plus,
  X,
} from "lucide-react";
import SettingItem from "@/components/ui/SettingItem";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import useRamp from "@/hooks/useRamp";

export default function RampStep3() {
  const amount = useSelector((state) => state.ramp.amount);
  const dispatch = useDispatch();
  const { stablyRamp } = useRamp();
  const [provider, setProvider] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const selectedToken = useSelector((state) => state.ramp.selectedToken);

  useEffect(() => {
    if (selectedToken) {
      setProvider(selectedToken.ramp.providers);
      setSelectedProvider(selectedToken.ramp.providers[0].id);
    }
  }, [selectedToken]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Add Ramping
    } else if (event.key === "Escape") {
      event.preventDefault;
      dispatch(setStep(1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section className="flex flex-col h-full dark:text-white w-full gap-10 justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold ">Select your provider</h1>
        <p className="text-sm text-gray-500">
          Select the provider you want to use to buy the token
        </p>
      </div>
      {provider &&
        provider.map((provider) => {
          return (
            <Button
              key={provider.name}
              color="white"
              className="bg-transparent dark:text-white dark:border-white/20 border-[1px] relative flex overflow-hidden items-center gap-2 border-black/20 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-black w-full h-20"
              onClick={() => {
                setSelectedProvider(provider.id);
              }}
              style={{
                borderColor: selectedProvider === provider.id ? "#1D4ED8" : "",
                borderWidth: selectedProvider === provider.id ? "2px" : "1px",
              }}
            >
              {selectedProvider === provider.id && (
                <div className="p-2 rounded-full bg-[#1D4ED8] rounded-t-none rounded-br-none absolute top-0 right-0 z-50">
                  <Check size={10} color="white" className="-mt-0.5 ml-1" />
                </div>
              )}

              {provider && (
                <div className="flex h-full w-full justify-between p-2 relative ">
                  <div className="flex gap-2">
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-bold">{provider.name}</p>
                      <p className="text-xs font-normal ">{provider.mode}</p>
                    </div>
                  </div>

                  <Image
                    src={provider.logo}
                    alt={selectedToken.name}
                    width={100}
                    height={30}
                    className="rounded-full absolute -bottom-6 -z-0 -right-10 opacity-40"
                  />
                </div>
              )}
            </Button>
          );
        })}

      <SettingItem
        title="Confirm to Buy"
        description="Confirm to buy the token with the provider you selected"
        icon={<ArrowRightFromLine size={22} className="mt-1" />}
      >
        <Button
          color="white"
          className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
          onClick={() => {
            if (selectedProvider === "stably") {
              stablyRamp(selectedProvider, selectedToken, amount);
            }
          }}
          disabled={amount <= 0}
        >
          Buy
          <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-white border">
            <CornerDownLeft size={12} />
          </div>
        </Button>
      </SettingItem>

      <SettingItem
        title={"Go Back to Previous Step"}
        description={
          "Go back to the previous step to change the amount you want to buy"
        }
        icon={<ArrowLeft size={22} className="mt-1" />}
        isLast
      >
        <Button
          color="white"
          className="bg-transparent border-[1px] flex items-center gap-2 dark:border-white/10 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-gray-700 dark:text-gray-400"
          onClick={() => {
            dispatch(setStep(1));
          }}
        >
          Back
          <div className="w-6 -mr-2 h-6 flex justify-center text-[9px] items-center rounded-lg dark:border-white border-black border">
            Esc
          </div>
        </Button>
      </SettingItem>
    </section>
  );
}
