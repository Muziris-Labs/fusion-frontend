"use client";
import Steps from "@/components/layout/onBoard/signup/stepper/Stepper";
import Step1 from "@/components/layout/onBoard/signup/steps/Step1";
import Step2 from "@/components/layout/onBoard/signup/steps/Step2";
import Step3 from "@/components/layout/onBoard/signup/steps/Step3";
import Step4 from "@/components/layout/onBoard/signup/steps/Step4";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const step = useSelector((state) => state.signup.step);
  return (
    <>
      <Steps />
      {step === 0 && <Step1 />}
      {step === 1 && <Step2 />}
      {step === 2 && <Step3 />}
      {step === 3 && <Step4 />}
    </>
  );
};

export default SignUpPage;
