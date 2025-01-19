"use client";

import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function useRamp() {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const stablyRamp = async (selectedProvider, selectedToken, amount) => {
    const provider = selectedToken.ramp.providers.find(
      (provider) => provider.id === selectedProvider
    );

    if (!provider) {
      toast.error("Provider not found");
    }

    const link =
      "https://ramp.stably.io/?toassets=" +
      provider.tokenId +
      "&tonetworks=" +
      provider.networkId +
      "&fromamount=" +
      amount +
      "&toaddress=" +
      walletAddress;

    window.open(link, "_blank");
  };

  return { stablyRamp };
}
