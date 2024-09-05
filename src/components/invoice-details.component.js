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
  //cover and logo redux state
  const logoImage = useSelector((state) => state.invoice.logoImage);

  //heading redux state
  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const selectedInvoiceType = useSelector(
    (state) => state.invoice.selectedInvoiceType
  );
  const invoiceDate = useSelector((state) => state.invoice.invoiceDate);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const billAddressData = useSelector((state) => state.invoice.billAddressData);

  const DownloadInvoice = () => (
    <PDFDownloadLink
      document={
        <InvoiceDownloadSection
          currencyType={selectedCurrencyType.label}
          invoiceType={selectedInvoiceType.label}
          invoiceDate={invoiceDate}
          invoiceNumber={invoiceNumber}
        />
      }
      fileName="invoice.pdf"
    >
      <Button variant="contained" color="primary">
        Download
      </Button>
    </PDFDownloadLink>
  );

  return (
    <>
      <HeadingSection />
      <ItemsSections />
      <PaymentSection />
      <NotesSection />
      <DownloadInvoice />
    </>
  );
}
