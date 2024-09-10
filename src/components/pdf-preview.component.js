import {
  Circle,
  Download,
  DownloadOutlined,
  DownloadRounded,
  FilePresent,
  FilePresentOutlined,
  FilePresentRounded,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";

import React, { Fragment, useState } from "react";

import { useSelector } from "react-redux";
import InvoiceDownloadSection from "./invoice-download.component";

export default function PDFPreview() {
  const coverImageUrl = useSelector((state) => state.invoice.coverImageUrl);
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const selectedInvoiceType = useSelector(
    (state) => state.invoice.selectedInvoiceType
  );
  const invoiceDate = useSelector((state) => state.invoice.invoiceDate);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const billAddressData = useSelector((state) => state.invoice.billAddressData);
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const subtotal = useSelector((state) => state.invoice.subtotal);
  const discount = useSelector((state) => state.invoice.discount);
  const selectedDiscountType = useSelector(
    (state) => state.invoice.selectedDiscountType
  );
  const memo = useSelector((state) => state.invoice.memo);
  const bankingDetails = useSelector((state) => state.invoice.bankingDetails);

  const invoiceSubtotal = itemsData.reduce(
    (total, item) => total + item.itemQuantity * item.itemRate,
    0
  );

  const invoiceTax = itemsData.reduce(
    (total, item) =>
      total + item.itemQuantity * item.itemRate * (item.itemTax / 100),
    0
  );

  const invoiceTotal = invoiceSubtotal + invoiceTax;

  const invoiceDiscount =
    selectedDiscountType === "percent"
      ? invoiceTotal * (discount / 100)
      : discount;

  const invoiceBalanceDue = invoiceTotal - invoiceDiscount;

  //get base64
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  //upload logo image
  const upload = (event) => {
    let currentFile = event.target.files[0];

    getBase64(currentFile).then((result) => {
      //setUploadedFile(result);
      //setLogoImageSelected(true);
      //dispatch(setLogoImage(result));
      console.log(result);
    });
  };
  const InvoiceMenuBar = () => (
    <Box
      p={1}
      bgcolor={"white"}
      boxShadow={"0px 0px 1px 0px gray"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} gap={1}>
        <input
          id="btn-change"
          style={{ display: "none" }}
          type="file"
          onChange={upload}
        />
        <IconButton
          size="small"
          sx={{ borderRadius: 2 }}
          onClick={() => document.getElementById("btn-change").click()}
        >
          <FilePresentRounded />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton size="small" sx={{ borderRadius: 2 }}>
          <Circle sx={{ color: "#d1c2b8" }} />
        </IconButton>
      </Box>
      <Box>
        <PDFDownloadLink
          document={
            <InvoiceDownloadSection
              currencySymbol={selectedCurrencyType.symbol}
              invoiceType={selectedInvoiceType.label}
              invoiceDate={invoiceDate}
              invoiceNumber={invoiceNumber}
              billAddress={billAddressData}
              items={itemsData}
            />
          }
          fileName="invoice.pdf"
        >
          <IconButton size="small" sx={{ borderRadius: 2 }}>
            <DownloadRounded />
          </IconButton>
        </PDFDownloadLink>
      </Box>
    </Box>
  );
  const InvoiceHeader = () => (
    <Box style={styles.headerContainer}>
      <Typography>Company Name & Logo</Typography>
    </Box>
  );
  const InvoiceHeading = () => (
    <Box style={styles.contentContainer}>
      <Box style={styles.flexDirection}>
        <Box style={styles.flex}>
          <Typography>BILLED TO:</Typography>
          <Typography style={styles.textSize}>you</Typography>
        </Box>

        <Box style={styles.flex}>
          <Typography>
            {selectedInvoiceType.label}: {invoiceNumber && `#${invoiceNumber}`}
          </Typography>
          <Typography style={styles.textSize}>
            {new Date(invoiceDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const InvoiceItemsHeader = () => (
    <Box style={styles.itemsHeaderContainer}>
      <Box style={styles.flexDirection}>
        <Box style={styles.taskFlex}>
          <Typography style={styles.subHeaderText}>TASK</Typography>
        </Box>

        <Box style={styles.rateFlex}>
          <Typography style={styles.subHeaderText}>RATE</Typography>
        </Box>
        <Box style={styles.rateFlex}>
          <Typography style={styles.subHeaderText}>HOURS</Typography>
        </Box>
        <Box style={styles.rateFlex}>
          <Typography style={styles.subHeaderText}>TOTAL</Typography>
        </Box>
      </Box>
    </Box>
  );
  const InvoiceItem = () =>
    itemsData.map((item) => (
      <Fragment key={item.itemNumber}>
        <Box style={styles.itemsContainer}>
          <Box style={styles.flexDirection}>
            <Box style={styles.taskDirection}>
              <Typography style={styles.textSize}>
                {item.itemDescription}
              </Typography>
            </Box>
            <Box style={styles.rateFlex}>
              <Typography style={styles.textSize}>RATE</Typography>
            </Box>
            <Box style={styles.rateFlex}>
              <Typography style={styles.textSize}>
                {item.itemQuantity}
              </Typography>
            </Box>
            <Box style={styles.rateFlex}>
              <Typography style={styles.textSize}>R0.00</Typography>
            </Box>
          </Box>
        </Box>
      </Fragment>
    ));
  const InvoiceTotal = () => (
    <Box style={styles.totalContainer}>
      <Box style={styles.totalDirection}>
        <Typography style={styles.totalTextSize}>SUBTOTAL</Typography>
        <Typography style={styles.totalRate}>R0.00</Typography>
      </Box>
      <Box>
        <Typography style={styles.textSize}>TAX</Typography>
      </Box>
      <Box>
        <Typography style={styles.textSize}>TOTAL</Typography>
      </Box>
      <Box>
        <Typography style={styles.textSize}>DISCOUNT</Typography>
      </Box>
      <Box>
        <Typography style={styles.textSize}>TOTAL DUE</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <InvoiceMenuBar />
      <Box margin={5} bgcolor={"white"}>
        <InvoiceHeader />
        <InvoiceHeading />
        <Box style={{ paddingLeft: 30, paddingRight: 30 }}>
          <InvoiceItemsHeader />
          <InvoiceItem />
          <InvoiceTotal />
        </Box>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 30,
    backgroundColor: "#d1c2b8",
  },
  contentContainer: { padding: 30 },
  itemsHeaderContainer: { backgroundColor: "#d1c2b8", padding: 5 },
  itemsContainer: {
    padding: 5,
    borderBottomStyle: "solid",
    borderBottomWidth: 0.5,
    borderColor: "#d1c2b8",
  },
  flexDirection: { display: "flex", width: "100%" },
  taskDirection: {
    flex: 1.5,
  },
  itemDirection: {
    flex: 0.5,
  },
  totalContainer: {
    backgroundColor: "#d1c2b8",
    padding: 5,
    marginLeft: "50%",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
  },
  totalDirection: {
    display: "flex",
  },
  flex: { flex: 1 },
  textSize: { fontSize: 12 },
  totalTextSize: { fontSize: 12, flex: 2 },
  totalRate: { fontSize: 12, flex: 0.8 },
  subHeaderText: { fontSize: 14 },
  taskFlex: { flex: 1.5 },
  rateFlex: { flex: 0.5 },
});
