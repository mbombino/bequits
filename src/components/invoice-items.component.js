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
import {
  checkDigit,
  checkPrecedingZero,
  checkRateDigit,
} from "../helpers/check-digit.helper";

export default function ItemsSections() {
  const [menu, setMenu] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const dispatch = useDispatch();

  const handleClick = (index) => (event) => {
    setMenu(event.currentTarget);
    setCurrentIndex(index);
  };
  const handleClose = () => {
    setMenu(null);
  };

  const [checked, setChecked] = useState({});

  const handleChange = (event, { item }) => {
    const isChecked = event.target.checked;
    setChecked((prevState) => ({
      ...prevState,
      [item.itemNumber]: isChecked,
    }));

    const itemToEdit = {
      ...item,
      itemTax: isChecked ? 8 : 0,
    };
    dispatch(setEditItemsData(itemToEdit));
  };

  const handleCheckQuantityDigit = (event, { item }) => {
    const { value, selectionStart } = document.getElementById(
      item.itemNumber + ".qty-input"
    );
    const keyCode = event.keyCode;
    const key = event.key;
    checkDigit(keyCode, key, selectionStart, value, event);
  };

  const handleCheckRateDigit = (event, { item }) => {
    const { value, selectionStart } = document.getElementById(
      item.itemNumber + ".rate-input"
    );
    const keyCode = event.keyCode;
    const key = event.key;
    checkRateDigit(keyCode, key, selectionStart, value, event);
  };

  const handleCheckTaxDigit = (event, { item }) => {
    const { value, selectionStart } = document.getElementById(
      item.itemNumber + ".tax-input"
    );
    const keyCode = event.keyCode;
    const key = event.key;
    checkRateDigit(keyCode, key, selectionStart, value, event);
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
      ...item,
      itemDescription: event.target.value,
    };

    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemQuantity = (event, { item }) => {
    const itemToEdit = {
      ...item,
      itemQuantity: event.target.value,
    };
    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemRate = (event, { item }) => {
    const { value, selectionStart } = document.getElementById(
      item.itemNumber + ".rate-input"
    );
    checkPrecedingZero(selectionStart, value, item.itemNumber + ".rate-input");

    const newRate = event.target.value;
    const textFieldPrefix = newRate !== "" ? selectedCurrencyType.label[5] : "";

    const itemToEdit = {
      ...item,
      itemRatePrefix: textFieldPrefix,
      itemRate: newRate !== "" ? newRate : 0,
    };
    dispatch(setEditItemsData(itemToEdit));
  };
  const handleEditItemTax = (event, { item }) => {
    const { value, selectionStart } = document.getElementById(
      item.itemNumber + ".tax-input"
    );
    checkPrecedingZero(selectionStart, value, item.itemNumber + ".tax-input");
    const itemToEdit = {
      ...item,
      itemTax: event.target.value !== "" ? event.target.value : 0,
    };
    dispatch(setEditItemsData(itemToEdit));
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
