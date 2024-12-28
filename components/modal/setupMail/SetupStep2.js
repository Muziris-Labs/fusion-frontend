"use client";

import useSetup from "@/hooks/useSetup";
import {
  setAuthentication,
  setIsLoading,
  setStep,
} from "@/redux/slice/setupSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Check, Fingerprint, Loader2Icon } from "lucide-react";

export default function SetupStep2() {
  const passkey = useSelector((state) => state.setup.authentication);
  const isLoading = useSelector((state) => state.setup.isLoading);
  const dispatch = useDispatch();
  const { handlePasskey } = useSetup();

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">
          Verify your passkey
        </h1>
        <p className="text-sm text-left text-gray-500">
          Verify your passkey to add a recovery email
        </p>
      </div>
      <div className="w-full mt-10">
        <Button
          color="white"
          className="flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
          onClick={async () => {
            if (passkey) return;

            dispatch(setIsLoading(true));
            await handlePasskey()
              .then(() => {
                dispatch(setIsLoading(false));
              })
              .catch((e) => {
                console.log(e);
                dispatch(setIsLoading(false));
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
              dispatch(setAuthentication(null));
            }}
          >
            Clear Passkey
          </p>
        )}
      </div>
      <Button
        className=" w-full mt-7 p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(2));
        }}
        disabled={!passkey}
      >
        Next
      </Button>
    </>
  );
}
