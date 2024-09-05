import React, { useState } from "react";
import { Document, View, Text, Page, StyleSheet } from "@react-pdf/renderer";

export default function InvoiceDownloadSection({
  logoImage,
  currencyType,
  invoiceType,
  invoiceDate,
  invoiceNumber,
}) {
  const InvoiceHeading = () => (
    <View style={styles.padding}>
      <View>
        <Text style={styles.invoiceTypeFontSize}>{invoiceType}</Text>
      </View>
      <View style={styles.marginTop}>
        {invoiceNumber === "" ? (
          <Text>
            {invoiceNumber} •{" "}
            {new Date(invoiceDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        ) : (
          <View style={styles.flex}>
            <Text>
              #{invoiceNumber} •{" "}
              {new Date(invoiceDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4">
        <InvoiceHeading />
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  padding: { padding: 20 },
  invoiceTypeFontSize: { fontSize: 30, fontWeight: "bold" },
  marginTop: { marginTop: 5 },
  flex: { display: "flex", justifyContent: "space-between" },
});
