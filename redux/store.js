"use client";

import { configureStore } from "@reduxjs/toolkit";

import TxSlice from "./slice/TxSlice.js";
import userSlice from "./slice/UserSlice.js";
import proofSlice from "./slice/proofSlice.js";
import chainSlice from "./slice/chainSlice.js";
import SignupSlice from "./slice/SignupSlice.js";
import selectorSlice from "./slice/selectorSlice.js";
import gasTokenSlice from "./slice/gasTokenSlice.js";
import transferSlice from "./slice/transferSlice.js";
import changeSlice from "./slice/changeSlice.js";
import deploySlice from "./slice/deploySlice.js";

export const store = configureStore({
  reducer: {
    tx: TxSlice,
    user: userSlice,
    proof: proofSlice,
    chain: chainSlice,
    signup: SignupSlice,
    selector: selectorSlice,
    gasToken: gasTokenSlice,
    transfer: transferSlice,
    change: changeSlice,
    deploy: deploySlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
