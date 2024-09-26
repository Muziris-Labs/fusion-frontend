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

export default function ReceiveMain() {
  const { getDomain } = useWallet();
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const domain = getDomain();
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex w-full justify-between items-center border border-black/10 border-t-0 border-x-0 pb-10">
        <div className="flex flex-col gap-8">
          <Image
            src="/FusionLogo.svg"
            width={100}
            height={100}
            alt="fusion logo"
            className="mb-2"
          />

          <div className="font-bold text-7xl w-full -mt-8 flex items-end">
            {domain}
            <span className="font-normal text-2xl text-gray-700">
              .fusion.id
            </span>
            <Button
              color="white"
              className="bg-transparent border-[1px] flex items-center ml-2 gap-2 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(`${domain}.fusion.id`);
                toast.success("Domain copied to clipboard");
              }}
            >
              <Copy size={10} />
            </Button>
          </div>

          <div className="font-light -mt-5 flex ">
            {walletAddress ? walletAddress : "Loading..."}

            <Button
              color="white"
              className="bg-transparent border-[1px] flex items-center ml-2 gap-2 border-black/10 rounded-lg shadow-md p-2 px-2 normal-case font-normal text-sm text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                toast.success("Address copied to clipboard");
              }}
            >
              <Copy size={10} />
            </Button>
          </div>
        </div>

        <div className="h-full w-56">
          <QRCodeGenerator value={walletAddress} />
        </div>
      </div>

      <SettingItem
        title="Fusion Domain"
        description="Your unique Fusion domain name is used to identify your wallet address and receive funds from Fusion wallets. "
        icon={<MapPin size={24} className="mt-1" />}
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
        icon={<Key size={24} className="mt-1" />}
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
        icon={<LucideQrCode size={24} className="mt-1" />}
        onClick={() => {
          navigator.clipboard.writeText(walletAddress);
          toast.success("Address copied to clipboard");
        }}
      >
        <ThemeButton
          theme={"Download QR Code"}
          onClick={() => {
            const qrcode = new QrCodeWithLogo({
              content: walletAddress,
              width: 500,
              dotsOptions: {
                color: "#000",
                type: "fluid",
              },
              cornersOptions: {
                type: "circle",
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
