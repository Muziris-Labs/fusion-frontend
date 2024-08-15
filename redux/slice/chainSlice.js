import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",

  initialState: {
    currentChain: {
      chainId: 11155420,
      chainName: "OP Sepolia",
      isBase: true,
      rpcUrl: "https://public.stackup.sh/api/v1/node/optimism-sepolia",
      convert_id: "2781",
      id: "1027",
      symbol: "ETH",
      logo: "/eth-logo.svg",
      addresses: {
        Valerium: "0x98A4913E2c87FcBabcDAE1f056EA31da33eEF954",
        ValeriumForwarder: "0xE04CD87ce9bC58b049F196796236C134b3E9c2bf",
        FactoryForwarder: "0xeeDae90A904555ed770d22d8ec8453db0da23CAF",
        ValeriumProxyFactory: "0x1262Cb3C586C95ffca465CAD303257F24246a8A9",
        ValeriumVault: "0xE3Da83526a082867729182d4b656ee28b0AD2bD5",
        PasswordVerifier: "0x008Ca969293633dFDeBe7b1aD133213Aa47D1004",
        SignatureVerifier: "0xa7378013Cf8dB10ce44aAf8934cE1E674C56Acec",
        ValeriumGasTank: "0x51781cc1439BD05a85185C8c8CEc979b263236e3",
      },

      style: {
        baseTextColor: "#FFFFFF",
        colorDark: "#FF0420",
        colorLight: "#FF0420",
        gradientColorDark:
          "linear-gradient(93deg, rgba(255, 4, 32, 0.40) 0%, rgba(153, 2, 19, 0.40) 100%)",
        gradientColorLight:
          "linear-gradient(93deg, rgba(255, 4, 32, 0.80) 0%, rgba(153, 2, 19, 0.80) 100%)",
        backgroundColorDark: "rgba(255, 4, 32, 0.40)",
        backgroundColorLight: "rgba(255, 4, 32, 0.20)",
        backgroundShadowEffect:
          "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(255, 74, 94, 0.00) 60%, rgba(255, 4, 32, 0.80) 100%)",
        logo: "/optimism-logo.svg",
      },

      tokens: [
        {
          name: "ETH",
          symbol: "ETH",
          address: null,
          convert_id: "1027",
          usd_id: "2781",
          decimals: 18,
          logo: "/eth-logo.svg",
        },

        {
          name: "USDC",
          symbol: "USDC",
          address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
          convert_id: "3408",
          usd_id: "2781",
          decimals: 6,
          logo: "/usdc-logo.svg",
        },
      ],
    },
  },

  reducers: {
    setCurrentChain: (state, action) => {
      state.currentChain = action.payload;
    },
  },
});

export const { setCurrentChain } = chainSlice.actions;

export default chainSlice.reducer;
