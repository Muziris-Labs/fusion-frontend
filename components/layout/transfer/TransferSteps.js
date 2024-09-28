"use client";

import { useSelector } from "react-redux";

import TransferStep1 from "./TransferStep1";
import TransferStep2 from "./TransferStep2";
import TransferStep3 from "./TransferStep3";
import TransferStep0 from "./TransferStep0";

const TransferSteps = () => {
  const step = useSelector((state) => state.transfer.step);

  return (
    <>
      {step === 0 && <TransferStep0 />}
      {step === 1 && <TransferStep1 />}
      {step === 2 && <TransferStep2 />}
      {step === 3 && <TransferStep3 />}
    </>
  );
};

export default TransferSteps;
