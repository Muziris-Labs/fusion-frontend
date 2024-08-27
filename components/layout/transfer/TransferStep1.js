"use client";

import {
  setAmount as setFinalAmount,
  setStep,
} from "@/redux/slice/transferSlice";
import { Button } from "@material-tailwind/react";
import { ArrowUpDown, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

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
    <section className="flex flex-col h-full gap-10 justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold">Enter Amount</h1>
        <p className="text-sm text-gray-500">
          Enter the amount you want to transfer
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 mt-14">
        <div className="w-full flex justify-between items-center gap-2">
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
            className="w-3/4 text-center text-7xl outline-none"
            value={amount}
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
        <div className="flex w-full items-center justify-center gap-2">
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

      <Button
        className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={!selectedToken || !selectedChain || !isValid || amount <= 0}
      >
        Next
      </Button>
    </section>
  );
}
