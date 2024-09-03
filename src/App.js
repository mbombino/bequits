import React from "react";

import { Grid, Paper, Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Settings } from "@mui/icons-material";
import { PDFViewer } from "@react-pdf/renderer";

import UploadFile from "./components/upload-files.component";
import PDFPreview from "./components/pdf-preview.component";
import InvoiceDetails from "./components/invoice-details.component";

function App() {
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
