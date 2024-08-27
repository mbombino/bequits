import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  BlobProvider,
} from "@react-pdf/renderer";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Drawer,
  Paper,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";

import React, { useState } from "react";

import { useSelector } from "react-redux";

import {
  Download,
  DownloadDoneRounded,
  Settings,
  SettingsOutlined,
  Cloud,
  ContentCut,
  ContentCopy,
  ContentPaste,
} from "@mui/icons-material";

export default function PDFPreview() {
  const [defaultCoverImage, setDefaultCoverImage] = useState();
  const coverImageUrl = useSelector((state) => state.invoice.coverImageUrl);
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const selectedInvoiceType = useSelector(
    (state) => state.invoice.selectedInvoiceType
  );
  const invoiceDate = useSelector((state) => state.invoice.invoiceDate);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const billAddressData = useSelector((state) => state.invoice.billAddressData);
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const memo = useSelector((state) => state.invoice.memo);

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={logoImage} />
        <Text style={styles.reportTitle}>Xpress Enterprises</Text>
      </View>
    </View>
  );
  const Invoice = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <InvoiceTitle />
        </Page>
      </Document>
    );
  };

  return (
    <Box>
      <Box m={5}>
        <Typography variant="h5">PDF preview</Typography>
      </Box>

      <Box
        m={5}
        bgcolor={"white"}
        boxShadow={"1px 1px 10px 0px gray"}
        borderRadius={0.5}
        minHeight={550}
      >
        <img
          src={coverImageUrl}
          alt="img"
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <Box p={2}>
          <Box>
            <Typography>
              <b>{selectedInvoiceType.label}</b>
            </Typography>

            <Box>
              {invoiceNumber !== "" ? (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography style={{ fontSize: 10 }}>
                    #{invoiceNumber} * {invoiceDate.toString().split(" ")[1]}{" "}
                    {invoiceDate.toString().split(" ")[2]},{" "}
                    {invoiceDate.toString().split(" ")[3]}
                  </Typography>
                  {logoImage !== "" ? (
                    <img src={logoImage} alt="img" style={{ width: 30 }} />
                  ) : (
                    <></>
                  )}
                </Box>
              ) : (
                <Typography style={{ fontSize: 10 }}>
                  {invoiceNumber} * {invoiceDate.toString().split(" ")[1]}{" "}
                  {invoiceDate.toString().split(" ")[2]},{" "}
                  {invoiceDate.toString().split(" ")[3]}
                </Typography>
              )}
            </Box>
          </Box>
          <Grid container mt={2}>
            <Grid item lg={6}>
              <Typography style={{ fontSize: 10, color: "gray" }}>
                From:
              </Typography>
              <Box width={"18ch"}>
                <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                  {billAddressData.fromAddress}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Typography style={{ fontSize: 10, color: "gray" }}>
                Bill To:
              </Typography>
              <Box width={"18ch"}>
                <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                  {billAddressData.toAddress}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              bgcolor={"#f1f1f1"}
              borderRadius={1}
            >
              <Typography style={{ fontSize: 10 }}>Items</Typography>
              <Typography style={{ fontSize: 10 }}>Qty</Typography>
              <Typography style={{ fontSize: 10 }}>Rate</Typography>
            </Box>
            {itemsData.length > 0 &&
              itemsData.map((item) => (
                <Box key={item.itemNumber}>
                  <Grid
                    container
                    key={item.itemNumber}
                    style={{ marginTop: 4, marginBottom: 4 }}
                  >
                    <Grid item lg={6} width={"20ch"}>
                      <Typography
                        style={{ fontSize: 10, wordWrap: "break-word" }}
                      >
                        {item.itemDescription}
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        style={{ fontSize: 10, wordWrap: "break-word" }}
                      >
                        {item.itemQuantity}
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        style={{
                          fontSize: 10,
                          wordWrap: "break-word",
                          direction: "rtl",
                        }}
                      >
                        {item.itemRate}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
          </Box>
          <Box
            display={"flex"}
            mt={0.5}
            mb={0.5}
            ml={"50%"}
            justifyContent={"space-between"}
          >
            <Typography
              style={{
                fontSize: 10,
              }}
            >
              Subtotal:
            </Typography>
            <Typography style={{ fontSize: 10 }}>0.00</Typography>
          </Box>
          <Box>
            <Divider style={{ marginLeft: "50%", width: "50%" }} />
          </Box>
          <Box
            display={"flex"}
            mt={0.5}
            mb={0.5}
            ml={"50%"}
            justifyContent={"space-between"}
          >
            <Typography style={{ fontSize: 10 }}>Tax:</Typography>
            <Typography style={{ fontSize: 10 }}>0.00</Typography>
          </Box>
          <Divider style={{ marginLeft: "50%", width: "50%" }} />
          <Box
            display={"flex"}
            mt={0.5}
            mb={0.5}
            ml={"50%"}
            justifyContent={"space-between"}
          >
            <Typography
              style={{
                fontSize: 10,
              }}
            >
              Total:
            </Typography>
            <Typography style={{ fontSize: 10 }}>0.00</Typography>
          </Box>
          <Divider style={{ marginLeft: "50%", width: "50%" }} />
          <Box
            display={"flex"}
            mt={0.5}
            mb={0.5}
            ml={"50%"}
            justifyContent={"space-between"}
          >
            <Typography
              style={{
                fontSize: 10,
              }}
            >
              Discount:
            </Typography>
            <Typography style={{ fontSize: 10 }}>0.00</Typography>
          </Box>
          <Divider style={{ marginLeft: "50%", width: "50%" }} />
          <Box
            display={"flex"}
            mt={0.5}
            mb={0.5}
            ml={"50%"}
            justifyContent={"space-between"}
          >
            <Typography
              style={{
                fontSize: 10,
              }}
            >
              Balance Due:
            </Typography>
            <Typography style={{ fontSize: 13 }}>0.00</Typography>
          </Box>
          <Box>
            <Typography style={{ fontSize: 10, color: "gray" }}>
              Memo:
            </Typography>
            <Box width={"20ch"}>
              <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                {memo}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: { flexDirection: "row", marginTop: 24 },

  logo: { width: 150, alignSelf: "flex-end" },

  reportTitle: { fontSize: 16, textAlign: "right" },
});
