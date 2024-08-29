"use client";

import { Step, Stepper } from "@material-tailwind/react";

import React from "react";
import { useSelector } from "react-redux";

const ChangeStepper = () => {
  const step = useSelector((state) => state.change.step);

  return (
    <div className="w-[100px] mt-5 flex justify-center">
      <Stepper
        activeStep={step}
        className=""
        lineClassName="bg-transparent"
        activeLineClassName="bg-transparent"
      >
        <Step className="relative h-4 w-4 bg-gray-400"></Step>

        <Step className="relative h-4 w-4 bg-gray-400"></Step>

        <Step className="relative h-4 w-4 bg-gray-400"></Step>
      </Stepper>
    </div>
  );
};

export default ChangeStepper;
