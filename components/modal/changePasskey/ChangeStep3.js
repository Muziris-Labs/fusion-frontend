"use client";

import useChange from "@/hooks/useChange";
import { Button } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function ChangeStep3() {
  const passkey = useSelector((state) => state.change.passkey);
  const email = useSelector((state) => state.change.email);
  const isLoading = useSelector((state) => state.change.isLoading);
  const { handleRecovery } = useChange();
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl text-left font-semibold">
          {passkey && email && isLoading ? "Initiating Recovery" : "All Set!"}
        </h1>
        <p className="text-sm text-left text-gray-500">
          {passkey && email && isLoading
            ? "Securing your account with a new passkey"
            : "Click the button below to initiate Recovery"}
        </p>
      </div>

      <Button
        className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case flex items-center justify-center"
        onClick={() => {
          handleRecovery();
        }}
        disabled={!passkey || !email || isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Recover Account"
        )}
      </Button>
    </>
  );
}
