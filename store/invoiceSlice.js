import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coverImageUrl: "",
};

export const invoiceSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setCoverImageUrl: (state, action) => {
      state.coverImageUrl = action.payload;
    },
  },
});

export const { setCoverImageUrl } = invoiceSlice.actions;
export default invoiceSlice.reducer;
