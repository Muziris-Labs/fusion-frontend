"use client";

import { setAmount, setStep } from "@/redux/slice/rampSlice";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRightFromLine,
  ArrowUpDown,
  CornerDownLeft,
  Minus,
  Plus,
  X,
} from "lucide-react";
import SettingItem from "@/components/ui/SettingItem";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function RampStep1() {
  const amount = useSelector((state) => state.ramp.amount);
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (amount > 0) dispatch(setStep(2));
    } else if (event.key === "Escape") {
      event.preventDefault;
      dispatch(setStep(0));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [amount]);

  return (
    <section className="flex flex-col h-full dark:text-white w-full gap-10 justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold ">Enter Amount</h1>
        <p className="text-sm text-gray-500">
          Enter the amount you want to transfer
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-2 mt-10 border dark:border-white/10 border-black/10 border-t-0 border-x-0 pb-10">
        <div className=" flex justify-between items-center gap-2">
          <Button
            className="rounded-full w-8 h-8 flex justify-center items-center p-0"
            onClick={() => {
              if (amount > 0) {
                dispatch(setAmount(Number(amount) - 1));
              }
            }}
          >
            <Minus size={16} className="" />
          </Button>
          <input
            className="text-center text-7xl w-[200px] sm:w-[350px] outline-none bg-transparent"
            value={amount}
            autoFocus
            onChange={(e) => {
              const decimalRegex = /^[0-9]*\.?[0-9]*$/;
              if (e.target.value.match(decimalRegex)) {
                dispatch(setAmount(e.target.value));
              }
            }}
            style={{
              color: resolvedTheme === "light" ? "black" : "white",
            }}
          ></input>
          <Button
            className="rounded-full w-8 h-8 flex justify-center items-center p-0"
            onClick={() => {
              dispatch(setAmount(Number(amount) + 1));
            }}
          >
            <Plus size={16} className="" />
          </Button>
        </div>
        <p className="text-2xl font-bold">USD</p>
        <div className="flex w-full items-center justify-center gap-2 mt-5">
          <Button
            className="border-[1px] w-14 border-black justify-center flex items-center font-normal gap-2 px-3 py-2 normal-case"
            color="white"
            onClick={() => {
              dispatch(setAmount(50));
            }}
            disabled={false}
          >
            $50
          </Button>
          <Button
            className="border-[1px] w-14 border-black justify-center flex items-center font-normal gap-2 px-3 py-2 normal-case"
            color="white"
            onClick={() => {
              dispatch(setAmount(100));
            }}
            disabled={false}
          >
            $100
          </Button>
          <Button
            className="border-[1px] w-14 justify-center border-black flex items-center font-normal gap-2 px-3 py-2 normal-case"
            color="white"
            onClick={() => {
              dispatch(setAmount(500));
            }}
            disabled={false}
          >
            $500
          </Button>
        </div>
      </div>

      <SettingItem
        title="Proceed to Next Step"
        description="Confirm the amount and proceed to the next step"
        icon={<ArrowRightFromLine size={22} className="mt-1" />}
      >
        <Button
          color="white"
          className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
          onClick={() => {
            dispatch(setStep(2));
          }}
          disabled={amount <= 0}
        >
          Next
          <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-white border">
            <CornerDownLeft size={12} />
          </div>
        </Button>
      </SettingItem>

      <SettingItem
        title={"Back to token selection"}
        description={
          "Go back to the token selection and change the token you want to buy"
        }
        icon={<ArrowLeft size={22} className="mt-1" />}
        isLast
      >
        <Button
          color="white"
          className="bg-transparent border-[1px] flex items-center gap-2 dark:border-white/10 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-gray-700 dark:text-gray-400"
          onClick={() => {
            dispatch(setStep(0));
          }}
        >
          Back
          <div className="w-6 -mr-2 h-6 flex justify-center items-center text-[10px] rounded-lg dark:border-white border-black border">
            Esc
          </div>
        </Button>
      </SettingItem>
    </section>
  );
}
