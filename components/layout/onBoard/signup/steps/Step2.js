"use client";

import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPasskey, setStep } from "@/redux/slice/SignupSlice";
import StepContainer from "./StepContainer";
import useSignup from "@/hooks/useSignup";

const Step2 = () => {
  const dispatch = useDispatch();
  const { handlePasskey } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const passkey = useSelector((state) => state.signup.passkey);

  return (
    <StepContainer
      title="Setup your new Wallet"
      description="Add a passkey to secure your wallet"
    >
      <Button
        color="white"
        className="mt-10 flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
        onClick={async () => {
          if (passkey) return;

          setIsLoading(true);
          await handlePasskey()
            .then(() => {
              setIsLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setIsLoading(false);
            });
        }}
        disabled={isLoading}
      >
        {passkey ? (
          <Check className="text-green-500" size={80} />
        ) : isLoading ? (
          <Loader2Icon className="animate-spin" size={80} />
        ) : (
          <Fingerprint className="text-black" size={80} />
        )}
      </Button>

      {passkey && (
        <p
          className="mt-2 text-center w-full text-xs text-gray-500 hover:cursor-pointer hover:underline"
          onClick={() => {
            dispatch(setPasskey(null));
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
        disabled={!passkey || isLoading}
      >
        Continue
      </Button>
    </StepContainer>
  );
};

export default Step2;
