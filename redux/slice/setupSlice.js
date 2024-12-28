import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
  name: "setup",

  initialState: {
    open: false,
    isLoading: false,
    step: 0,
    accessToken: null,
    authentication: null,
    requestTime: null,
  },

  reducers: {
    toggleSetupDrawer: (state) => {
      state.open = !state.open;
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAuthentication: (state, action) => {
      state.authentication = action.payload;
    },
    setRequestTime: (state, action) => {
      state.requestTime = action.payload;
    },
    clearAll: (state) => {
      state.open = false;
      state.isLoading = false;
    },
  },
});

export const {
  toggleSetupDrawer,
  setIsLoading,
  clearAll,
  setStep,
  setAccessToken,
  setAuthentication,
  setRequestTime,
} = setupSlice.actions;

export default setupSlice.reducer;
