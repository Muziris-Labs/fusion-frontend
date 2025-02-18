import FusionABI from "./contracts/Fusion.json";
import FusionProxyFactoryABI from "./contracts/FusionProxyFactory.json";

// Define all chains
const allChains = [
  {
    name: "Optimism",
    subdomain: "op",
    chainId: 10,
    isMainnet: true,
    rpcUrl:
      "https://optimism-mainnet.infura.io/v3/55fc2bbccea347dd9a980c05432f7846",
    wsUrl:
      "wss://optimism-mainnet.infura.io/ws/v3/55fc2bbccea347dd9a980c05432f7846",
    isBase: false,
    logo: "/tokens/op-logo.svg",
    deployments: {
      Fusion: {
        address: {
          v1: "0xfa23217D680da5d755EBf601700800da809008B3",
        },
        abi: FusionABI,
      },
      FusionProxyFactory: {
        address: {
          v1: "0x26F230BCa86f02E73B487f583f9D98D54266b3B5",
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
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        id: "3408",
        logo: "/tokens/usdc-logo.svg",
        block: "/block/usdc-block.svg",
        ramp: {
          isSupported: false,
          providers: [],
        },
      },
    ],
    transactions: {
      browserUrl: "https://optimistic.etherscan.io/",
    },
  },
  {
    name: "Base",
    subdomain: "base",
    chainId: 8453,
    isMainnet: true,
    rpcUrl:
      "https://base-mainnet.infura.io/v3/55fc2bbccea347dd9a980c05432f7846",
    wsUrl:
      "wss://base-mainnet.infura.io/ws/v3/55fc2bbccea347dd9a980c05432f7846",
    isBase: false,
    logo: "/tokens/base-logo.svg",
    deployments: {
      Fusion: {
        address: {
          v1: "0xfa23217D680da5d755EBf601700800da809008B3",
        },
        abi: FusionABI,
      },
      FusionProxyFactory: {
        address: {
          v1: "0x26F230BCa86f02E73B487f583f9D98D54266b3B5",
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
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        id: "3408",
        logo: "/tokens/usdc-logo.svg",
        block: "/block/usdc-block.svg",
        ramp: {
          isSupported: false,
          providers: [],
        },
      },
    ],
    transactions: {
      browserUrl: "https://basescan.org/",
    },
  },
  {
    name: "Fraxtal",
    subdomain: "fraxtal",
    chainId: 252,
    isMainnet: true,
    rpcUrl: "https://rpc.frax.com",
    wsUrl: "wss://fraxtal-rpc.publicnode.com",
    isBase: false,
    logo: "/tokens/fraxtal-logo.png",
    deployments: {
      Fusion: {
        address: {
          v1: "0xfa23217D680da5d755EBf601700800da809008B3",
        },
        abi: FusionABI,
      },
      FusionProxyFactory: {
        address: {
          v1: "0x26F230BCa86f02E73B487f583f9D98D54266b3B5",
        },
        abi: FusionProxyFactoryABI,
      },
    },
    utils: {
      eth_id: 23225,
      usd_id: 2781,
      gasLimit: 2000000,
    },
    tokens: [
      {
        name: "Frax ETH",
        symbol: "frxETH",
        decimals: 18,
        address: "0x0000000000000000000000000000000000000000",
        id: "23225",
        logo: "/tokens/frxeth-logo.svg",
        block: "/tokens/frxeth-logo.svg",
        ramp: {
          isSupported: false,
          providers: [],
        },
      },
      {
        name: "Frax USD",
        symbol: "FraxUSD",
        decimals: 18,
        address: "0xFc00000000000000000000000000000000000001",
        id: "6952",
        logo: "/tokens/frax-logo.svg",
        block: "/tokens/frax-logo.svg",
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
      browserUrl: "https://fraxscan.com/",
    },
  },
  {
    name: "Unichain",
    subdomain: "uni",
    chainId: 130,
    isMainnet: true,
    rpcUrl: "https://mainnet.unichain.org",
    wsUrl: "wss://unichain-rpc.publicnode.com",
    isBase: false,
    logo: "/tokens/unichain-logo.jpg",
    deployments: {
      Fusion: {
        address: {
          v1: "0xfa23217D680da5d755EBf601700800da809008B3",
        },
        abi: FusionABI,
      },
      FusionProxyFactory: {
        address: {
          v1: "0x26F230BCa86f02E73B487f583f9D98D54266b3B5",
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
        address: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
        id: "3408",
        logo: "/tokens/usdc-logo.svg",
        block: "/block/usdc-block.svg",
        ramp: {
          isSupported: false,
          providers: [],
        },
      },
    ],
    transactions: {
      browserUrl: "https://uniscan.xyz/",
    },
  },
  {
    name: "Optimism Sepolia",
    subdomain: "testnet",
    chainId: 11155420,
    isMainnet: false,
    rpcUrl: "https://optimism-sepolia.drpc.org",
    wsUrl:
      "wss://optimism-sepolia.infura.io/ws/v3/55fc2bbccea347dd9a980c05432f7846",
    isBase: false,
    logo: "/tokens/op-logo.svg",
    deployments: {
      Fusion: {
        address: {
          v1: "0xfa23217D680da5d755EBf601700800da809008B3",
        },
        abi: FusionABI,
      },
      FusionProxyFactory: {
        address: {
          v1: "0x26F230BCa86f02E73B487f583f9D98D54266b3B5",
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
          isSupported: false,
          providers: [],
        },
      },
    ],
    transactions: {
      browserUrl: "https://sepolia-optimism.etherscan.io/",
    },
  },
];

// Get subdomain from hostname if in browser environment
let currentSubdomain = "";
if (typeof window !== "undefined") {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    currentSubdomain = parts[0];
  }
}

// For server-side rendering with Next.js, you'll need to get this information
// from context in getServerSideProps and pass it to client components

// Filter chains based on subdomain or return mainnet chains
const getChainsBySubdomain = (subdomain) => {
  if (!subdomain || subdomain === "app") {
    // If no subdomain provided, return all mainnet chains
    return allChains.filter((chain) => chain.isMainnet);
  }

  // Find the chain that matches the subdomain
  const matchingChain = allChains.find(
    (chain) => chain.subdomain.toLowerCase() === subdomain.toLowerCase()
  );

  // Return an array with just the matching chain or empty array if none found
  return matchingChain ? [matchingChain] : [];
};

// Create the final config object
const config = {
  name: "ValeriumProtocol",
  version: "0.1.0",
  author: "Anoy Roy Chowdhury",
  // Export filtered chains based on subdomain
  chains: getChainsBySubdomain(currentSubdomain),
};

export default config;
