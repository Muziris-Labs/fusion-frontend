"use client";

import shortenAddress from "@/utils/shortenAddress";
import { Button, Tooltip } from "@material-tailwind/react";
import {
  ArrowLeft,
  ArrowRightFromLine,
  ArrowUpDown,
  CornerDownLeft,
  Delete,
  Info,
  Loader2,
  UserRoundPen,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import formatAmount from "@/utils/formatAmount";
import { setGasAmount, setStep } from "@/redux/slice/transferSlice";
import { setTxProof, toggleProofDrawer } from "@/redux/slice/proofSlice";
import useExecute from "@/hooks/useExecute";
import SettingItem from "@/components/ui/SettingItem";

export default function TransferStep3() {
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const txProof = useSelector((state) => state.proof.txProof);
  const dispatch = useDispatch();
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const [isLoading, setIsLoading] = useState(false);
  const gasAmount = useSelector((state) => state.transfer.gasAmount);
  const { estimateGas, execute } = useExecute();
  const isRunning = useSelector((state) => state.tx.isRunning);
  const [toggle, setToggle] = useState(false);
  const proofDrawer = useSelector((state) => state.proof.proofDrawer);

  const currentConversionData = tokenConversionData?.find(
    (C) => C.chainId === selectedChain?.chainId
  );

  const currentConversion = currentConversionData?.chainData.find(
    (C) => C.address === selectedToken?.address
  )?.value;

  const estimate = async () => {
    setIsLoading(true);
    await estimateGas();
    setIsLoading(false);
  };

  const handleApprove = () => {
    if ((txProof ? gasAmount : !isRunning) && !isLoading && !proofDrawer) {
      if (!txProof) {
        dispatch(toggleProofDrawer());
      } else {
        execute();
      }
    }
  };

  const handleCancel = () => {
    if (!isRunning && !isLoading && !proofDrawer) {
      if (!txProof) {
        dispatch(setStep(0));
      } else {
        dispatch(setTxProof(null));
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleApprove();
    } else if (event.key === "Backspace") {
      event.preventDefault();
      handleCancel();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [txProof, gasAmount, isRunning, proofDrawer, isLoading]);

  useEffect(() => {
    if (txProof) {
      estimate();
    } else {
      dispatch(setGasAmount(null));
    }
  }, [txProof]);

  return (
    <section className="flex flex-col dark:text-white h-full w-full gap-10 justify-between items-center">
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

      <div className="flex w-full items-center justify-center gap-2 border dark:border-white/10 border-black/10 pb-14 border-t-0 border-x-0">
        <div className=" flex flex-col items-end">
          <p className="text-6xl font-bold">
            {toggle
              ? formatAmount(Number(amount), 2)
              : (Number(amount) * currentConversion).toFixed(2)}{" "}
            {toggle ? selectedToken.symbol : "USD"}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              {" "}
              +{" "}
              {isLoading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : gasAmount ? (
                toggle ? (
                  formatAmount(Number(gasAmount / 10 ** 18), 6)
                ) : (
                  (Number(gasAmount / 10 ** 18) * currentConversion).toFixed(6)
                )
              ) : (
                "≈"
              )}{" "}
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

      <div className="flex flex-col gap-10 w-full">
        <SettingItem
          title={!txProof ? "Approve Transaction" : "Confirm Transaction"}
          description={
            !txProof
              ? "Generate a proof of the transaction and approve it."
              : "Confirm the transaction details and proceed."
          }
          icon={<UserRoundPen size={22} className="mt-1" />}
        >
          <Button
            color="white"
            className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
            onClick={() => {
              handleApprove();
            }}
            disabled={txProof ? !gasAmount : isRunning}
          >
            {txProof ? "Confirm" : "Approve"}
            <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-white border">
              <CornerDownLeft size={12} />
            </div>
          </Button>
        </SettingItem>
        <SettingItem
          title={!txProof ? "Change Transaction Details" : "Reject Transaction"}
          description={
            !txProof
              ? "Change the transaction details and go back to the initial step."
              : "Reject the transaction and delete the proof."
          }
          icon={<X size={22} className="mt-1" />}
          isLast
        >
          <Button
            color="white"
            className="bg-transparent border-[1px] flex items-center gap-2 dark:border-white/10 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-gray-700 dark:text-gray-400"
            onClick={() => {
              handleCancel();
            }}
            disabled={isRunning}
          >
            {txProof ? "Reject" : "Back"}
            <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg dark:border-white border-black border">
              <ArrowLeft size={14} />
            </div>
          </Button>
        </SettingItem>
      </div>
    </section>
  );
}
