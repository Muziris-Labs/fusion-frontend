"use client";

import { setSelectedChain } from "@/redux/slice/deploySlice";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";
import Image from "next/image";
import { ethers } from "ethers";

export default function Chains({ chain }) {
  const selectedChain = useSelector((state) => state.deploy.selectedChain);
  const isSelected = selectedChain?.chainId === chain.chainId;
  const walletAddresses = useSelector((state) => state.user.walletAddresses);

  const walletAddress = walletAddresses?.find(
    (address) => address.chainId === chain.chainId
  );

  const dispatch = useDispatch();

  return (
    <div className="relative rounded-2xl overflow-hidden" key={chain.chainId}>
      <Button
        className="border-[1px] w-36 h-36 rounded-2xl border-black flex items-center overflow-hidden font-normal gap-2 px-3 py-2 normal-case"
        color="white"
        style={{
          borderColor: isSelected ? "#1D4ED8" : "black",
          borderWidth: isSelected ? "2px" : "1px",
        }}
        disabled={walletAddress.address !== ethers.constants.AddressZero}
        onClick={() => {
          dispatch(setSelectedChain(chain));
        }}
      >
        {isSelected && (
          <div className="p-2 rounded-full bg-[#1D4ED8] rounded-t-none rounded-br-none absolute top-0 right-0">
            <Check size={20} color="white" className="-mt-0.5 ml-1" />
          </div>
        )}
        <div className=" flex-col flex h-full w-full justify-between p-2 relative ">
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <p className="text-lg text-left font-bold text-black">
                {chain.name}
              </p>
            </div>
          </div>

          <Image
            src={chain.logo}
            alt={chain.name}
            width={100}
            height={30}
            className="rounded-full absolute -bottom-6 -z-0 -right-8 opacity-20"
          />

          <div className="flex flex-col items-start">
            <p className="text-sm font-bold text-black"></p>
            <p className="text-xs font-normal text-gray-700"></p>
          </div>
        </div>
      </Button>
    </div>
  );
}
