import React from "react";
import jsPDF from "jspdf";
import BillDetails from "./components/BillDetails";
import ItemList from "./components/ItemList";
import TotalAmount from "./components/TotalAmount";
import Templates from "./components/Templates";
import styled from "@emotion/styled";
import { Grid, Paper, Box, Card } from "@mui/material";

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
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Invoice", 20, 20);

    // Add items to PDF
    items.forEach((item, index) => {
      const yPos = 30 + index * 10;
      pdf.text(
        `Item: ${item.item}, 
                Quantity: ${item.quantity}, 
                Price: ${item.price}`,
        20,
        yPos
      );
    });

    // Add total amount to PDF
    const totalAmount = calculateTotalAmount();
    pdf.text(
      `Total Amount: 
                $${totalAmount.toFixed(2)}`,
      20,
      180
    );

    // Save the PDF
    pdf.save("invoice.pdf");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={2.6} bgcolor={"black"}>
          <Templates />
        </Grid>
        <Grid item xs={5}>
          <Paper
            elevation={0}
            style={{
              //backgroundColor: "black",
              //color: "white",
              height: 800,
            }}
          >
            Invoice details
          </Paper>
        </Grid>
        <Grid item xs={4.4}>
          <Paper
            elevation={0}
            style={{
              backgroundColor: "#f1f1f1",
              //color: "white",
              height: 800,
            }}
          >
            PDF Preview
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
