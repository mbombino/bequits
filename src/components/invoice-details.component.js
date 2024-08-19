import React, { useState } from "react";
import {
  Add,
  DeleteForeverRounded,
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
  Menu,
  Switch,
  InputAdornment,
  Divider,
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
import { Dayjs } from "dayjs";
import {
  setDeleteItemsData,
  setEditItemsData,
  setAddItemsData,
} from "../store/invoiceSlice";

import { useSelector, useDispatch } from "react-redux";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function InvoiceDetails() {
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const currencyTypes = useSelector((state) => state.invoice.currencyTypes);
  const invoiceTypes = useSelector((state) => state.invoice.invoiceTypes);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const itemsData = useSelector((state) => state.invoice.itemsData);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checked, setChecked] = React.useState(false);
  const [rate, setRate] = useState(undefined);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAddItem = () => {
    const uid = Date.now().toString(32) + Math.random().toString(16);
    const itemToAdd = {
      itemNumber: uid,
      itemDescription: "",
      itemQuantity: 1,
      itemRate: 0,
      itemTax: 8,
    };

    dispatch(setAddItemsData(itemToAdd));
  };

  const handleEditItemDescription = (event, { item }) => {
    const itemToEdit = {
      itemNumber: item.itemNumber,
      itemDescription: event.target.value,
      itemQuantity: item.itemQuantity,
      itemRatePrefix: item.itemRatePrefix,
      itemRate: item.itemRate,
      itemTax: item.itemTax,
    };

    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemQuantity = (event, { item }) => {
    const itemToEdit = {
      itemNumber: item.itemNumber,
      itemDescription: item.itemDescription,
      itemQuantity: event.target.value,
      itemRatePrefix: item.itemRatePrefix,
      itemRate: item.itemRate,
      itemTax: item.itemTax,
    };
    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemRate = (event, { item }) => {
    let textFieldPrefix = undefined;
    if (event.target.value != "") {
      textFieldPrefix = "R";
    }

    const itemToEdit = {
      itemNumber: item.itemNumber,
      itemDescription: item.itemDescription,
      itemQuantity: item.itemQuantity,

      itemRatePrefix: textFieldPrefix,
      itemRate: event.target.value,
      itemTax: item.itemTax,
    };
    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemTax = (event, { item }) => {
    const itemToEdit = {
      itemNumber: item.itemNumber,
      itemDescription: item.itemDescription,
      itemQuantity: item.itemQuantity,
      itemRate: item.itemRate,
      itemTax: event.target.value,
    };
    dispatch(setEditItemsData(itemToEdit));
  };

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

        <IconButton style={{ borderRadius: 10 }}>
          <SettingsOutlined />
        </IconButton>
      </Box>
      <Box display={"flex"}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 5, width: "12ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField variant="outlined" select defaultValue="ZAR" size="small">
            {currencyTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { ml: 1, width: "10ch" },
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
            "& .MuiTextField-root": { ml: 1, width: "9ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField size="small" defaultValue={invoiceNumber}></TextField>
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
      {itemsData.length > 0 &&
        itemsData.map((item) => (
          <Box display={"flex"} key={item.itemNumber}>
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
                onChange={(event) => handleEditItemDescription(event, { item })}
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
              <TextField
                defaultValue={item.itemQuantity}
                onChange={(event) => handleEditItemQuantity(event, { item })}
              ></TextField>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { ml: 1, mt: 2, width: "14ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                defaultValue={item.itemRate}
                onChange={(event) => handleEditItemRate(event, { item })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {item.itemRatePrefix}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Box>
            <Box mt={3} ml={1}>
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                size="small"
                style={{
                  borderRadius: 10,
                }}
                onClick={handleClick}
              >
                <MoreHorizRounded />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ width: 200 }}
              >
                <MenuItem
                  onClick={() => {
                    dispatch(setDeleteItemsData(item));
                    handleClose();
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={200}
                  >
                    <Typography mt={1}>Delete</Typography>
                    <IconButton size="small">
                      <DeleteForeverRounded />
                    </IconButton>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={200}
                  >
                    <Typography mt={1}>Taxable</Typography>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                </MenuItem>
                {checked ? (
                  <MenuItem>
                    <TextField
                      size="small"
                      defaultValue={item.itemTax}
                      onChange={(event) => handleEditItemTax(event, { item })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                  </MenuItem>
                ) : (
                  <></>
                )}
              </Menu>
            </Box>
          </Box>
        ))}

      <Box ml={5} mt={1}>
        <Button
          variant="outlined"
          style={{ borderStyle: "dashed", height: 50, width: "92%" }}
          onClick={handleAddItem}
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
