import { Box, Typography } from "@mui/material";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export default function PDFPreview() {
  return (
    <Box mt={6} ml={6} bgcolor={"#f1f1f1"}>
      <Typography variant="h5">PDF preview</Typography>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image style={styles.image} src="/images/quijote1.jpg" />

          <Text style={styles.section}>Invoice</Text>
        </Page>
      </Document>
    </Box>
  );
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
