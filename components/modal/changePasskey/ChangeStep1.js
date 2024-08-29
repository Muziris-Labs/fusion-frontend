"use client";

import useChange from "@/hooks/useChange";
import { setIsLoading, setPasskey, setStep } from "@/redux/slice/changeSlice";
import { Button } from "@material-tailwind/react";
import { Check, Fingerprint, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeStep1() {
  const passkey = useSelector((state) => state.change.passkey);
  const isLoading = useSelector((state) => state.change.isLoading);
  const dispatch = useDispatch();
  const { handlePasskey } = useChange();

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">Add New Passkey</h1>
        <p className="text-sm text-left text-gray-500">
          Set a new passkey to secure your account
        </p>
      </div>
      <div className="w-full">
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
              dispatch(setPasskey(null));
            }}
          >
            Clear Passkey
          </p>
        )}
      </div>
      <Button
        className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={!passkey}
      >
        Next
      </Button>
    </>
  );
}
