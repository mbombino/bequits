import React from "react";

import BillDetails from "./components/BillDetails";
import ItemList from "./components/ItemList";
import TotalAmount from "./components/TotalAmount";
import { Grid, Paper, Box, Card } from "@mui/material";

import UploadFile from "./components/upload-files.component";
import PDFPreview from "./components/pdf-preview.component";

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={2.6} bgcolor={"black"}>
          <UploadFile />
        </Grid>
        <Grid item xs={5}>
          <Paper
            elevation={0}
            style={{
              height: 800,
            }}
          >
            Invoice details
          </Paper>
        </Grid>
        <Grid item xs={4.4} bgcolor={"#f1f1f1"}>
          <PDFPreview />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
