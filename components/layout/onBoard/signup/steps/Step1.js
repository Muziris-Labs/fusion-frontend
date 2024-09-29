"use client";

import { Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";

import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDomain, setStep } from "@/redux/slice/SignupSlice";

import StepContainer from "./StepContainer";
import useWallet from "@/hooks/useWallet";
import { ethers } from "ethers";

const Step1 = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { getFusion } = useWallet();
  const [isUsed, setIsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const domain = useSelector((state) => state.signup.domain);

  var timeout = null;

  const handleName = (e) => {
    if (e.target.value.length > 20) {
      dispatch(
        setDomain(e.target.value.slice(0, 20).replace(/[^a-zA-Z0-9]/g, ""))
      );
    } else {
      dispatch(
        setDomain(e.target.value.replace(/[^a-zA-Z0-9]/g, "")?.toLowerCase())
      );
    }
  };

  const checkFusion = async () => {
    if (domain.length < 3) return;
    if (domain.length > 20) return;

    const address = await getFusion(domain.toLowerCase());

    if (address === ethers.constants.AddressZero) {
      setIsUsed(false);
      setIsLoading(false);
      return;
    }

    setIsUsed(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLoading(true);
    } else {
      checkFusion();
    }
  }, [isTyping, domain]);

  return (
    <StepContainer
      title="Choose your Fusion Domain"
      description="Choose your domain name to create your wallet."
    >
      <div className="mt-10 flex w-full">
        <Input
          label="Your Fusion Domain"
          size="lg"
          className={
            "rounded-xl rounded-r-none dark:text-white dark:focus:border-white dark:focus:border-t-transparent font-outfit"
          }
          labelProps={{
            className:
              "peer-placeholder-shown:mt-[5px] dark:peer-focus:after:!border-white dark:peer-focus:text-white dark:peer-placeholder-shown:text-white peer-focus:before:w-1 before:w-1 peer-placeholder-shown:before:w-3 peer-focus:mt-0 after:rounded-tr-none font-outfit before:border-none",
          }}
          containerProps={{
            className: "h-14 dark:text-white",
          }}
          ref={inputRef}
          value={domain}
          onChange={(e) => handleName(e)}
        />

        <Button
          ripple={false}
          variant="text"
          color="blue-gray"
          className={
            "flex items-center rounded-xl rounded-l-none border border-l-0 dark:bg-white dark:text-black border-blue-gray-200 bg-gray-100/60 px-5 py-0 font-noto text-sm font-normal normal-case"
          }
        >
          .fusion.id
        </Button>
      </div>

      {isLoading && domain && domain.length > 3 && (
        <p className="mt-2 flex text-sm text-gray-500">
          <Loader2 size={20} className="mr-1 inline animate-spin " />
          Checking availability...
        </p>
      )}

      {!isLoading && isUsed && (
        <p className="mt-2 flex text-sm text-red-500">
          <Info size={20} className="mr-1 inline" />
          This domain is already taken.
        </p>
      )}

      {!isLoading && !isUsed && domain && domain.length > 3 && (
        <p className="mt-2 flex text-sm text-green-500">
          <Info size={20} className="mr-1 inline" />
          This domain is available.
        </p>
      )}

      <Button
        className="mt-8 w-full p-5 font-semibold dark:bg-white dark:text-black rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={
          !domain ||
          domain.length <= 3 ||
          domain.length > 20 ||
          isUsed ||
          isLoading ||
          isTyping
        }
      >
        Select Domain
      </Button>
    </StepContainer>
  );
};

export default Step1;
