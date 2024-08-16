"use client";

import { Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import useSignup from "@/hooks/useSignup";

import { setEmail } from "@/redux/slice/SignupSlice";

import StepContainer from "./StepContainer";

const Step3 = () => {
  const dispatch = useDispatch();

  // const { handleEmail } = useSignup();

  const [isLoading, setIsLoading] = useState(false);

  const email = useSelector((state) => state.signup.email);

  return (
    <StepContainer
      title="Setup your new Wallet"
      description="Verify your Email to Deploy your wallet."
    >
      <Button
        className="mt-8 w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => handleEmail(setIsLoading)}
        disabled={isLoading || !email}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Verify Email"
        )}
      </Button>
    </StepContainer>
  );
};

export default Step3;
