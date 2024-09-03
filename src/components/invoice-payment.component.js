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
  Switch,
} from "@mui/material";

import { Delete, MoreVertRounded, Percent } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankingDetails,
  setDiscount,
  setSelectedDiscountType,
} from "../store/invoiceSlice";
import {
  checkPrecedingZero,
  checkRateDigit,
} from "../helpers/check-digit.helper";

export default function PaymentSection() {
  //redux state

  const selectedDiscountType = useSelector(
    (state) => state.invoice.selectedDiscountType
  );
  const bankingDetails = useSelector((state) => state.invoice.bankingDetails);
  const discount = useSelector((state) => state.invoice.discount);

  //local state

  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedDiscountType);
  const [discountHidden, setDiscountHidden] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contractChecked, setContractChecked] = React.useState(false);

  const dispatch = useDispatch();

  //menu functions

  const openExtras = Boolean(anchorEl);
  const handlePaymentExtrasOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePaymentExtrasClose = () => {
    setAnchorEl(null);
  };

  //contract functions

  const handleContractChecked = (event) => {
    setContractChecked(event.target.checked);
  };

  //tooltip functions

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    if (bankingDetails === "") {
      setChecked(false);
      setOpen(false);
    }
    setOpen(false);
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

  //banking details functions

  const handleBankDetailsChange = (event) => {
    dispatch(setBankingDetails(event.target.value));
    if (event.target.value === "") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  //discount functions

  const handleDiscountTypeChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    dispatch(setSelectedDiscountType(newValue));
  };

  const handleCheckDiscountDigit = (event) => {
    const { value, selectionStart } = document.getElementById("discount-input");
    const keyCode = event.keyCode;
    const key = event.key;
    checkRateDigit(keyCode, key, selectionStart, value, event);
  };

  const handlePercentDiscountChange = (event) => {
    const { value, selectionStart } = document.getElementById("discount-input");
    checkPrecedingZero(selectionStart, value, "discount-input");
    dispatch(setDiscount(event.target.value));
    dispatch(setSelectedDiscountType("percent"));
  };

  const handleFixedDiscountChange = (event) => {
    const { value, selectionStart } = document.getElementById("discount-input");
    checkPrecedingZero(selectionStart, value, "discount-input");
    dispatch(setDiscount(event.target.value));
    dispatch(setSelectedDiscountType("fixed"));
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
          <MoreVertRounded />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={openExtras}
          onClose={handlePaymentExtrasClose}
          MenuListProps={{
            "aria-labelledby": "icon-button",
          }}
          sx={{ width: 250 }}
        >
          {discountHidden ? (
            <Box>
              <MenuItem
                onClick={() => {
                  dispatch(setDiscount(25));
                  setDiscountHidden(false);
                  handlePaymentExtrasClose();
                }}
              >
                <Box
                  display={"flex"}
                  width={250}
                  justifyContent={"space-between"}
                >
                  <Typography>Add a discount</Typography>
                  <IconButton size="small">
                    <Percent sx={{ width: 17, height: 17 }} />
                  </IconButton>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={250}
                >
                  <Typography mt={1}>Add a contract</Typography>
                  <Switch
                    checked={contractChecked}
                    onChange={handleContractChecked}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Box>
              </MenuItem>
            </Box>
          ) : (
            <MenuItem>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={250}
              >
                <Typography mt={1}>Add a contract</Typography>
                <Switch
                  checked={contractChecked}
                  onChange={handleContractChecked}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </MenuItem>
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
                  placeholder="Enter your bank details"
                  multiline={true}
                  onChange={(event) => handleBankDetailsChange(event)}
                  inputProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiInputBase-root": {
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
              <Typography style={{ whiteSpace: "pre-line" }}>
                {bankingDetails}
              </Typography>
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
              onChange={(event) => handleDiscountTypeChange(event)}
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
                  id="discount-input"
                  size="small"
                  defaultValue={discount}
                  onKeyDown={(event) => handleCheckDiscountDigit(event)}
                  onChange={(event) => handlePercentDiscountChange(event)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                ></TextField>
              ) : (
                <TextField
                  id="discount-input"
                  size="small"
                  defaultValue={discount}
                  onKeyDown={(event) => handleCheckDiscountDigit(event)}
                  onChange={(event) => handleFixedDiscountChange(event)}
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
                dispatch(setDiscount(0));
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
