"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@material-tailwind/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

// import useSignup from "@/hooks/useSignup";

import { clearAll, setStep } from "@/redux/slice/SignupSlice";

export default function Step4() {
  const router = useRouter();

  const dispatch = useDispatch();

  // const { deployWallet } = useSignup();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const domain = useSelector((state) => state.signup.domain)?.toLowerCase();

  return (
    <div className="flex flex-col z-10">
      <h2 className="font-gloock text-4xl">
        {isSuccess
          ? "Wallet Deployed"
          : isLoading
          ? "Deploying Wallet"
          : "Ready to Deploy"}
      </h2>

      <p className="mt-2 font-outfit text-sm text-gray-600">
        {isSuccess
          ? "Your wallet has been deployed successfully."
          : isLoading
          ? "Hold tight, we are deploying your wallet."
          : "Your Wallet is ready to deploy. Click the button below to deploy your wallet."}
      </p>

      {!isLoading && !isSuccess && (
        <>
          <Button
            className="mt-8 flex h-10 w-32 items-center justify-center font-outfit font-normal normal-case"
            onClick={() =>
              deployWallet(setIsLoading, setIsSuccess, setMessage, code)
            }
            disabled={code.length !== 6}
          >
            Deploy Wallet
          </Button>

          <p className="mt-3 font-outfit text-xs text-gray-600">
            Don't like your domain?{" "}
            <button
              className="font-bold text-black"
              onClick={() => dispatch(setStep(0))}
            >
              Update
            </button>
          </p>
        </>
      )}

      {isLoading && (
        <p className="mt-10 flex text-sm text-gray-500">
          <Loader2 size={20} className="mr-1 inline animate-spin " />
          {message}
        </p>
      )}

      {isSuccess && !isLoading && (
        <Button
          className="mt-8 flex h-10 w-48 items-center justify-center bg-gradient-primary-light font-outfit font-normal normal-case"
          onClick={() => {
            router.push(`/home?domain=${domain}`);
            dispatch(clearAll());
          }}
        >
          Go to Dashboard
        </Button>
      )}
    </div>
  );
}
