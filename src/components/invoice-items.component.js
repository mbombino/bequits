import React, { useState } from "react";
import {
  Add,
  DeleteForeverRounded,
  MoreHorizRounded,
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
import {
  setDeleteItemsData,
  setEditItemsData,
  setAddItemsData,
} from "../store/invoiceSlice";

import { useSelector, useDispatch } from "react-redux";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
export default function ItemsSections() {
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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCheckQuantityDigit = (event) => {
    const arrowKeyCodes = [37, 38, 39, 40];
    const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    const backspaceKeyCode = 8;
    let input = document.getElementById("qty-input");
    const cursorPosition = input.selectionStart;

    if (
      (((event.keyCode < 48 && !arrowKeyCodes.includes(event.keyCode)) ||
        (event.keyCode > 57 && !numPadKeyCodes.includes(event.keyCode))) &&
        !(event.keyCode === backspaceKeyCode)) ||
      (cursorPosition === 0 && Number(event.key) === 0 && input.value !== "")
    ) {
      event.preventDefault();
    }
    if (Number(input.value[0]) === 0) {
      let newValue = input.value.replace("0", "");
      input.value = newValue;
    }
  };

  const handleCheckRateDigit = (event) => {
    const arrowKeyCodes = [37, 38, 39, 40];
    const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    const floatingKeyCode = 190;
    const backspaceKeyCode = 8;
    let input = document.getElementById("rate-input");
    const cursorPosition = input.selectionStart;

    if (
      (((event.keyCode < 48 && !arrowKeyCodes.includes(event.keyCode)) ||
        (event.keyCode > 57 && !numPadKeyCodes.includes(event.keyCode))) &&
        !(
          event.keyCode === floatingKeyCode ||
          event.keyCode === backspaceKeyCode
        )) ||
      (input.value.split(".")[1]?.length + 1 > 2 &&
        event.keyCode !== backspaceKeyCode) ||
      (cursorPosition === 0 && Number(event.key) === 0 && input.value !== "") ||
      (input.value.includes(".") && event.key === ".") ||
      (Number(input.value[0]) === 0 &&
        Number(event.key) === 0 &&
        !input.value.includes("."))
    ) {
      event.preventDefault();
    }
    if (
      (Number(input.value[0]) === 0 && !input.value.length === 1) ||
      (Number(input.value[0]) === 0 && Number(input.value[1]) > 0)
    ) {
      let newValue = input.value.replace("0", "");
      input.value = newValue;
    }
    if (
      (Number(input.value[1]) === 0 && cursorPosition === 0) ||
      (Number(input.value[1]) === 0 && cursorPosition === 1)
    ) {
      let newValue = input.value.replace("0", "");
      input.value = newValue;
      input.focus();
      input.setSelectionRange(1, 1);
    }
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
    if (event.target.value !== "") {
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
  return (
    <Box>
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
                id="qty-input"
                onKeyDown={(event) => handleCheckQuantityDigit(event)}
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
                id="rate-input"
                onKeyDown={(event) => handleCheckRateDigit(event)}
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
                id={item.itemNumber}
                aria-controls={
                  open ? `${item.itemNumber.split(".")[0]}` : undefined
                }
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
                id={item.itemNumber.split(".")[0]}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": `${item.itemNumber}`,
                }}
                sx={{ width: 200 }}
              >
                <MenuItem
                  onClick={() => {
                    dispatch(setDeleteItemsData(anchorEl.id));
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
                  <MenuItem sx={{ display: "none" }}></MenuItem>
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
    </Box>
  );
}
