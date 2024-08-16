"use client";

import { useSelector } from "react-redux";

import Step1 from "@/components/layout/onBoard/signup/steps/Step1";
import Step2 from "@/components/layout/onBoard/signup/steps/Step2";
import Step3 from "@/components/layout/onBoard/signup/steps/Step3";
import Step4 from "@/components/layout/onBoard/signup/steps/Step4";

import Steps from "@/components/layout/onBoard/signup/stepper/Stepper";

const SignUp = () => {
  const step = useSelector((state) => state.signup.step);

  return (
    <>
      {step === 0 && <Step1 />}
      {step === 1 && <Step2 />}
      {step === 2 && <Step3 />}
      {step === 3 && <Step4 />}
      <Steps />
    </>
  );
};

export default SignUp;
