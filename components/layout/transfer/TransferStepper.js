"use client";

import { Step, Stepper } from "@material-tailwind/react";

import React from "react";
import { useSelector } from "react-redux";

const TransferStepper = () => {
  const step = useSelector((state) => state.transfer.step);

  return (
    <Stepper
      activeStep={step}
      lineClassName="bg-transparent"
      className="w-fit gap-2 mx-auto"
      activeLineClassName="bg-transparent"
    >
      <Step className="relative h-3 w-3 bg-gray-400 cursor-pointer"></Step>

      <Step className="relative h-3 w-3 bg-gray-400 cursor-pointer"></Step>
    </Stepper>
  );
};

export default TransferStepper;
