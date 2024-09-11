import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    //invoice details
    currencyTypes: [
      {
        value: 1,
        label: "Hourly rate",
      },
      {
        value: 2,
        label: "Quantity rate",
      },
    ],
    invoiceTypes: [
      {
        value: 1,
        label: "Invoice",
      },
      {
        value: 2,
        label: "Quote",
      },
      {
        value: 3,
        label: "Estimate",
      },
    ],
    coverImageUrl:
      "http://localhost:8080/files/jr-korpa-jrOJ35Rtkz0-unsplash.jpg",
    logoImage: "",
    selectedCurrencyType: { value: 1, label: "Hourly rate" },
    selectedInvoiceType: { value: 1, label: "Invoice" },
    invoiceDate: new Date().toDateString(),
    invoiceNumber: "001",
    billAddressData: { fromAddress: "", toAddress: "" },
    itemsData: [
      {
        itemNumber: Date.now().toString(32) + Math.random().toString(16),
        itemDescription: "",
        itemHour: 1,
        itemQuantity: 1,
        itemHourRate: 0,
        itemRate: 0,
        itemRatePrefix: "",
        itemHourRatePrefix: "",
        itemHourRateSuffix: "",
        itemTax: 0,
      },
    ],
    subtotal: 0,
    tax: 0,
    total: 0,
    discount: 0,
    selectedDiscountType: "percent",
    balanceDue: 0,
    bankingDetails: "",
    memo: "Thank you for your business!",
  },

  reducers: {
    setCoverImageUrl: (state, action) => {
      state.coverImageUrl = action.payload;
    },
    setLogoImage: (state, action) => {
      state.logoImage = action.payload;
    },
    setCurrencyTypes: (state, action) => {
      state.currencyTypes.push(action.payload);
    },
    setSelectedCurrencyType: (state, action) => {
      state.selectedCurrencyType = action.payload;
    },
    setInvoiceTypes: (state, action) => {
      state.currencyTypes.push(action.payload);
    },
    setSelectedInvoiceType: (state, action) => {
      state.selectedInvoiceType = action.payload;
    },
    setInvoiceDate: (state, action) => {
      state.invoiceDate = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setBillAddressData: (state, action) => {
      state.billAddressData = action.payload;
    },
    setAddItemsData: (state, action) => {
      state.itemsData.push(action.payload);
    },
    setEditItemsData: (state, action) => {
      //replace old array with new one
      const itemToEdit = state.itemsData.find(
        (e) => e.itemNumber === action.payload.itemNumber
      );
      state.itemsData.splice(
        state.itemsData.indexOf(itemToEdit),
        1,
        action.payload
      );
    },
    setDeleteItemsData: (state, action) => {
      const itemToDelete = state.itemsData.find(
        (e) => e.itemNumber === action.payload.itemNumber
      );

      state.itemsData.splice(state.itemsData.indexOf(itemToDelete), 1);
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setSelectedDiscountType: (state, action) => {
      state.selectedDiscountType = action.payload;
    },
    setBankingDetails: (state, action) => {
      state.bankingDetails = action.payload;
    },
    setMemo: (state, action) => {
      state.memo = action.payload;
    },
  },
});

export const {
  setCoverImageUrl,
  setLogoImage,
  setSelectedCurrencyType,
  setSelectedInvoiceType,
  setInvoiceDate,
  setInvoiceNumber,
  setBillAddressData,
  setAddItemsData,
  setEditItemsData,
  setDeleteItemsData,
  setSubtotal,
  setDiscount,
  setSelectedDiscountType,
  setBankingDetails,
  setMemo,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
