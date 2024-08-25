import React, { Fragment, useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  ClickAwayListener,
  InputAdornment,
  Radio,
  RadioGroup,
  Menu,
  Divider,
} from "@mui/material";

import { Delete, Percent, SettingsOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setBankingDetails } from "../store/invoiceSlice";

export default function PaymentSection() {
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("percent");
  const [discountHidden, setDiscountHidden] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const openExtras = Boolean(anchorEl);

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

  const handleCheckChange = (event) => {
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

  const handlePaymentExtrasOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePaymentExtrasClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box m={5} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Invoice payment method</Typography>
        <IconButton
          style={{ borderRadius: 10 }}
          id="icon-button"
          aria-controls={openExtras ? "menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openExtras ? "true" : undefined}
          onClick={handlePaymentExtrasOpen}
        >
          <SettingsOutlined />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={openExtras}
          onClose={handlePaymentExtrasClose}
          MenuListProps={{
            "aria-labelledby": "icon-button",
          }}
          sx={{ width: 200 }}
        >
          {discountHidden ? (
            <MenuItem
              onClick={() => {
                setDiscountHidden(false);
                handlePaymentExtrasClose();
              }}
            >
              <Box display={"flex"} width={200}>
                <Typography>Add a discount</Typography>
                <IconButton size="small">
                  <Percent sx={{ width: 17, height: 17 }} />
                </IconButton>
              </Box>
            </MenuItem>
          ) : (
            <MenuItem sx={{ display: "none" }}></MenuItem>
          )}
        </Menu>
      </Box>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            slotProps={{
              tooltip: {
                sx: { backgroundColor: "black" },
              },
              arrow: {
                sx: { color: "black" },
              },
            }}
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
                  //variant="standard"
                  placeholder="Enter your bank details"
                  onChange={(event) => handleBankDetailsChange(event)}
                  //style={{ caretColor: "white",textst }}
                  inputProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      //color: "black",
                      "& > fieldset": {
                        borderStyle: "hidden",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
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
                      onChange={handleCheckChange}
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
      {discountHidden ? (
        <></>
      ) : (
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
            <IconButton
              style={{ borderRadius: 10 }}
              onClick={() => {
                setDiscountHidden(true);
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
