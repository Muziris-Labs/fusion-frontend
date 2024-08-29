import { createSlice } from "@reduxjs/toolkit";

const changeSlice = createSlice({
  name: "change",

  initialState: {
    open: false,
    isLoading: false,
    step: 0,
    passkey: null,
    email: null,
  },

  reducers: {
    toggleChangeDrawer: (state) => {
      state.open = !state.open;
      state.isLoading = false;
      state.step = 0;
      state.passkey = null;
      state.email = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPasskey: (state, action) => {
      state.passkey = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearAll: (state) => {
      state.open = false;
      state.isLoading = false;
      state.step = 0;
      state.passkey = null;
      state.email = null;
    },
  },
});

export const {
  toggleChangeDrawer,
  setIsLoading,
  setStep,
  setPasskey,
  setEmail,
  clearAll,
} = changeSlice.actions;

export default changeSlice.reducer;
