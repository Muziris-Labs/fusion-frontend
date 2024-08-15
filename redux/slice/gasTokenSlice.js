import { createSlice } from "@reduxjs/toolkit";

const gasTokenSlice = createSlice({
  name: "gasToken",

  initialState: {
    quantity: 0,
    updates: null,
    verifyCreditDrawer: false,
  },

  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    setUpdates: (state, action) => {
      state.updates = action.payload;
    },

    toggleVerifyCreditDrawer: (state) => {
      state.verifyCreditDrawer = !state.verifyCreditDrawer;
    },
  },
});

export const { setQuantity, setUpdates, toggleVerifyCreditDrawer } =
  gasTokenSlice.actions;

export default gasTokenSlice.reducer;
