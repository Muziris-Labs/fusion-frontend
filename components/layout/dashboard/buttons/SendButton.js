"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@material-tailwind/react";

import React from "react";
import { useRouter } from "next/navigation";

import useWallet from "@/hooks/useWallet";

const SendButton = () => {
  const router = useRouter();
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <Button
      size="lg"
      color="white"
      className="bg-transparent shadow-none hover:shadow-none rounded-none py-10 flex items-center gap-2 justify-center bg-gray-50 border"
      fullWidth
      onClick={() => router.push(`/transfer?domain=${domain}`)}
    >
      Send <ArrowUpRight size={24} />
    </Button>
  );
};

export default SendButton;
