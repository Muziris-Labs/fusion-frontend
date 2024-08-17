import { ethers } from "ethers";
import baseConfig from "@/lib/baseConfig";

export default function useWallet() {
  const getFusion = async (domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(baseConfig.rpcUrl);

      const factory = new ethers.Contract(
        baseConfig.deployments.FusionProxyFactory.address,
        baseConfig.deployments.FusionProxyFactory.abi,
        provider
      );

      const fusionProxy = await factory.getFusionProxy(domain + ".fusion.id");

      return fusionProxy;
    } catch (error) {
      console.log(error);
      return ethers.constants.AddressZero;
    }
  };

  return {
    getFusion,
  };
}
