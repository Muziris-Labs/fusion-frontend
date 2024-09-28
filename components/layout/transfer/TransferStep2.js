"use client";

import { Button, Input } from "@material-tailwind/react";

import { ethers } from "ethers";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRightFromLine,
  CornerDownLeft,
  Info,
  Loader2,
} from "lucide-react";

import { setRecipient, setStep } from "@/redux/slice/transferSlice";
import useWallet from "@/hooks/useWallet";
import SettingItem from "@/components/ui/SettingItem";

const TransferStep2 = () => {
  const dispatch = useDispatch();

  var inputTimeout = null;

  const inputRef = useRef(null);

  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const recipient = useSelector((state) => state.transfer.recipient);
  const { getDomain, getFusion } = useWallet();
  const domain = getDomain();

  useEffect(() => {
    const abortController = new AbortController();

    if (!inputRef.current) return;

    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(inputTimeout);

      inputTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });

    return () => {
      clearTimeout(inputTimeout);
      abortController.abort();
    };
  }, []);

  const handleNextStep = () => {
    if (isValid) {
      dispatch(setStep(3));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isValid]);

  useEffect(() => {
    if (isTyping) {
      setIsLoading(true);
    } else {
      checkFusion();
    }
  }, [isTyping, recipient]);

  const checkFusion = async () => {
    setIsLoading(true);

    if (!recipient) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    if (recipient.startsWith("0x") && recipient.length === 42) {
      if (walletAddress === recipient) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      setIsValid(true);
      setIsLoading(false);
      return;
    }

    if (!recipient.includes(".fusion.id") && recipient.length >= 6) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    if (recipient.length < 6) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    if (
      recipient.split(".fusion.id")[0]?.toLowerCase() === domain?.toLowerCase()
    ) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    const address = await getFusion(
      recipient.split(".fusion.id")[0]?.toLowerCase()
    );

    if (address === ethers.constants.AddressZero) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    dispatch(setRecipient(address));
    setIsValid(true);
    setIsLoading(false);
  };

  return (
    <>
      <section className="flex flex-col h-full w-full gap-10 justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-2xl font-semibold">Enter Recipient</h1>
          <p className="text-sm text-gray-500">
            Enter the recipient you want to transfer to
          </p>
        </div>
        <div className="w-full ">
          <Input
            variant="static"
            placeholder="vitalik.fusion.id"
            autoFocus
            style={{
              fontSize: "1.15rem",
            }}
            className="pb-3"
            value={recipient}
            onChange={(e) => {
              dispatch(setRecipient(e.target.value));
            }}
            ref={inputRef}
          />
          <div className="w-full">
            {!recipient && (
              <div className={"mt-2 text-xs flex items-center text-gray-600"}>
                <Info size={14} className="inline mr-1" />
                Enter a valid Fusion domain or an arbitrary address.
              </div>
            )}

            {isLoading && recipient && (
              <div className={"mt-2 flex items-center "}>
                <Loader2 className="animate-spin -mt-0.5 mr-2" size={14} />
                <span className="text-xs">Checking domain...</span>
              </div>
            )}

            {!isLoading && recipient && !isValid && (
              <div className={"mt-2 text-xs flex text-red-500 "}>
                <Info size={14} className="inline mt-0.5 mr-1" />
                Fusion domain or address is invalid.
              </div>
            )}

            {!isLoading && recipient && isValid && (
              <div className={"mt-2 text-xs flex text-green-500 "}>
                <Info size={14} className="inline mt-0.5 mr-1" />
                The Address is valid.
              </div>
            )}
          </div>
        </div>

        <SettingItem
          title="Proceed to Next Step"
          description="
            Check if the recipient is valid and proceed to the next step."
          icon={<ArrowRightFromLine size={22} className="mt-1" />}
          isLast
        >
          <Button
            color="white"
            className="bg-[#b09dff] border-[1px] flex items-center gap-2 border-black/10 rounded-2xl shadow-md py-3 normal-case font-normal text-sm text-white"
            onClick={handleNextStep}
            disabled={!isValid}
          >
            Next
            <div className="w-6 -mr-2 h-6 flex justify-center items-center rounded-lg border-white border">
              <CornerDownLeft size={12} />
            </div>
          </Button>
        </SettingItem>
      </section>
    </>
  );
};

export default TransferStep2;
