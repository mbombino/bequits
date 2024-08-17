import {
  Add,
  MoreHorizRounded,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

import { useSelector } from "react-redux";

export default function InvoiceDetails() {
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const currencies = [
    {
      value: "USD",
      label: "USD ($)",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  const invoiceTypes = [
    {
      value: 1,
      label: "Invoice",
    },
    {
      value: 2,
      label: "Quote",
    },
    {
      value: 3,
      label: "Estimate",
    },
  ];

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
      <Box m={5} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Invoice details</Typography>
        <IconButton
          size="small"
          style={{
            borderRadius: 10,
            boxShadow: "1px 1px 5px 0px gray",
          }}
        >
          <SettingsOutlined />
        </IconButton>
      </Box>
      <Box display={"flex"}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 5, width: "8ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField variant="outlined" select defaultValue="EUR" size="small">
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, width: "15ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField variant="outlined" select defaultValue={1} size="small">
            {invoiceTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, width: "15ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker slotProps={{ textField: { size: "small" } }} />
          </LocalizationProvider>
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, width: "8ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField size="small"></TextField>
        </Box>
      </Box>
      <Box display={"flex"} m={2}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 3, width: "24ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            multiline={true}
            maxRows={2}
            helperText={"Bill to: Enter name and address"}
          ></TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, width: "24ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            multiline={true}
            maxRows={2}
            helperText={"From: Enter your name and address"}
          ></TextField>
        </Box>
      </Box>
      <Box
        display={"flex"}
        p={1}
        ml={5}
        mr={5}
        justifyContent={"space-around"}
        bgcolor={"#f1f1f1"}
        borderRadius={1}
      >
        <Typography>Items</Typography>
        <Typography>Qty</Typography>
        <Typography>Rate</Typography>
      </Box>
      <Box display={"flex"}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 5, mt: 2, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            multiline={true}
            maxRows={2}
            helperText={"Description of service or task"}
          ></TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, mt: 2, width: "8ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField></TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, mt: 2, width: "14ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField></TextField>
        </Box>
        <Box mt={3} ml={1}>
          <IconButton style={{ borderRadius: 10 }} size="small">
            <MoreHorizRounded />
          </IconButton>
        </Box>
      </Box>
      <Box ml={5} mt={1}>
        <Button
          variant="outlined"
          style={{ borderStyle: "dashed", height: 50, width: "92%" }}
        >
          <Add />
          <Typography style={{ textTransform: "none" }}>Add item</Typography>
        </Button>
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
