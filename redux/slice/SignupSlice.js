import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",

  initialState: {
    step: 0,
    domain: "",
    passkey: null,
    email: null,
    user: null,
  },

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    setDomain: (state, action) => {
      state.domain = action.payload;
    },

    setPasskey: (state, action) => {
      state.passkey = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    clearPasskey: (state) => {
      state.passkey = "";
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearAll: (state) => {
      state.step = 0;
      state.domain = null;
      state.passkey = null;
      state.email = null;
      state.user = null;
    },
  },
});

export const {
  setStep,
  setDomain,
  setPasskey,
  setEmail,
  clearPasskey,
  clearAll,
  setUser,
} = signupSlice.actions;

export default signupSlice.reducer;
