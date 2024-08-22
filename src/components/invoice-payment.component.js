import React, { Fragment } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  ClickAwayListener,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Delete, SettingsOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useSelector, useDispatch } from "react-redux";
import { setBankingDetails } from "../store/invoiceSlice";

export default function PaymentSection() {
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("percent");

  const bankingDetails = useSelector((state) => state.invoice.bankingDetails);
  const dispatch = useDispatch();

  const handleTooltipClose = () => {
    if (bankingDetails === "") {
      setChecked(false);
      setOpen(false);
    }
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      handleTooltipOpen();
    } else {
      dispatch(setBankingDetails(""));
      handleTooltipClose();
    }
  };

  const handleBankDetailsChange = (event) => {
    dispatch(setBankingDetails(event.target.value));
  };
  const handleFixedDepositChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <Box m={5} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Invoice payment method</Typography>
        <IconButton style={{ borderRadius: 10 }}>
          <SettingsOutlined />
        </IconButton>
      </Box>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            arrow
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <Fragment>
                <TextField
                  size="small"
                  variant="standard"
                  label="Enter bank details"
                  onChange={(event) => handleBankDetailsChange(event)}
                />
              </Fragment>
            }
          >
            <Box
              ml={5}
              p={1}
              sx={{ border: "1px solid grey" }}
              borderRadius={1}
              width={"30%"}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Bank Transfer"
                />
              </FormGroup>
              <Typography>{bankingDetails}</Typography>
            </Box>
          </Tooltip>
        </div>
      </ClickAwayListener>
      <Box m={5}>
        <Box>
          <Typography>Discount</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleFixedDepositChange}
          >
            <FormControlLabel
              value="fixed"
              control={<Radio />}
              label="Fixed (R)"
            />
            <FormControlLabel
              value="percent"
              control={<Radio />}
              label="Percent (%)"
            />
          </RadioGroup>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { ml: 0, mt: 0, width: "14ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {value === "percent" ? (
              <TextField
                size="small"
                defaultValue={25}
                //onChange={(event) => handleEditItemRate(event, { item })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              ></TextField>
            ) : (
              <TextField
                size="small"
                defaultValue={25}
                //onChange={(event) => handleEditItemRate(event, { item })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R</InputAdornment>
                  ),
                }}
              ></TextField>
            )}
          </Box>
          <IconButton style={{ borderRadius: 10 }}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
