import { toast } from "sonner";

export default function useRamp() {
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
      amount;

    window.open(link, "_blank");
  };

  return { stablyRamp };
}
