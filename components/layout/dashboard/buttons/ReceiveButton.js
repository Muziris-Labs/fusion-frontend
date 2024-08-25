"use client";

import { Button } from "@material-tailwind/react";
import { ArrowDownLeft } from "lucide-react";

import React from "react";
import { useRouter } from "next/navigation";

import useWallet from "@/hooks/useWallet";

const ReceiveButton = () => {
  const router = useRouter();
  const { getDomain } = useWallet();

  const domain = getDomain();

  return (
    <Button
      size="lg"
      color="white"
      className="bg-transparent shadow-none hover:shadow-none rounded-none py-10 flex items-center gap-2 justify-center border"
      fullWidth
      onClick={() => router.push(`/receive?domain=${domain}`)}
    >
      Receive <ArrowDownLeft size={24} />
    </Button>
  );
};

export default ReceiveButton;
