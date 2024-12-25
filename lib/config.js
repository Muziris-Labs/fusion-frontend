import FusionABI from "./contracts/Fusion.json";
import FusionForwarderABI from "./contracts/FusionForwarder.json";
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
      wormhole: {
        chainId: 10005,
      },
      deployments: {
        Fusion: {
          address: "0x4736780DCb1E57586575Aa8fD530c5E78e9BCFF2",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0xe6214470bB259410C59fC2d79E2d6dbA69719e6A",
          abi: FusionForwarderABI,
        },
        FusionProxyFactory: {
          address: "0x2A5220b8e49da72a0dF783b4aB6D17ebB0FcBDa4",
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
        },
        {
          name: "USD (C)",
          symbol: "USDC",
          decimals: 6,
          address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
          id: "3408",
          logo: "/tokens/usdc-logo.svg",
          block: "/block/usdc-block.svg",
        },
      ],
      transactions: {
        browserUrl: "https://sepolia-optimism.etherscan.io/",
      },
    },
  ],
};

export default config;
