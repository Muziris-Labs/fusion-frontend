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
      name: "Optimism Sepolia",
      chainId: 11155420,
      isMainnet: false,
      rpcUrl:
        "https://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
      wsUrl:
        "wss://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
      isBase: true,
      logo: "/tokens/op-logo.svg",
      wormhole: {
        chainId: 10005,
      },
      deployments: {
        Fusion: {
          address: "0x17DDF0820846565B5CF237E80Ad3D5A2bE3CCe3D",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0x7FdBdEA39A0Ec5ac3c714dc2Dd530dc6ab37Db6e",
          abi: FusionForwarderABI,
        },
        FactoryForwarder: {
          address: "0xFA2d0B8DE8c95c49615eAd2CAb22D26CB9998445",
          abi: FactoryForwarderABI,
        },
        FusionProxyFactory: {
          address: "0x3411eE3ACc6eC027bff5C60D5463f1f0BB9C5f2e",
          abi: FusionProxyFactoryABI,
        },
        FusionVault: {
          address: "0xDe45479eB204834f3Db76161bB8DE48a5A3B3D32",
          abi: FusionVaultABI,
        },
        UltraVerifier: {
          address: "0x0Ce655f9eE5AD99cF2dD1ABcB191951Cc3Ba5Cb9",
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
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: FusionABI,
        },
        FusionForwarder: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: FusionForwarderABI,
        },
        FactoryForwarder: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: FactoryForwarderABI,
        },
        FusionProxyFactory: {
          address: "0xd4B57a2d4aA433FC59b062a9D8f87972d5654430",
          abi: FusionProxyFactoryABI,
        },
        FusionVault: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: FusionVaultABI,
        },
        UltraVerifier: {
          address: "0x21709908c8c8aA55F20Be21F58E79352A9b7D790",
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
