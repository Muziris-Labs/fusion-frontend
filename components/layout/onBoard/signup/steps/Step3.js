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
      <label
        htmlFor="register-email"
        className="mt-8 font-outfit text-sm text-gray-600"
      >
        Your Email Address
      </label>

      <div className="mt-2 flex w-full">
        <Input
          size="lg"
          id="register-email"
          label="abc@gmail.com"
          className="font-outfit"
          labelProps={{
            className: "font-outfit",
          }}
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </div>

      <Button
        className="mt-8 flex h-10 w-32 items-center justify-center font-outfit font-normal normal-case"
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
