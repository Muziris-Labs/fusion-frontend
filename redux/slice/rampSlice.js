import { createSlice } from "@reduxjs/toolkit";

const rampSlice = createSlice({
  name: "ramp",

  initialState: {
    step: 0,
    selectedToken: null,
    selectedChain: null,
    rampTokenModal: false,
    chainFilter: null,
    amount: 0,
  },

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    toggleRampTokenModal: (state) => {
      state.rampTokenModal = !state.rampTokenModal;
    },

    setToken: (state, action) => {
      state.selectedToken = action.payload.token;
      state.selectedChain = action.payload.chain;
    },

    setChainFilter: (state, action) => {
      state.chainFilter = action.payload;
    },

    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const {
  setStep,
  toggleRampTokenModal,
  setToken,
  setChainFilter,
  setAmount,
} = rampSlice.actions;

export default rampSlice.reducer;
