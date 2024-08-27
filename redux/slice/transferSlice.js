import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
  name: "transfer",

  initialState: {
    step: 0,
    amount: "0.0",
    recipient: "",
    gasless: false,
    gasAmount: null,
    selectedChain: null,
    selectedToken: null,
    chainFilter: null,
  },

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    setAmount: (state, action) => {
      state.amount = action.payload;
    },

    setRecipient: (state, action) => {
      state.recipient = action.payload;
    },

    setGasless: (state, action) => {
      state.gasless = action.payload;
    },

    setGasAmount: (state, action) => {
      state.gasAmount = action.payload;
    },

    setToken: (state, action) => {
      state.selectedToken = action.payload.token;
      state.selectedChain = action.payload.chain;
    },

    setChainFilter: (state, action) => {
      state.chainFilter = action.payload;
    },
  },
});

export const {
  setStep,
  setAmount,
  setRecipient,
  setGasless,
  setGasAmount,
  setToken,
  setChainFilter,
} = transferSlice.actions;

export default transferSlice.reducer;
