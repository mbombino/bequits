import {
  Box,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedInvoiceType,
  setInvoiceDate,
  setSelectedCurrencyType,
  setInvoiceNumber,
  setBillAddressData,
} from "../store/invoiceSlice";
import dayjs from "dayjs";

export default function HeadingSection() {
  //redux state
  const currencyTypes = useSelector((state) => state.invoice.currencyTypes);
  const invoiceTypes = useSelector((state) => state.invoice.invoiceTypes);
  const invoiceDate = useSelector((state) => state.invoice.invoiceDate);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const billAddressData = useSelector((state) => state.invoice.billAddressData);
  const itemsData = useSelector((state) => state.invoice.itemsData);

  //redux dispatch
  const dispatch = useDispatch();

  //currency type functions

  const handleCurrencyTypeSelection = (event) => {
    const currencyType = currencyTypes.find(
      (e) => e.value === event.target.value
    );
    dispatch(setSelectedCurrencyType(currencyType));
    //console.log(itemsData);
  };

  //invoice type functions

  const handleInvoiceTypeSelection = (event) => {
    const invoiceType = invoiceTypes.find(
      (e) => e.value === event.target.value
    );
    dispatch(setSelectedInvoiceType(invoiceType));
  };

  //invoice number functions

  const handleInvoiceNumberChange = (event) => {
    dispatch(setInvoiceNumber(event.target.value));
  };

  //bill address functions

  const handleFromBillAddressChange = (event) => {
    const addressToAdd = {
      fromAddress: event.target.value,
      toAddress: billAddressData.toAddress,
    };
    dispatch(setBillAddressData(addressToAdd));
  };

  const handleToBillAddressChange = (event) => {
    const addressToAdd = {
      fromAddress: billAddressData.fromAddress,
      toAddress: event.target.value,
    };
    dispatch(setBillAddressData(addressToAdd));
  };

  //date functions

  const defaultDate = new Date(invoiceDate);
  const handleInvoiceDateChange = (event) => {
    dispatch(
      setInvoiceDate(
        new Date(
          event.$d.getFullYear() +
            "/" +
            (event.$d.getMonth() + 1) +
            "/" +
            event.$d.getDate()
        ).toDateString()
      )
    );
  };
  return (
    <Box>
      <Box m={5} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Invoice details</Typography>
        <IconButton style={{ borderRadius: 10 }}>
          <MoreVertRounded />
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
          <TextField
            variant="outlined"
            select
            defaultValue={1}
            size="small"
            onChange={(event) => handleCurrencyTypeSelection(event)}
          >
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
          <TextField
            variant="outlined"
            select
            defaultValue={1}
            size="small"
            onChange={(event) => handleInvoiceTypeSelection(event)}
          >
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
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              defaultValue={dayjs(`
                ${
                  defaultDate.getFullYear().toString() +
                  "/" +
                  (defaultDate.getMonth() + 1).toString() +
                  "/" +
                  defaultDate.getDate().toString()
                }`)}
              onChange={(event) => handleInvoiceDateChange(event)}
            />
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
          <TextField
            placeholder="Invoice #"
            size="small"
            defaultValue={invoiceNumber}
            onChange={(event) => handleInvoiceNumberChange(event)}
          ></TextField>
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
            size="small"
            multiline={true}
            rows={2}
            placeholder={"Bill to: Enter name and address"}
            onChange={(event) => handleToBillAddressChange(event)}
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
            size="small"
            multiline={true}
            rows={2}
            placeholder={"From: Enter your name and address"}
            onChange={(event) => handleFromBillAddressChange(event)}
          ></TextField>
        </Box>
      </Box>
    </Box>
  );
}
