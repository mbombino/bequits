import React from "react";

import BillDetails from "./components/BillDetails";
import ItemList from "./components/ItemList";
import TotalAmount from "./components/TotalAmount";
import { Grid, Paper, Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Settings } from "@mui/icons-material";
import { PDFViewer } from "@react-pdf/renderer";

import UploadFile from "./components/upload-files.component";
import PDFPreview from "./components/pdf-preview.component";
import InvoiceDetails from "./components/invoice-details.component";

function App() {
  const [items, setItems] = React.useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={2.5} bgcolor={"black"}>
          <UploadFile />
        </Grid>

        <Grid item xs={5}>
          <InvoiceDetails />
        </Grid>

        <Grid item xs={4.5} bgcolor={"#f1f1f1"}>
          <PDFPreview />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
