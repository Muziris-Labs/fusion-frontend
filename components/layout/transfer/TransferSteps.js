"use client";

import { useSelector } from "react-redux";

import TransferStep1 from "./TransferStep1";
import TransferStep2 from "./TransferStep2";

import FusionCard from "@/components/ui/FusionCard";

const TransferSteps = () => {
  const step = useSelector((state) => state.transfer.step);

  return (
    <FusionCard className="rounded-t-none px-6 py-8 shadow space-y-5">
      {step === 0 && <TransferStep1 />}
      {step === 1 && <TransferStep2 />}
    </FusionCard>
  );
};

export default TransferSteps;
