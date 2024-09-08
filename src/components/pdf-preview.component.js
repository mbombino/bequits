import { Box, Typography, Grid, Divider } from "@mui/material";

import React, { useState } from "react";

import { useSelector } from "react-redux";

export default function PDFPreview() {
  const coverImageUrl = useSelector((state) => state.invoice.coverImageUrl);
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const selectedCurrencyType = useSelector(
    (state) => state.invoice.selectedCurrencyType
  );
  const selectedInvoiceType = useSelector(
    (state) => state.invoice.selectedInvoiceType
  );
  const invoiceDate = useSelector((state) => state.invoice.invoiceDate);
  const invoiceNumber = useSelector((state) => state.invoice.invoiceNumber);
  const billAddressData = useSelector((state) => state.invoice.billAddressData);
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const subtotal = useSelector((state) => state.invoice.subtotal);
  const discount = useSelector((state) => state.invoice.discount);
  const selectedDiscountType = useSelector(
    (state) => state.invoice.selectedDiscountType
  );
  const memo = useSelector((state) => state.invoice.memo);
  const bankingDetails = useSelector((state) => state.invoice.bankingDetails);

  const invoiceSubtotal = itemsData.reduce(
    (total, item) => total + item.itemQuantity * item.itemRate,
    0
  );

  const invoiceTax = itemsData.reduce(
    (total, item) =>
      total + item.itemQuantity * item.itemRate * (item.itemTax / 100),
    0
  );

  const invoiceTotal = invoiceSubtotal + invoiceTax;

  const invoiceDiscount =
    selectedDiscountType === "percent"
      ? invoiceTotal * (discount / 100)
      : discount;

  const invoiceBalanceDue = invoiceTotal - invoiceDiscount;

  return (
    <Box>
      <Box m={5}>
        <Typography variant="h5">PDF preview</Typography>
      </Box>

      <Box
        m={5}
        bgcolor={"white"}
        boxShadow={"1px 1px 10px 0px gray"}
        borderRadius={0.5}
        minHeight={550}
      >
        <img
          src={coverImageUrl}
          alt="img"
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <Box p={2}>
          <Box>
            <Typography>
              <b>{selectedInvoiceType.label}</b>
            </Typography>

            <Box>
              {invoiceNumber !== "" ? (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography style={{ fontSize: 10 }}>
                    #{invoiceNumber} •{" "}
                    {new Date(invoiceDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                  {logoImage !== "" ? (
                    <img src={logoImage} alt="img" style={{ width: 30 }} />
                  ) : (
                    <></>
                  )}
                </Box>
              ) : (
                <Typography style={{ fontSize: 10 }}>
                  {invoiceNumber} •{" "}
                  {new Date(invoiceDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
              )}
            </Box>
          </Box>
          <Grid container mt={2}>
            <Grid item lg={6}>
              <Typography style={{ fontSize: 10, color: "gray" }}>
                From:
              </Typography>
              <Box width={"18ch"}>
                <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                  {billAddressData.fromAddress}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Typography style={{ fontSize: 10, color: "gray" }}>
                Bill To:
              </Typography>
              <Box width={"18ch"}>
                <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                  {billAddressData.toAddress}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              bgcolor={"#f1f1f1"}
              borderRadius={1}
            >
              <Typography style={{ fontSize: 10 }}>Items</Typography>
              <Typography style={{ fontSize: 10 }}>Qty</Typography>
              <Typography style={{ fontSize: 10 }}>Rate</Typography>
            </Box>
            {itemsData.length > 0 &&
              itemsData.map((item) => (
                <Box key={item.itemNumber}>
                  <Grid
                    container
                    key={item.itemNumber}
                    style={{ marginTop: 4, marginBottom: 4 }}
                  >
                    <Grid item lg={6} width={"20ch"}>
                      <Typography
                        style={{ fontSize: 10, wordWrap: "break-word" }}
                      >
                        {item.itemDescription}
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        style={{ fontSize: 10, wordWrap: "break-word" }}
                      >
                        {item.itemQuantity}
                      </Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography
                        style={{
                          fontSize: 10,
                          wordWrap: "break-word",
                          direction: "rtl",
                        }}
                      >
                        {selectedCurrencyType.symbol}
                        {parseFloat(item.itemRate).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
          </Box>
          <Grid container>
            <Grid item lg={6} mt={5}>
              {bankingDetails !== "" ? (
                <Box width={"20ch"}>
                  <Typography style={{ fontSize: 10, color: "gray" }}>
                    Bank Transfer:
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      wordWrap: "break-word",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {`${bankingDetails}`}
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item lg={6}>
              <Box
                display={"flex"}
                mt={0.5}
                mb={0.5}
                justifyContent={"space-between"}
              >
                <Typography
                  style={{
                    fontSize: 10,
                  }}
                >
                  Subtotal:
                </Typography>
                <Box>
                  <Typography
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {selectedCurrencyType.symbol}
                    {parseFloat(invoiceSubtotal).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Divider />
              </Box>
              <Box
                display={"flex"}
                mt={0.5}
                mb={0.5}
                justifyContent={"space-between"}
              >
                <Typography style={{ fontSize: 10 }}>Tax:</Typography>
                <Typography style={{ fontSize: 10 }}>
                  {selectedCurrencyType.symbol}
                  {parseFloat(invoiceTax).toFixed(2)}
                </Typography>
              </Box>
              <Divider />
              <Box
                display={"flex"}
                mt={0.5}
                mb={0.5}
                justifyContent={"space-between"}
              >
                <Typography
                  style={{
                    fontSize: 10,
                  }}
                >
                  Total:
                </Typography>
                <Typography style={{ fontSize: 10 }}>
                  {selectedCurrencyType.symbol}
                  {parseFloat(invoiceTotal).toFixed(2)}
                </Typography>
              </Box>
              <Divider />
              {discount === 0 ? (
                <></>
              ) : (
                <>
                  <Box
                    display={"flex"}
                    mt={0.5}
                    mb={0.5}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      style={{
                        fontSize: 10,
                      }}
                    >
                      Discount:
                    </Typography>

                    <Typography style={{ fontSize: 10 }}>
                      {selectedCurrencyType.symbol}
                      {parseFloat(invoiceDiscount).toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              )}

              <Box
                display={"flex"}
                mt={0.5}
                mb={0.5}
                justifyContent={"space-between"}
              >
                <Typography
                  style={{
                    fontSize: 10,
                  }}
                >
                  Balance Due:
                </Typography>
                <Typography style={{ fontSize: 13 }}>
                  {selectedCurrencyType.symbol}
                  {parseFloat(invoiceBalanceDue).toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Typography style={{ fontSize: 10, color: "gray" }}>
              Memo:
            </Typography>
            <Box width={"20ch"}>
              <Typography style={{ fontSize: 10, wordWrap: "break-word" }}>
                {memo}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
