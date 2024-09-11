import {
  Circle,
  Download,
  DownloadOutlined,
  DownloadRounded,
  FilePresent,
  FilePresentOutlined,
  FilePresentRounded,
  Height,
  HomeRepairServiceOutlined,
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
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
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
    <Box sx={styles.contentContainer}>
      <Box sx={styles.flexDirection}>
        <Box sx={styles.flex}>
          <Typography style={styles.subHeaderText}>BILLED TO:</Typography>
          <Typography style={styles.textSize}>you</Typography>
        </Box>

        <Box style={styles.flex}>
          <Typography style={styles.subHeaderText}>
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
        <Box sx={styles.itemsContainer}>
          <Box sx={styles.flexDirection}>
            <Box sx={styles.taskDirection}>
              <Typography style={styles.textSize}>
                {item.itemDescription}
              </Typography>
            </Box>
            <Box sx={styles.rateFlex}>
              <Typography style={styles.textSize}>RATE</Typography>
            </Box>
            <Box sx={styles.rateFlex}>
              <Typography style={styles.textSize}>
                {item.itemQuantity}
              </Typography>
            </Box>
            <Box sx={styles.rateFlex}>
              <Typography style={styles.textSize}>R0.00</Typography>
            </Box>
          </Box>
        </Box>
      </Fragment>
    ));
  const InvoiceTotal = () => (
    <Box sx={styles.totalContainer}>
      <Box sx={styles.totalDirection}>
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
  const InvoiceMemo = () => (
    <Box sx={{ marginLeft: "50%" }}>
      <Typography style={{ fontSize: 10 }}>
        Thank you for your business!
      </Typography>
    </Box>
  );
  const InvoicePayment = () => (
    <Box sx={styles.paymentContainer}>
      <Typography style={styles.totalTextSize}>PAYMENT INFORMATION</Typography>
    </Box>
  );

  //will make a gist
  const InvoiceFooter = () => (
    <Box
      sx={{
        backgroundColor: "#d1c2b8",
        padding: 1,
        marginTop: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={styles.textSize}>Company name</Typography>
        <Typography style={styles.textSize}>Cell number</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={styles.textSize}>Company address</Typography>
        <Typography style={styles.textSize}>Email address</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={styles.textSize}>Company city</Typography>
        <Typography style={styles.textSize}>Website</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <InvoiceMenuBar />
      <Box bgcolor={"white"} sx={{ margin: 3, height: 600 }}>
        <InvoiceHeader />
        <InvoiceHeading />
        <Box
          component={"main"}
          sx={{
            backgroundColor: "#faf6f5",
            marginLeft: 3,
            marginRight: 3,
            height: 450,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InvoiceItemsHeader />
          <InvoiceItem />
          <InvoiceTotal />
          <InvoiceMemo />
          <InvoicePayment />
          <InvoiceFooter />
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
  contentContainer: { paddingLeft: 3, paddingRight: 3, margin: 0.5 },
  itemsHeaderContainer: {
    backgroundColor: "#d1c2b8",
    padding: 2,
  },
  itemsContainer: {
    padding: 0.5,
    borderBottomStyle: "solid",
    borderBottomWidth: 0.5,
    borderColor: "#d1c2b8",
  },
  paymentContainer: {
    padding: 0.5,
    backgroundColor: "#d1c2b8",
    width: "50%",
    marginTop: 1,
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
    padding: 1,
    marginLeft: "50%",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 2,
  },
  totalDirection: {
    display: "flex",
  },
  flex: { flex: 1 },
  textSize: { fontSize: 10 },
  totalTextSize: { fontSize: 10, flex: 2 },
  totalRate: { fontSize: 10, flex: 0.8 },
  subHeaderText: { fontSize: 11 },
  taskFlex: { flex: 1.5 },
  rateFlex: { flex: 0.5 },
});
