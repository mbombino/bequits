import { configureStore } from "@reduxjs/toolkit";
import { invoiceSlice } from "./invoiceSlice";

export const store = configureStore({
  user: invoiceSlice,
});
