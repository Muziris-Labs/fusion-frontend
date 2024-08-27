"use client";

import shortenAddress from "@/utils/shortenAddress";
import { Button, Tooltip } from "@material-tailwind/react";
import { ArrowUpDown, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import formatAmount from "@/utils/formatAmount";
import { setStep } from "@/redux/slice/transferSlice";
import { toggleProofDrawer } from "@/redux/slice/proofSlice";

export default function TransferStep3() {
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const dispatch = useDispatch();
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const gasAmount = useSelector((state) => state.transfer.gasAmount);

  const [toggle, setToggle] = useState(false);

  const currentConversionData = tokenConversionData?.find(
    (C) => C.chainId === selectedChain?.chainId
  );

  const currentConversion = currentConversionData?.chainData.find(
    (C) => C.address === selectedToken?.address
  )?.value;

  return (
    <section className="flex flex-col h-full w-full gap-10 justify-between items-center">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl font-semibold">Confirm Transaction</h1>
        <p className="text-sm text-gray-500">
          Please confirm the transaction details below before proceeding.
        </p>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <p>Sending</p>
        <Tooltip content={recipient} placement="bottom-start">
          <p className="font-semibold text-xl">{shortenAddress(recipient)}</p>
        </Tooltip>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <div className=" flex flex-col items-end">
          <p className="text-6xl font-bold">
            {toggle
              ? formatAmount(Number(amount), 2)
              : (Number(amount) * currentConversion).toFixed(2)}{" "}
            {toggle ? selectedToken.symbol : "USD"}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-500">
              {" "}
              + {gasAmount ? formatAmount(Number(gasAmount), 2) : "≈"}{" "}
              {toggle ? selectedToken.symbol : "USD"}
            </p>
            <Tooltip
              content="
              Fees to be paid to transfer the token.
            "
              placement="bottom-end"
            >
              <Info size={16} className="text-gray-500 hover:cursor-pointer" />
            </Tooltip>
          </div>
        </div>

        <Button
          className="rounded-full w-8 h-8 flex justify-center items-center p-0"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <ArrowUpDown size={12} className="" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
          onClick={() => {
            dispatch(toggleProofDrawer());
          }}
        >
          Approve
        </Button>
        <Button
          className=" w-full p-5 font-semibold border-[1px] border-black rounded-full text-sm font-outfit normal-case"
          color="white"
          onClick={() => {
            dispatch(setStep(0));
          }}
        >
          Back
        </Button>
      </div>
    </section>
  );
}
