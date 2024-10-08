"use client";

import useWallet from "@/hooks/useWallet";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Copy, Key, LucideQrCode, MapPin } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import QrCodeWithLogo from "qrcode-with-logos";
import shortenAddress from "@/utils/shortenAddress";

export default function ReceiveMain() {
  const { getDomain } = useWallet();
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const domain = getDomain();
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex w-full justify-between dark:text-white items-center border dark:border-white/10 border-black/10 border-t-0 border-x-0 pb-10">
        <div className="flex flex-col gap-8">
          <Image
            src="/FusionLogo.svg"
            width={100}
            height={100}
            alt="fusion logo"
            className="mb-2 dark:invert hidden md:block"
          />

          <div className="h-full w-56 md:hidden">
            <QRCodeGenerator value={walletAddress} />
          </div>

          <div className="font-bold text-3xl md:text-7xl w-full md:-mt-8 flex items-end mt-0 md:leading-[4.2rem]">
            {domain}
            <span className="font-normal text-lg md:text-2xl text-gray-700">
              .fusion.id
            </span>
            <Button
              color="white"
              className="bg-transparent border-[1px] flex items-center ml-2 gap-2 dark:border-white/10 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(`${domain}.fusion.id`);
                toast.success("Domain copied to clipboard");
              }}
            >
              <Copy size={10} />
            </Button>
          </div>

          <div className="font-light -mt-5 flex ">
            <span className="md:block hidden">
              {walletAddress ? walletAddress : "Loading..."}
            </span>
            <span className="md:hidden">
              {walletAddress ? shortenAddress(walletAddress) : "Loading..."}
            </span>

            <Button
              color="white"
              className="bg-transparent border-[1px] flex items-center ml-2 gap-2 dark:border-white/10 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                toast.success("Address copied to clipboard");
              }}
            >
              <Copy size={10} />
            </Button>
          </div>
        </div>

        <div className="h-full w-56 hidden md:block">
          <QRCodeGenerator value={walletAddress} />
        </div>
      </div>

      <SettingItem
        title="Fusion Domain"
        description="Your unique Fusion domain name is used to identify your wallet address and receive funds from Fusion wallets. "
        icon={<MapPin size={24} className="mt-1 dark:invert" />}
        onClick={() => {
          navigator.clipboard.writeText(walletAddress);
          toast.success("Address copied to clipboard");
        }}
      >
        <ThemeButton
          theme={"Copy Domain"}
          onClick={() => {
            navigator.clipboard.writeText(`${domain}.fusion.id`);
            toast.success("Domain copied to clipboard");
          }}
          name="Copy Domain"
        />
      </SettingItem>

      <SettingItem
        title="Wallet Address"
        description="Your wallet address is used to receive funds from other wallets. "
        icon={<Key size={24} className="mt-1 dark:invert" />}
        onClick={() => {
          navigator.clipboard.writeText(walletAddress);
          toast.success("Address copied to clipboard");
        }}
      >
        <ThemeButton
          theme={"Copy Address"}
          onClick={() => {
            navigator.clipboard.writeText(walletAddress);
            toast.success("Address copied to clipboard");
          }}
          name="Copy Address"
        />
      </SettingItem>

      <SettingItem
        title="QR Code"
        description="Your QR code can be scanned by other wallets to send you funds."
        icon={<LucideQrCode size={24} className="mt-1 dark:invert" />}
        onClick={() => {
          navigator.clipboard.writeText(walletAddress);
          toast.success("Address copied to clipboard");
        }}
      >
        <ThemeButton
          theme={"Download QR Code"}
          onClick={() => {
            const qrcode = new QrCodeWithLogo({
              content: value,
              width: size,
              dotsOptions: {
                color: "#000",
                type: "dot-small",
              },
              cornersOptions: {
                type: "circle-rounded",
                color: "#000",
              },
            });

            qrcode.downloadImage("qrcode.png");
          }}
          name="Download QR Code"
        />
      </SettingItem>
    </div>
  );
}
