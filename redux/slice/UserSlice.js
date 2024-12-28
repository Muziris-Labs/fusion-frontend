import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    walletAddress: null,
    walletAddresses: null,
    tokenBalanceData: null,
    tokenConversionData: null,
    gasCredit: 0,
    history: [],
    wsProvider: null,
    marketData: null,
    wallet: null,
    mailUser: null,
    user: null,
  },

  reducers: {
    setWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },

    setWalletAddresses: (state, action) => {
      state.walletAddresses = action.payload;
    },

    setTokenBalanceData: (state, action) => {
      state.tokenBalanceData = action.payload;
    },

    setTokenConversionData: (state, action) => {
      state.tokenConversionData = action.payload;
    },

    setGasCredit: (state, action) => {
      state.gasCredit = action.payload;
    },

    setHistory: (state, action) => {
      state.history = action.payload;
    },

    setWsProvider: (state, action) => {
      state.wsProvider = action.payload;
    },

    setMarketData: (state, action) => {
      state.marketData = action.payload;
    },

    setWallet: (state, action) => {
      state.wallet = action.payload;
    },

    setMailUser: (state, action) => {
      state.mailUser = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setWalletAddress,
  setWalletAddresses,
  setTokenBalanceData,
  setTokenConversionData,
  setGasCredit,
  setHistory,
  setWsProvider,
  setMarketData,
  setWallet,
  setMailUser,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
