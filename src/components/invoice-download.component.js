import React, { Fragment, useState } from "react";
import {
  Document,
  View,
  Text,
  Page,
  StyleSheet,
  Svg,
  G,
  Polygon,
  Rect,
} from "@react-pdf/renderer";
import { Grid } from "@mui/material";

export default function InvoiceDownloadSection({
  logoImage,
  currencySymbol,
  invoiceType,
  invoiceDate,
  invoiceNumber,
  billAddress,
  items,
}) {
  const InvoiceHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.invoiceTypeFontSize}>Company Name & Logo</Text>
    </View>
  );
  const InvoiceHeading = () => (
    <View style={styles.addressContainer}>
      <View style={styles.flex}>
        <View style={styles.billAddress}>
          <Text style={styles.subHeaderText}>BILLED TO:</Text>
          <Text style={styles.text}>you</Text>
        </View>

        <View style={styles.invoiceNumber}>
          <Text style={styles.subHeaderText}>
            {invoiceType}: {invoiceNumber && `#${invoiceNumber}`}
          </Text>
          <Text style={styles.text}>
            {new Date(invoiceDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
  const InvoiceHeaderItems = () => (
    <View style={styles.itemsHeaderContainer}>
      <View style={styles.flex}>
        <View style={styles.taskDescription}>
          <Text style={styles.subHeaderText}>TASK</Text>
        </View>

        <View style={styles.rate}>
          <Text style={styles.subHeaderText}>RATE</Text>
        </View>
        <View style={styles.rate}>
          <Text style={styles.subHeaderText}>HOURS</Text>
        </View>
        <View style={styles.rate}>
          <Text style={styles.subHeaderText}>TOTAL</Text>
        </View>
      </View>
    </View>
  );
  const InvoiceItems = () =>
    items.map((item) => (
      <Fragment key={item.itemNumber}>
        <View style={styles.itemsContainer}>
          <View style={styles.flex}>
            <View style={styles.taskDescription}>
              <Text style={styles.text}>{item.itemDescription}</Text>
            </View>
            <View style={styles.rate}>
              <Text style={styles.text}>{item.itemQuantity}</Text>
            </View>
            <View style={styles.rate}>
              <Text style={styles.text}>
                {currencySymbol}
                {item.itemRate}
              </Text>
            </View>
            <View style={styles.rate}>
              <Text style={styles.text}>
                {currencySymbol}
                {item.itemRate}
              </Text>
            </View>
          </View>
        </View>
      </Fragment>
    ));

  const InvoiceTotals = () => {
    const invoiceSubtotal = items.reduce(
      (total, item) => total + item.itemQuantity * item.itemRate,
      0
    );
    const invoiceTax = items.reduce(
      (total, item) =>
        total + item.itemQuantity * item.itemRate * (item.itemTax / 100),
      0
    );
    const invoiceTotal = invoiceSubtotal + invoiceTax;
    /*const invoiceDiscount =
      selectedDiscountType === "percent"
        ? invoiceTotal * (discount / 100)
        : discount;

    const invoiceBalanceDue = invoiceTotal - invoiceDiscount;*/
    return (
      <View>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            marginLeft: "50%",
            marginTop: 20,
            marginBottom: 20,
            marginRight: 30,
            backgroundColor: "#f8efee",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.total}>SUBTOTAL</Text>
            <Text style={styles.price}>
              {currencySymbol}
              {invoiceSubtotal}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.total}>TAX</Text>
            <Text style={styles.price}>
              {currencySymbol}
              {invoiceTax}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.price}>
              {currencySymbol}
              {invoiceTotal}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const InvoiceMemo = () => (
    <View style={styles.memoContainer}>
      <Text style={styles.subHeaderText}>PAYMENT INFORMATION</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4">
        <InvoiceHeader />
        <InvoiceHeading />
        <InvoiceHeaderItems />
        <InvoiceItems />
        <InvoiceTotals />
        <InvoiceMemo />
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 50,
    backgroundColor: "#f8efee",
  },
  padding: { padding: 50 },
  invoiceTypeFontSize: { fontSize: 24 },
  marginTop: { marginTop: 5 },
  addressContainer: { paddingTop: 20, paddingBottom: 20, marginLeft: 30 },
  billAddress: { flex: 1 },
  invoiceNumber: { flex: 1 },

  flex: { flexDirection: "row", width: "100%" },

  headerTextContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeaderText: {
    fontSize: 12,
    color: "#333",
    textTransform: "uppercase",
  },
  headerLogoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  text: {
    fontSize: 10,
    color: "#333",
  },
  total: { fontSize: 10, flex: 2 },
  price: { fontSize: 10, flex: 1.4 },
  itemsHeaderContainer: {
    padding: 20,
    backgroundColor: "#f8efee",
    marginLeft: 30,
    marginRight: 30,
  },
  itemsContainer: {
    padding: 20,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  totalContainer: {
    padding: 20,
  },
  totalsContainer: {
    //padding: 20,
    backgroundColor: "#f8efee",
  },
  taskDescription: { flex: 1.5 },
  rate: { flex: 0.5 },
  totalsFlex: { flexDirection: "row", width: "100%", marginTop: 10 },

  memoContainer: {
    padding: 20,
    backgroundColor: "#f8efee",
    width: "45%",
    marginTop: 20,
    marginLeft: 30,
  },
});
