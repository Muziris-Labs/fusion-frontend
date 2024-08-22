import { createSlice } from "@reduxjs/toolkit";

const selectorSlice = createSlice({
  name: "selector",

  initialState: {
    token: [
      {
        name: "ETH",
        symbol: "ETH",
        address: null,
        convert_id: "1027",
        usd_id: "2781",
        decimals: 18,
        logo: "/tokens/eth-logo.svg",
      },

      {
        name: "ETH",
        symbol: "ETH",
        address: null,
        convert_id: "1027",
        usd_id: "2781",
        decimals: 18,
        logo: "/tokens/eth-logo.svg",
      },
      ,
      null,
    ],

    drawerChain: 10,
    tokenDrawer: false,
    tokenIndex: 0,
  },

  reducers: {
    setToken: (state, action) => {
      const { token, index } = action.payload;
      state.token[index] = token;
    },

    setDrawerChain: (state, action) => {
      state.drawerChain = action.payload;
    },

    toggleTokenDrawer: (state) => {
      state.tokenDrawer = !state.tokenDrawer;
    },

    setTokenIndex: (state, action) => {
      state.tokenIndex = action.payload;
    },
  },
});

export const { setToken, setDrawerChain, toggleTokenDrawer, setTokenIndex } =
  selectorSlice.actions;

export default selectorSlice.reducer;
