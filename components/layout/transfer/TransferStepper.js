"use client";

import { Step, Stepper } from "@material-tailwind/react";

import React from "react";
import { useSelector } from "react-redux";

const TransferStepper = () => {
  const step = useSelector((state) => state.transfer.step);

  return (
    <div className="w-[330px] my-5 mt-0 flex justify-center">
      <Stepper
        activeStep={step}
        className=""
        lineClassName="bg-transparent"
        activeLineClassName="bg-transparent"
      >
        <Step
          className="relative h-1 w-20 bg-gray-300"
          activeClassName="bg-[#b09dff]"
          completedClassName="bg-[#b09dff]"
        ></Step>

        <Step
          className="relative h-1 w-20 bg-gray-300"
          activeClassName="bg-[#b09dff]"
          completedClassName="bg-[#b09dff]"
        ></Step>

        <Step
          className="relative h-1 w-20 bg-gray-300"
          activeClassName="bg-[#b09dff]"
          completedClassName="bg-[#b09dff]"
        ></Step>

        <Step
          className="relative h-1 w-20 bg-gray-300"
          activeClassName="bg-[#b09dff]"
          completedClassName="bg-[#b09dff]"
        ></Step>
      </Stepper>
    </div>
  );
};

export default TransferStepper;
