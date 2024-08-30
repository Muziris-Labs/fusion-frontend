import { createSlice } from "@reduxjs/toolkit";

const DeploySlice = createSlice({
  name: "Deploy",

  initialState: {
    open: false,
    step: 0,
    selectedChain: null,
    proof: null,
    isLoading: false,
    initializer: null,
  },

  reducers: {
    toggleDeployDrawer: (state) => {
      state.open = !state.open;
      state.step = 0;
      state.selectedChain = null;
      state.proof = null;
      state.isLoading = false;
      state.initializer = false;
    },

    setStep: (state, action) => {
      state.step = action.payload;
    },

    setSelectedChain: (state, action) => {
      state.selectedChain = action.payload;
    },

    setProof: (state, action) => {
      state.proof = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setInitializer: (state, action) => {
      state.initializer = action.payload;
    },
  },
});

export const {
  setStep,
  setSelectedChain,
  setProof,
  setLoading,
  toggleDeployDrawer,
  setInitializer,
} = DeploySlice.actions;

export default DeploySlice.reducer;
