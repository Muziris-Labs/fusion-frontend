"use client";

import useSetup from "@/hooks/useSetup";
import {
  setAccessToken,
  setAuthentication,
  setRequestTime,
  setStep,
  toggleSetupDrawer,
} from "@/redux/slice/setupSlice";
import { Button } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function SetupStep3() {
  const isLoading = useSelector((state) => state.setup.isLoading);
  const { addEmail } = useSetup();
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">
          {isLoading ? "Setting up Recovery..." : " Finalize your setup"}{" "}
        </h1>
        <p className="text-sm text-left text-gray-500">
          {isLoading
            ? "Setting up recovery email, please wait..."
            : "Confirm to setup recovery and secure your account"}{" "}
        </p>
      </div>

      {isLoading && <Loader2 className="animate-spin mt-10 mb-5" size={50} />}

      {!isLoading && (
        <>
          <Button
            className="mt-10 w-full p-5 flex items-center justify-center font-semibold rounded-full text-sm font-outfit normal-case"
            onClick={() => {
              addEmail();
            }}
            disabled={isLoading}
          >
            Confirm
          </Button>

          <Button
            className="mt-5 w-full p-5 flex items-center justify-center bg-transparent text-black border-black border font-semibold rounded-full text-sm font-outfit normal-case"
            onClick={() => {
              dispatch(toggleSetupDrawer());
              dispatch(setStep(0));
              dispatch(setAccessToken(null));
              dispatch(setAuthentication(null));
              dispatch(setRequestTime(null));
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
}
