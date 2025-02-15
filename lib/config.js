import FusionABI from "./contracts/Fusion.json";
import FusionProxyFactoryABI from "./contracts/FusionProxyFactory.json";

const config = {
  name: "ValeriumProtocol",
  version: "0.1.0",
  author: "Anoy Roy Chowdhury",
  chains: [
    {
      name: "Optimism Sepolia",
      chainId: 11155420,
      isMainnet: false,
      rpcUrl:
        "https://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
      wsUrl:
        "wss://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
      isBase: false,
      logo: "/tokens/op-logo.svg",
      deployments: {
        Fusion: {
          address: {
            v1: "0x8CA33314B30e1edd3A6D8bEcE51c1DbB726f3094",
          },
          abi: FusionABI,
        },
        FusionProxyFactory: {
          address: {
            v1: "0x7f19d198A7E2B5e11B0573d5cffE02d243fdD770",
          },
          abi: FusionProxyFactoryABI,
        },
      },
      utils: {
        eth_id: 1027,
        usd_id: 2781,
        gasLimit: 2000000,
      },
      tokens: [
        {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
          address: "0x0000000000000000000000000000000000000000",
          id: "1027",
          logo: "/tokens/eth-logo.svg",
          block: "/block/eth-block.svg",
          ramp: {
            isSupported: false,
            providers: [],
          },
        },
        {
          name: "USD (C)",
          symbol: "USDC",
          decimals: 6,
          address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
          id: "3408",
          logo: "/tokens/usdc-logo.svg",
          block: "/block/usdc-block.svg",
          ramp: {
            isSupported: true,
            providers: [
              {
                id: "stably",
                name: "Stably",
                mode: "ACH Push & Fedwire",
                logo: "/providers/stably.png",
                tokenId: "frax",
                networkId: "fraxtal",
              },
            ],
          },
        },
      ],
      transactions: {
        browserUrl: "https://sepolia-optimism.etherscan.io/",
      },
    },
  ],
};

export default config;
