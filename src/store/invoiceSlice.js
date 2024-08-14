import { createSlice } from "@reduxjs/toolkit";

/*const initialState ={
  coverImageUrl:
    "http://localhost:8080/files/jr-korpa-jrOJ35Rtkz0-unsplash.jpg",
};*/

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    coverImageUrl:
      "http://localhost:8080/files/jr-korpa-jrOJ35Rtkz0-unsplash.jpg",
  },

  reducers: {
    setCoverImageUrl: (state, action) => {
      state.coverImageUrl = action.payload;
    },
  },
});

export const { setCoverImageUrl } = invoiceSlice.actions;
export default invoiceSlice.reducer;
