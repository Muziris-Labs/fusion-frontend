"use client";

import { useSelector } from "react-redux";

import TransferStep1 from "./TransferStep1";
import TransferStep2 from "./TransferStep2";

const TransferSteps = () => {
  const step = useSelector((state) => state.transfer.step);

  return (
    <div className="space-y-5">
      {step === 0 && <TransferStep1 />}
      {step === 1 && <TransferStep2 />}
    </div>
  );
};

export default TransferSteps;
