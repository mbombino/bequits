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

import {
  Delete,
  MoreVertRounded,
  Percent,
  SettingsOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankingDetails,
  setDiscount,
  setSelectedDiscountType,
} from "../store/invoiceSlice";

export default function PaymentSection() {
  const selectedDiscountType = useSelector(
    (state) => state.invoice.selectedDiscountType
  );
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedDiscountType);
  const [discountHidden, setDiscountHidden] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contractChecked, setContractChecked] = React.useState(false);

  const arrowKeyCodes = [37, 38, 39, 40];
  const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
  const floatingKeyCode = 190;
  const backspaceKeyCode = 8;

  const handleContractChecked = (event) => {
    setContractChecked(event.target.checked);
  };

  const openExtras = Boolean(anchorEl);

  const bankingDetails = useSelector((state) => state.invoice.bankingDetails);
  const discount = useSelector((state) => state.invoice.discount);
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
    if (event.target.value === "") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  const handleFixedDepositChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "percent") {
      dispatch(setSelectedDiscountType("percent"));
    } else {
      dispatch(setSelectedDiscountType("fixed"));
    }
  };

  const handlePaymentExtrasOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePaymentExtrasClose = () => {
    setAnchorEl(null);
  };

  const handleCheckDiscountDigit = (event) => {
    let input = document.getElementById("discount-input");
    const cursorPosition = input.selectionStart;

    if (
      (((event.keyCode < 48 && !arrowKeyCodes.includes(event.keyCode)) ||
        (event.keyCode > 57 && !numPadKeyCodes.includes(event.keyCode))) &&
        !(
          event.keyCode === floatingKeyCode ||
          event.keyCode === backspaceKeyCode
        )) ||
      (input.value.split(".")[1]?.length + 1 > 2 &&
        !(
          event.keyCode === backspaceKeyCode ||
          arrowKeyCodes.includes(event.keyCode)
        ) &&
        cursorPosition > input.value.split(".")[0]?.length) ||
      (cursorPosition === 0 && Number(event.key) === 0 && input.value !== "") ||
      (input.value.includes(".") && event.key === ".") ||
      (Number(input.value[0]) === 0 &&
        Number(event.key) === 0 &&
        !input.value.includes("."))
    ) {
      event.preventDefault();
    }
  };
  const handlePercentDiscountChange = (event) => {
    dispatch(setDiscount(event.target.value));
    dispatch(setSelectedDiscountType("percent"));
  };
  const handleFixedDiscountChange = (event) => {
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
              //onKeyDown={(event) => handleCheckFixedDiscountDigit(event)}
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
