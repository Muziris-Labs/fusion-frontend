"use client";

import { Info, Loader2 } from "lucide-react";
import { Input, Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import useWallet from "@/hooks/useWallet";

const LoginForm = () => {
  const inputRef = useRef();

  const router = useRouter();

  const [domain, setDomain] = useState("");

  const [isUsed, setIsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getFusion } = useWallet();

  var timeout = null;

  const handleName = (e) => {
    if (e.target.value.length > 20) {
      setDomain(
        e.target.value
          .slice(0, 20)
          .replace(/[^a-zA-Z0-9]/g, "")
          ?.toLowerCase()
      );
    } else {
      setDomain(e.target.value.replace(/[^a-zA-Z0-9]/g, "")?.toLowerCase());
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
    const controller = new AbortController();
    const signal = controller.signal;

    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        if (signal.aborted) return;
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLoading(true);
    } else {
      checkFusion();
    }
  }, [isTyping, domain]);

  return (
    <>
      <div className="w-full">
        <div className="mt-10 flex w-full">
          <Input
            label="Your Fusion Domain"
            size="lg"
            className={"rounded-xl rounded-r-none font-outfit"}
            labelProps={{
              className:
                "peer-placeholder-shown:mt-[5px] peer-focus:before:w-1 before:w-1 peer-placeholder-shown:before:w-3 peer-focus:mt-0 after:rounded-tr-none font-outfit before:border-none",
            }}
            containerProps={{
              className: "h-14",
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
              "flex items-center rounded-xl rounded-l-none border border-l-0 border-blue-gray-200 bg-gray-100/60 px-5 py-0 font-noto text-sm font-normal normal-case"
            }
          >
            .fusion.id
          </Button>
        </div>

        {isLoading && domain.length > 3 && (
          <p className="mt-2 flex text-sm text-text-gray">
            <Loader2 size={20} className="mr-1 inline animate-spin " />
            Checking availability...
          </p>
        )}

        {!isLoading && !isUsed && domain.length > 3 && (
          <p className="mt-2 flex text-sm text-red-500">
            <Info size={20} className="mr-1 inline" />
            This domain is not registered.
          </p>
        )}
      </div>

      <Button
        className="mt-8 w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case"
        onClick={() => {
          router.push(`/dashboard?domain=${domain?.toLowerCase()}`);
        }}
        disabled={
          domain.length <= 3 ||
          domain.length > 20 ||
          !isUsed ||
          isLoading ||
          isTyping
        }
      >
        Access Account
      </Button>
    </>
  );
};

export default LoginForm;
