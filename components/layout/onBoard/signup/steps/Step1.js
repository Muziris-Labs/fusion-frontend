"use client";

import { Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";

import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import useSignup from "@/hooks/useSignup";

import { setDomain, setStep } from "@/redux/slice/SignupSlice";

import StepContainer from "./StepContainer";

const Step1 = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();

  // const { isValidValerium } = useSignup();

  const [isUsed, setIsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  0;
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

  const checkValerium = async () => {
    if (domain.length < 3) return;
    if (domain.length > 20) return;

    const isUsed = await isValidValerium(domain?.toLowerCase());

    setIsUsed(isUsed);
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
      checkValerium();
    }
  }, [isTyping, domain]);

  return (
    <StepContainer
      title="Choose your Fusion Domain"
      description="Choose your domain name to create your wallet."
    >
      <label
        htmlFor="register-domain"
        className="mt-8 font-outfit text-sm text-gray-600"
      >
        Your Fusion Domain
      </label>

      <div className="mt-2 flex w-full">
        <Input
          id="register-domain"
          label="Choose your domain"
          size="lg"
          className="rounded-r-none font-outfit"
          labelProps={{
            className: "after:rounded-tr-none font-outfit ",
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
            "flex items-center rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 px-3 py-0 font-outfit text-sm font-normal normal-case "
          }
        >
          .fusion.id
        </Button>
      </div>

      {isLoading && domain.length > 3 && (
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

      {!isLoading && !isUsed && domain.length > 3 && (
        <p className="mt-2 flex text-sm text-green-500">
          <Info size={20} className="mr-1 inline" />
          This domain is available.
        </p>
      )}

      <Button
        className="mt-8 w-fit font-outfit font-normal normal-case"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={
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
