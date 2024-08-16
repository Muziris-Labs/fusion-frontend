"use client";

import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import useSignup from "@/hooks/useSignup";

import { setPasskey, setPassword, setStep } from "@/redux/slice/SignupSlice";

import StepContainer from "./StepContainer";
import OrDivider from "@/components/ui/OrDivider";

const Step2 = () => {
  const dispatch = useDispatch();

  // const { handlePasskey } = useSignup();

  const [isLoading, setIsLoading] = useState(false);

  const password = useSelector((state) => state.signup.password);
  const passkey = useSelector((state) => state.signup.passkey);

  const handlePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <StepContainer
      title="Setup your new Wallet"
      description="Add a passkey to secure your wallet"
    >
      <Button
        color="white"
        className="mt-10 flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
        onClick={() => handlePasskey(setIsLoading)}
      >
        <Fingerprint size={80} className="mr-3" />
      </Button>

      {passkey && (
        <p
          className="mt-2 text-xs text-gray-500 hover:cursor-pointer hover:underline"
          onClick={() => {
            dispatch(setPasskey(""));
          }}
        >
          Clear Passkey
        </p>
      )}

      <Button
        className="mt-8 w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(2));
        }}
        disabled={(passkey ? false : password.length < 8) || isLoading}
      >
        Continue
      </Button>
    </StepContainer>
  );
};

export default Step2;
