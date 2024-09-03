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
export default function InvoiceDownload() {
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
  return <div>InvoiceDownload</div>;
}
