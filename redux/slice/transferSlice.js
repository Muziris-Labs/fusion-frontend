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
    tokenModal: false,
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

    toggleTokenModal: (state, action) => {
      state.tokenModal = !state.tokenModal;
    },

    clearAll: (state, action) => {
      state.step = 0;
      state.amount = "0.0";
      state.recipient = "";
      state.gasless = false;
      state.gasAmount = null;
      state.selectedChain = null;
      state.selectedToken = null;
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
  clearAll,
  toggleTokenModal,
} = transferSlice.actions;

export default transferSlice.reducer;
