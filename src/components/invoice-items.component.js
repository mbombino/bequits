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
  //redux state
  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const itemsData = useSelector((state) => state.invoice.itemsData);

  //redux dispatch
  const dispatch = useDispatch();

  //local state
  const [menu, setMenu] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState({});

  //menu functions
  const handleClick = (index) => (event) => {
    setMenu(event.currentTarget);
    setCurrentIndex(index);
  };
  const handleClose = () => {
    setMenu(null);
  };

  //tax functions

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

  //digit check functions

  const handleCheckQuantityDigit = (event) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    const keyCode = event.keyCode;
    const key = event.key;
    checkDigit(keyCode, key, selectionStart, value, event);
  };

  const handleCheckRateDigit = (event) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    const keyCode = event.keyCode;
    const key = event.key;
    checkRateDigit(keyCode, key, selectionStart, value, event);
  };

  const handleCheckTaxDigit = (event) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    const keyCode = event.keyCode;
    const key = event.key;
    checkRateDigit(keyCode, key, selectionStart, value, event);
  };

  //add item functions

  const handleAddItem = () => {
    const uid = Date.now().toString(32) + Math.random().toString(16);
    const itemToAdd = {
      itemNumber: uid,
      itemDescription: "",
      itemQuantity: 1,
      itemRate: 0,
      itemHour: 1,
      itemHourRate: 0,
      itemRatePrefix: "",
      itemHourRatePrefix: "",
      itemHourRateSuffix: "",
      itemTax: 0,
      itemHourRateTotal: 0,
      itemRateTotal: 0,
    };

    dispatch(setAddItemsData(itemToAdd));
  };

  //edit item functions

  const handleEditItemDescription = (event, { item }) => {
    const itemToEdit = {
      ...item,
      itemDescription: event.target.value,
    };

    dispatch(setEditItemsData(itemToEdit));
  };

  //edit item quantity functions

  const handleEditItemQuantity = (event, { item }) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    checkPrecedingZero(selectionStart, value, id);
    const itemToEdit = {
      ...item,
      [id.includes("hour-input") ? "itemHour" : "itemQuantity"]:
        event.target.value,
      [id.includes("hour-input") ? "itemHourRateTotal" : "itemRateTotal"]:
        id.includes("hour-input")
          ? item.itemHourRate * event.target.value
          : item.itemRate * event.target.value,
    };
    dispatch(setEditItemsData(itemToEdit));
  };

  //edit item rate functions

  const handleEditItemRate = (event, { item }) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    checkPrecedingZero(selectionStart, value, id);

    const newRate = event.target.value;
    const isHourlyRate = id.includes("hour-rate-input");
    const textFieldPrefix = newRate ? "R" : "";
    const textFieldSuffix = isHourlyRate && newRate ? "/hr" : "";

    const itemToEdit = {
      ...item,
      [isHourlyRate ? "itemHourRatePrefix" : "itemRatePrefix"]: textFieldPrefix,
      itemHourRateSuffix: textFieldSuffix,
      [isHourlyRate ? "itemHourRate" : "itemRate"]: newRate,
      [isHourlyRate ? "itemHourRateTotal" : "itemRateTotal"]: isHourlyRate
        ? item.itemHour * newRate
        : item.itemQuantity * newRate,
    };

    dispatch(setEditItemsData(itemToEdit));
  };

  //edit item tax functions

  const handleEditItemTax = (event, { item }) => {
    const id = event.target.id;
    const { value, selectionStart } = document.getElementById(id);
    checkPrecedingZero(selectionStart, value, id);
    const itemToEdit = {
      ...item,
      itemTax: event.target.value !== "" ? event.target.value : 0,
    };
    dispatch(setEditItemsData(itemToEdit));
  };

  //delete item functions

  const handleDeleteItem = ({ item }) => {
    dispatch(setDeleteItemsData(item));
    handleClose();
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
        {selectedCurrencyType.label === "Hourly rate" ? (
          <>
            <Typography>Items</Typography>
            <Typography>Rate</Typography>
            <Typography>Hours</Typography>
          </>
        ) : (
          <>
            <Typography>Items</Typography>
            <Typography>Qty</Typography>
            <Typography>Rate</Typography>
          </>
        )}
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
            {selectedCurrencyType.label === "Hourly rate" ? (
              <>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { ml: 1, mt: 2, width: "14ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id={item.itemNumber + ".hour-rate-input"}
                    onKeyDown={(event) => handleCheckRateDigit(event)}
                    value={item.itemHourRate}
                    onChange={(event) => {
                      handleEditItemRate(event, { item });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {item.itemHourRatePrefix}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {item.itemHourRateSuffix}
                        </InputAdornment>
                      ),
                    }}
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
                    id={item.itemNumber + ".hour-input"}
                    onKeyDown={(event) => handleCheckQuantityDigit(event)}
                    value={item.itemHour}
                    onChange={(event) =>
                      handleEditItemQuantity(event, { item })
                    }
                  ></TextField>
                </Box>
              </>
            ) : (
              <>
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
                    onKeyDown={(event) => handleCheckQuantityDigit(event)}
                    value={item.itemQuantity}
                    onChange={(event) =>
                      handleEditItemQuantity(event, { item })
                    }
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
                    onKeyDown={(event) => handleCheckRateDigit(event)}
                    value={item.itemRate}
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
              </>
            )}

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
                  handleDeleteItem({ item });
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
