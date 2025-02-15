import { createSlice } from "@reduxjs/toolkit";

const proofSlice = createSlice({
  name: "proof",

  initialState: {
    txProof: null,
    requestId: null,
    proofDrawer: false,
    isLoading: false,
    message: "Authenticating...",
    deadline: null,
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

    setMessage: (state, action) => {
      state.message = action.payload;
    },

    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },

    clearTxProof: (state) => {
      state.txProof = null;
    },

    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },
  },
});

export const {
  setTxProof,
  toggleProofDrawer,
  setLoading,
  setMessage,
  clearTxProof,
  setRequestId,
  setDeadline,
} = proofSlice.actions;

export default proofSlice.reducer;
