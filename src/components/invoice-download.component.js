import React, { Fragment } from "react";
import {
  Document,
  View,
  Text,
  Page,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
  fontStyle: "normal",
  fontWeight: 700,
});

export default function InvoiceDownloadSection({
  logoImage,
  currencyType,
  invoiceType,
  invoiceDate,
  invoiceNumber,
  billAddress,
  items,
  discountType,
  discount,
  tax,
  memo,
}) {
  const InvoiceHeader = () => (
    <View style={styles.headerContainer}>
      <Image src={logoImage} style={styles.logo} />
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
            {currencyType === "Hourly rate" ? (
              <>
                <View style={styles.rate}>
                  <Text style={styles.text}>
                    R{parseFloat(item.itemHourRate).toFixed(2)}/hr
                  </Text>
                </View>
                <View style={styles.rate}>
                  <Text style={styles.text}>{item.itemHour}</Text>
                </View>
                <View style={styles.rate}>
                  <Text style={styles.text}>
                    R{parseFloat(item.itemHourRateTotal).toFixed(2)}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.rate}>
                  <Text style={styles.text}>{item.itemQuantity}</Text>
                </View>
                <View style={styles.rate}>
                  <Text style={styles.text}>
                    R{parseFloat(item.itemRate).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.rate}>
                  <Text style={styles.text}>
                    R{parseFloat(item.itemRateTotal).toFixed(2)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Fragment>
    ));

  const InvoiceTotals = () => {
    const invoiceSubtotal =
      currencyType === "Hourly rate"
        ? items.reduce(
            (total, item) => total + item.itemHourRate * item.itemHour,
            0
          )
        : items.reduce(
            (total, item) => total + item.itemQuantity * item.itemRate,
            0
          );

    const invoiceTax =
      currencyType === "Hourly rate"
        ? items.reduce(
            (total, item) =>
              total + item.itemHourRate * item.itemHour * (item.itemTax / 100),
            0
          )
        : items.reduce(
            (total, item) =>
              total + item.itemQuantity * item.itemRate * (item.itemTax / 100),
            0
          );

    const invoiceTotal = invoiceSubtotal + invoiceTax;

    const invoiceDiscount =
      discountType === "percent" ? invoiceTotal * (discount / 100) : discount;

    const invoiceTotalDue = invoiceTotal - invoiceDiscount;
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
            backgroundColor: "#d1c2b8",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.total}>SUBTOTAL</Text>
            <Text style={styles.price}>
              R{parseFloat(invoiceSubtotal).toFixed(2)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.total}>TAX</Text>
            <Text style={styles.price}>
              R{parseFloat(invoiceTax).toFixed(2)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.price}>
              R{parseFloat(invoiceTotal).toFixed(2)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.total}>DISCOUNT</Text>
            <Text style={styles.price}>
              R{parseFloat(invoiceDiscount).toFixed(2)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={[styles.totalDue]}>TOTAL DUE</Text>
            <Text style={styles.priceDue}>
              R{parseFloat(invoiceTotalDue).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: "50%" }}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>{memo}</Text>
        </View>
      </View>
    );
  };
  const InvoiceMemo = () => (
    <View style={styles.memoContainer}>
      <Text style={styles.subHeaderText}>PAYMENT INFORMATION</Text>
    </View>
  );
  const InvoiceFooter = () => (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "#d1c2b8",
        width: "100%",
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.text}>COMPANY NAME</Text>
        <Text style={styles.text}>CELL NUMBER</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text style={styles.text}>COMPANY ADDRESS</Text>
        <Text style={styles.text}>EMAIL ADDRESS</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text style={styles.text}>COMPANY CITY</Text>
        <Text style={styles.text}>WEBSITE</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4">
        <InvoiceHeader />
        <InvoiceHeading />
        <View
          style={{
            backgroundColor: "#faf6f5",
            marginLeft: 30,
            marginRight: 30,
            height: "75%",
          }}
        >
          <InvoiceHeaderItems />
          <InvoiceItems />
          <InvoiceTotals />
          <InvoiceMemo />
          <InvoiceFooter />
        </View>
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 30,
    gap: 5,
    backgroundColor: "#d1c2b8",
  },
  padding: { padding: 50 },
  invoiceTypeFontSize: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "normal",
  },
  marginTop: { marginTop: 5 },
  addressContainer: { paddingTop: 20, paddingBottom: 20, marginLeft: 30 },
  billAddress: { flex: 1 },
  invoiceNumber: { flex: 1.1 },

  flex: { flexDirection: "row", width: "100%" },

  headerTextContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  headerText: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "normal",
    color: "#333",
  },
  logo: { width: 30, height: 30 },
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
  total: {
    fontFamily: "Courier-Bold",
    fontWeight: "bold",
    fontSize: 10,
    flex: 2,
  },
  totalDue: { fontSize: 10, flex: 2 },
  price: { fontSize: 10, flex: 0.9 },
  priceDue: { fontSize: 10, flex: 0.9, fontWeight: "bold" },
  itemsHeaderContainer: {
    padding: 10,
    backgroundColor: "#d1c2b8",
  },
  itemsContainer: {
    padding: 10,
    borderColor: "#d1c2b8",
    borderBottomWidth: 0.5,
  },
  totalContainer: {
    padding: 20,
  },
  totalsContainer: {
    backgroundColor: "#d1c2b8",
  },
  taskDescription: { flex: 1.5 },
  rate: { flex: 0.5 },
  totalsFlex: { flexDirection: "row", width: "100%", marginTop: 10 },

  memoContainer: {
    padding: 10,
    backgroundColor: "#d1c2b8",
    width: "50%",
    marginTop: 20,
  },
});
