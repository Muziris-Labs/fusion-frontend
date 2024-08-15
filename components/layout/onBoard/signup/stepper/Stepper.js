"use client";

import { Lock, Mail, UserRound } from "lucide-react";
import { Step, Stepper } from "@material-tailwind/react";

import { useSelector } from "react-redux";

export default function Steps() {
  const step = useSelector((state) => state.signup.step);

  return (
    <div className="relative flex items-center">
      <div className="absolute w-[300px] -translate-x-1/2">
        <Stepper
          activeStep={step}
          className="rotate-90"
          lineClassName="bg-gray-400"
        >
          <Step className="relative h-8 w-8 bg-gray-400">
            <UserRound className="h-4 w-4 -rotate-90" />
            <div className="absolute mt-52 w-40 -rotate-90 text-right font-noto text-sm font-light text-black">
              Add Domain
            </div>
          </Step>

          <Step className="relative h-8 w-8 bg-gray-400">
            <Lock className="h-4 w-4 -rotate-90" />
            <div className="absolute mt-52 w-40 -rotate-90 text-right font-noto text-sm font-light text-black">
              Add Auth
            </div>
          </Step>

          <Step className="relative h-8 w-8 bg-gray-400">
            <Mail className="h-4 w-4 -rotate-90" />
            <div className="absolute mt-52 w-40 -rotate-90 text-right font-noto text-sm font-light text-black">
              Add Email
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
