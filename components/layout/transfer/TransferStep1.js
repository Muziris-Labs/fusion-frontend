"use client";

import {
  setAmount as setFinalAmount,
  setStep,
} from "@/redux/slice/transferSlice";
import { Button } from "@material-tailwind/react";
import {
  ArrowRightFromLine,
  ArrowUpDown,
  CornerDownLeft,
  Minus,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SettingItem from "@/components/ui/SettingItem";

export default function TransferStep1() {
  const [amount, setAmount] = useState("0.0");
  const dispatch = useDispatch();
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const [isValid, setIsValid] = useState(false);
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const currentBalanceData = tokenBalanceData?.find(
    (B) => B.chainId === selectedChain?.chainId
  );
  const currentBalance = currentBalanceData?.chainData.find(
    (B) => B.address === selectedToken?.address
  )?.balance;
  const [toggle, setToggle] = useState(false);

  const currentConversionData = tokenConversionData?.find(
    (C) => C.chainId === selectedChain?.chainId
  );

  const currentConversion = currentConversionData?.chainData.find(
    (C) => C.address === selectedToken?.address
  )?.value;

  const handleNextStep = () => {
    if (selectedToken && selectedChain && isValid && Number(amount) > 0) {
      dispatch(setStep(2));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [selectedToken, selectedChain, isValid, amount]);

  useEffect(() => {
    if (selectedToken && selectedChain) {
      checkAmount();
    }
  }, [
    currentBalance,
    currentConversion,
    toggle,
    amount,
    selectedChain,
    selectedToken,
  ]);

  const checkAmount = () => {
    if (currentBalance && currentConversion) {
      if (
        toggle &&
        Number(amount) <= currentBalance / 10 ** selectedToken.decimals
      ) {
        dispatch(setFinalAmount(Number(amount)));
        setIsValid(true);
      } else if (
        !toggle &&
        Number(amount) <=
          (currentBalance / 10 ** selectedToken.decimals) * currentConversion
      ) {
        dispatch(setFinalAmount(Number(amount) / currentConversion));
        setIsValid(true);
      } else {
        setIsValid(false);
        dispatch(setFinalAmount(0));
      }
    } else {
      setIsValid(false);
      dispatch(setFinalAmount(0));
    }
  };

  return (
    <section className="flex flex-col h-full w-full gap-10 justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold">Enter Amount</h1>
        <p className="text-sm text-gray-500">
          Enter the amount you want to transfer
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-2 mt-10 border border-black/10 border-t-0 border-x-0 pb-10">
        <div className=" flex justify-between items-center gap-2">
          <Button
            className="rounded-full w-8 h-8 flex justify-center items-center p-0"
            onClick={() => {
              if (amount > 0) {
                setAmount(Number(amount) - 1);
              }
            }}
          >
            <Minus size={16} className="" />
          </Button>
          <input
            className="text-center text-7xl w-[350px] outline-none bg-transparent"
            value={amount}
            autoFocus
            onChange={(e) => {
              const decimalRegex = /^[0-9]*\.?[0-9]*$/;
              if (e.target.value.match(decimalRegex)) {
                setAmount(e.target.value);
              }
            }}
            style={{
              color: isValid ? "black" : "red",
            }}
          ></input>
          <Button
            className="rounded-full w-8 h-8 flex justify-center items-center p-0"
            onClick={() => {
              setAmount(Number(amount) + 1);
            }}
          >
            <Plus size={16} className="" />
          </Button>
        </div>
        <p className="text-2xl font-bold">
          {!toggle ? "USD" : selectedToken?.symbol}
        </p>
        <div className="flex w-full items-center justify-center gap-2 mt-5">
          <Button
            className="border-[1px] w-14 border-black justify-center flex items-center font-normal gap-2 px-3 py-2 normal-case"
            color="white"
            onClick={() => {
              setToggle(!toggle);
            }}
            disabled={!selectedToken || !selectedChain}
          >
            <ArrowUpDown size={16} className="" />
          </Button>
          <Button
            className="border-[1px] w-14 justify-center border-black flex items-center font-normal gap-2 px-3 py-2 normal-case"
            color="white"
            onClick={() => {
              if (currentBalance) {
                setAmount(
                  toggle
                    ? (currentBalance / 10 ** selectedToken.decimals).toFixed(5)
                    : (
                        (currentBalance / 10 ** selectedToken.decimals) *
                        currentConversion
                      ).toFixed(5)
                );
              }
            }}
            disabled={
              !selectedToken ||
              !selectedChain ||
              !currentBalance ||
              !currentConversion
            }
          >
            MAX
          </Button>
        </div>
      </div>

      <SettingItem
        title="Proceed to Next Step"
        description="Confirm the amount and proceed to the next step"
        icon={<ArrowRightFromLine size={22} className="mt-1" />}
        isLast
      >
        <Button
          color="white"
          className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
          onClick={handleNextStep}
          disabled={
            !selectedToken || !selectedChain || !isValid || Number(amount) <= 0
          }
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
