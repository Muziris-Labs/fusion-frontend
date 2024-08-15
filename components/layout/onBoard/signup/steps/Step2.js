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
      description="Give your Password or Passkey to add Authentication to your wallet."
    >
      <div className="mt-2">
        <Input
          label="*******"
          size="lg"
          className={"font-outfit"}
          type="password"
          value={password}
          disabled={passkey ? true : false}
          onChange={(e) => handlePassword(e)}
        />

        <p className="mt-2 flex text-sm text-gray-500">
          <Info size={20} className="mr-1 inline" />
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </p>
      </div>

      <OrDivider />

      <Button
        color="white"
        className="mt-4 flex h-24 w-full rounded-xl border-px border-black bg-white px-3"
        onClick={() => handlePasskey(setIsLoading)}
      >
        <div className="flex h-full w-16 items-center justify-center rounded-lg bg-black/90">
          {passkey ? (
            <Check className="h-5 w-5 text-white" />
          ) : isLoading ? (
            <Loader2Icon className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Fingerprint className="h-5 w-5 text-white" />
          )}
        </div>

        <div className="ml-3 flex h-full w-56 flex-col justify-center text-start font-outfit normal-case">
          <p className="text-xl">
            {passkey
              ? "Passkey Added"
              : isLoading
              ? "Adding Passkey"
              : "Add Passkey"}
          </p>

          <p className="mt-1 w-72 text-xs font-normal text-gray-500">
            This will be used to execute transactions
          </p>
        </div>
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
        className="mt-8 w-fit font-outfit font-normal normal-case"
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
