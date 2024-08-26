import {
  Box,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVertRounded, SettingsOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedInvoiceType,
  setInvoiceNumber,
} from "../store/invoiceSlice";

export default function HeadingSection() {
  const currencyTypes = useSelector((state) => state.invoice.currencyTypes);
  const invoiceTypes = useSelector((state) => state.invoice.invoiceTypes);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const dispatch = useDispatch();

  const handleInvoiceTypeSelection = (event) => {
    const invoiceType = invoiceTypes.find(
      (e) => e.value === event.target.value
    );
    dispatch(setSelectedInvoiceType(invoiceType));
  };
  const handleInvoiceNumberChange = (event) => {
    dispatch(setInvoiceNumber(event.target.value));
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
          <TextField
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
          ></TextField>
        </Box>
      </Box>
    </Box>
  );
}
