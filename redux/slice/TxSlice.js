import { createSlice } from "@reduxjs/toolkit";

const TxSlice = createSlice({
  name: "tx",

  initialState: {
    isRunning: false,
  },

  reducers: {
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
  },
});

export const { setIsRunning } = TxSlice.actions;

export default TxSlice.reducer;
