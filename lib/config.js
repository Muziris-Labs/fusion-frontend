import FusionABI from "./contracts/Fusion.json";
import FusionForwarderABI from "./contracts/FusionForwarder.json";
import FactoryForwarderABI from "./contracts/FactoryForwarder.json";
import FusionProxyFactoryABI from "./contracts/FusionProxyFactory.json";
import FusionVaultABI from "./contracts/FusionVault.json";
import UltraVerifierABI from "./contracts/UltraVerifier.json";

const config = {
  name: "ValeriumProtocol",
  version: "0.1.0",
  author: "Anoy Roy Chowdhury",
  chains: [
    {
      name: "Avalanche Fuji",
      chainId: 43113,
      isMainnet: false,
      rpcUrl: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
      wsUrl: "wss://avalanche-fuji-c-chain-rpc.publicnode.com",
      isBase: true,
      logo: "/tokens/avax-logo.svg",
      wormhole: {
        chainId: 6,
      },
      deployments: {
        Fusion: {
          address: "0x2E03BAf7cAAee536e5680f8B210e48C89e18204A",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0xfC417EE9c5ee1018acf3297a608982dD547fAc7C",
          abi: FusionForwarderABI,
        },
        FactoryForwarder: {
          address: "0x39Ba4C7C6538D1c6529C9562851444F26Cba8f9F",
          abi: FactoryForwarderABI,
        },
        FusionProxyFactory: {
          address: "0x12d8f1C2e392a2A6864456393cDCb9790d83D639",
          abi: FusionProxyFactoryABI,
        },
        FusionVault: {
          address: "0x77f4cC4dCdCf060740F889A95672060532baC70b",
          abi: FusionVaultABI,
        },
        UltraVerifier: {
          address: "0xC9da8b6DC9ED710Cc0e94aF8278b37FBCACc9A8e",
          abi: UltraVerifierABI,
        },
        GasTank: {
          address: "0xA2d6267B5b167Ee27174BfDa808408F90391D949",
          abi: null,
        },
      },
      utils: {
        eth_id: 5805,
        usd_id: 2781,
        gasLimit: 2000000,
      },
      tokens: [
        {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18,
          address: "0x0000000000000000000000000000000000000000",
          id: "5805",
          logo: "/tokens/avax-logo.svg",
        },
        {
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          address: "0x5425890298aed601595a70AB815c96711a31Bc65",
          id: "3408",
          logo: "/tokens/usdc-logo.svg",
        },
      ],
      transactions: {
        browserUrl:
          "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/api",
      },
    },
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
          address: "0x2E03BAf7cAAee536e5680f8B210e48C89e18204A",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0xfC417EE9c5ee1018acf3297a608982dD547fAc7C",
          abi: FusionForwarderABI,
        },
        FactoryForwarder: {
          address: "0x39Ba4C7C6538D1c6529C9562851444F26Cba8f9F",
          abi: FactoryForwarderABI,
        },
        FusionProxyFactory: {
          address: "0x12d8f1C2e392a2A6864456393cDCb9790d83D639",
          abi: FusionProxyFactoryABI,
        },
        FusionVault: {
          address: "0x77f4cC4dCdCf060740F889A95672060532baC70b",
          abi: FusionVaultABI,
        },
        UltraVerifier: {
          address: "0xC9da8b6DC9ED710Cc0e94aF8278b37FBCACc9A8e",
          abi: UltraVerifierABI,
        },
        GasTank: {
          address: "0xA2d6267B5b167Ee27174BfDa808408F90391D949",
          abi: null,
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
        },
        {
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
          id: "3408",
          logo: "/tokens/usdc-logo.svg",
        },
      ],
      transactions: {
        browserUrl: "https://sepolia-optimism.etherscan.io/",
      },
    },
    {
      name: "Base Sepolia",
      chainId: 84532,
      isMainnet: false,
      rpcUrl: "https://sepolia.base.org",
      wsUrl: "wss://base-sepolia-rpc.publicnode.com",
      isBase: false,
      logo: "/tokens/base-logo.svg",
      wormhole: {
        chainId: 10004,
      },
      deployments: {
        Fusion: {
          address: "0x2E03BAf7cAAee536e5680f8B210e48C89e18204A",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0xfC417EE9c5ee1018acf3297a608982dD547fAc7C",
          abi: FusionForwarderABI,
        },
        FactoryForwarder: {
          address: "0x39Ba4C7C6538D1c6529C9562851444F26Cba8f9F",
          abi: FactoryForwarderABI,
        },
        FusionProxyFactory: {
          address: "0x12d8f1C2e392a2A6864456393cDCb9790d83D639",
          abi: FusionProxyFactoryABI,
        },
        FusionVault: {
          address: "0x77f4cC4dCdCf060740F889A95672060532baC70b",
          abi: FusionVaultABI,
        },
        UltraVerifier: {
          address: "0xC9da8b6DC9ED710Cc0e94aF8278b37FBCACc9A8e",
          abi: UltraVerifierABI,
        },
        GasTank: {
          address: "0xA2d6267B5b167Ee27174BfDa808408F90391D949",
          abi: null,
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
        },
        {
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
          id: "3408",
          logo: "/tokens/usdc-logo.svg",
        },
      ],
      transactions: {
        browserUrl: "https://basescan.org/",
      },
    },
  ],
};

export default config;
