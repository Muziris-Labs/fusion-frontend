import { createSlice } from "@reduxjs/toolkit";

const proofSlice = createSlice({
  name: "proof",

  initialState: {
    txProof: null,
    proofDrawer: false,
    isLoading: false,
  },

  reducers: {
    setTxProof: (state, action) => {
      state.txProof = action.payload;
    },

    toggleProofDrawer: (state) => {
      state.proofDrawer = !state.proofDrawer;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTxProof, toggleProofDrawer, setLoading } = proofSlice.actions;

export default proofSlice.reducer;
