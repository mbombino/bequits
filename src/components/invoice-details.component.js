import React from "react";

import HeadingSection from "./invoice-heading.component";
import ItemsSections from "./invoice-items.component";
import PaymentSection from "./invoice-payment.component";
import NotesSection from "./invoice-notes.component";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDownloadSection from "./invoice-download.component";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function InvoiceDetails() {
  return (
    <>
      <HeadingSection />
      <ItemsSections />
      <PaymentSection />
      <NotesSection />
    </>
  );
}
