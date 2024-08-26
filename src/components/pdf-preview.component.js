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
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const itemsData = useSelector((state) => state.invoice.itemsData);

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
    <>
      <Box m={5}>
        <Typography variant="h5">PDF preview</Typography>
      </Box>

      <Box
        m={5}
        bgcolor={"white"}
        boxShadow={"1px 1px 10px 0px gray"}
        borderRadius={0.5}
      >
        <img
          src={coverImageUrl}
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <Box mt={5} ml={2}>
          <Typography>{selectedInvoiceType.label}</Typography>
          <Box style={styles.titleContainer}>
            <Box style={styles.spaceBetween}>
              {invoiceNumber !== "" ? (
                <Typography>#{invoiceNumber} * August 14, 2024</Typography>
              ) : (
                <Typography>{invoiceNumber} * August 14, 2024</Typography>
              )}

              <img src={logoImage} style={styles.logo} />
            </Box>
          </Box>
        </Box>
        {itemsData.length > 0 &&
          itemsData.map((item) => (
            <Box
              key={item.itemNumber}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography>{item.itemDescription}</Typography>
              <Typography>{item.itemQuantity}</Typography>
              <Typography>{item.itemRate}</Typography>
            </Box>
          ))}
      </Box>
    </>
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
