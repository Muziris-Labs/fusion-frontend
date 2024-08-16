"use client";

import { Lock, Mail, UserRound } from "lucide-react";
import { Step, Stepper } from "@material-tailwind/react";

import { useSelector } from "react-redux";

export default function Steps() {
  const step = useSelector((state) => state.signup.step);

  return (
    <div className="relative flex w-[450px] items-center justify-center">
      <div className="w-[100px] flex justify-center">
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
    </div>
  );
}
