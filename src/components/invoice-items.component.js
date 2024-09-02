import React, { useState } from "react";
import { Add, Delete, MoreHorizRounded } from "@mui/icons-material";
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
} from "@mui/material";
import {
  setDeleteItemsData,
  setEditItemsData,
  setAddItemsData,
} from "../store/invoiceSlice";

import { useSelector, useDispatch } from "react-redux";
export default function ItemsSections() {
  const [menu, setMenu] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const dispatch = useDispatch();

  const arrowKeyCodes = [37, 38, 39, 40];
  const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
  const floatingKeyCode = 190;
  const backspaceKeyCode = 8;

  const handleClick = (index) => (event) => {
    setMenu(event.currentTarget);
    setCurrentIndex(index);
  };
  const handleClose = () => {
    setMenu(null);
  };

  const stuff = {};
  itemsData.map((item) => (stuff[item.itemNumber] = false));

  const [checked, setChecked] = useState(stuff);

  const handleChange = (event, { item }) => {
    if (event.target.checked) {
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRate: item.itemRate,
        itemRatePrefix: item.itemRatePrefix,
        itemTax: 8,
      };
      dispatch(setEditItemsData(itemToEdit));
    } else {
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRate: item.itemRate,
        itemRatePrefix: item.itemRatePrefix,
        itemTax: 0,
      };
      dispatch(setEditItemsData(itemToEdit));
    }
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCheckQuantityDigit = (event, { item }) => {
    let input = document.getElementById(item.itemNumber + ".qty-input");
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

  const handleCheckRateDigit = (event, { item }) => {
    let input = document.getElementById(item.itemNumber + ".rate-input");
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
  const handleCheckTaxDigit = (event, { item }) => {
    let input = document.getElementById(item.itemNumber + ".tax-input");
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

  const handleAddItem = () => {
    const uid = Date.now().toString(32) + Math.random().toString(16);
    const itemToAdd = {
      itemNumber: uid,
      itemDescription: "",
      itemQuantity: 1,
      itemRate: 0,
      itemRatePrefix: "",
      itemTax: 0,
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
    let input = document.getElementById(item.itemNumber + ".rate-input");
    const cursorPosition = input.selectionStart;
    if (
      (cursorPosition === 0 && input.value.length > 2) ||
      (cursorPosition === 1 && input.value.length > 2) ||
      (input.value[1] > 0 && input.value.length === 2)
    ) {
      let newValue = input.value.replace(/^0+/, "");
      input.value = parseFloat(newValue);
    }

    let textFieldPrefix = "";
    if (event.target.value !== "") {
      textFieldPrefix = selectedCurrencyType.label[5];
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRatePrefix: textFieldPrefix,
        itemRate: event.target.value,
        itemTax: item.itemTax,
      };
      dispatch(setEditItemsData(itemToEdit));
    } else {
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRatePrefix: textFieldPrefix,
        itemRate: 0,
        itemTax: item.itemTax,
      };
      dispatch(setEditItemsData(itemToEdit));
    }
  };
  const handleEditItemTax = (event, { item }) => {
    let input = document.getElementById(item.itemNumber + ".tax-input");
    const cursorPosition = input.selectionStart;

    if (
      (cursorPosition === 0 && input.value.length > 2) ||
      (cursorPosition === 1 && input.value.length > 2) ||
      (input.value[1] > 0 && input.value.length === 2)
    ) {
      let newValue = input.value.replace(/^0+/, "");
      input.value = parseFloat(newValue);
    }
    if (event.target.value !== "") {
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRate: item.itemRate,
        itemRatePrefix: item.itemRatePrefix,
        itemTax: event.target.value,
      };
      dispatch(setEditItemsData(itemToEdit));
    } else {
      const itemToEdit = {
        itemNumber: item.itemNumber,
        itemDescription: item.itemDescription,
        itemQuantity: item.itemQuantity,
        itemRate: item.itemRate,
        itemRatePrefix: item.itemRatePrefix,
        itemTax: 0,
      };
      dispatch(setEditItemsData(itemToEdit));
    }
  };
  return (
    <Box>
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

      {itemsData.map((item, index) => {
        return (
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
                rows={1}
                multiline={true}
                placeholder={"Description of service or product"}
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
                id={item.itemNumber + ".qty-input"}
                onKeyDown={(event) => handleCheckQuantityDigit(event, { item })}
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
                id={item.itemNumber + ".rate-input"}
                onKeyDown={(event) => handleCheckRateDigit(event, { item })}
                defaultValue={item.itemRate}
                onChange={(event) => {
                  handleEditItemRate(event, { item });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {item.itemRatePrefix}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Box>
            <Box ml={1} mt={3}>
              <IconButton
                size="small"
                style={{
                  borderRadius: 10,
                }}
                onClick={handleClick(index)}
              >
                <MoreHorizRounded />
              </IconButton>
            </Box>

            <Menu
              anchorEl={menu}
              open={Boolean(menu) && index === currentIndex}
              onClose={handleClose}
            >
              <MenuItem
                style={{ width: 150 }}
                onClick={() => {
                  dispatch(setDeleteItemsData({ item }));
                  handleClose();
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={150}
                >
                  <Typography mt={1}>Delete</Typography>
                  <IconButton size="small">
                    <Delete />
                  </IconButton>
                </Box>
              </MenuItem>
              <MenuItem style={{ width: 150 }}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={150}
                >
                  <Typography mt={1}>Taxable</Typography>
                  <Switch
                    key={item.itemNumber}
                    name={item.itemNumber}
                    checked={checked[item.itemNumber] || false}
                    onChange={(event) => handleChange(event, { item })}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Box>
              </MenuItem>
              {checked[item.itemNumber] ? (
                <MenuItem style={{ width: 150 }}>
                  <TextField
                    id={item.itemNumber + ".tax-input"}
                    size="small"
                    defaultValue={item.itemTax}
                    onKeyDown={(event) => handleCheckTaxDigit(event, { item })}
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
        );
      })}
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
