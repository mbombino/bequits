import { Box, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from "../store/invoiceSlice";

export default function NotesSection() {
  //redux state
  const memo = useSelector((state) => state.invoice.memo);

  //redux dispatch
  const dispatch = useDispatch();

  //memo functions

  const handleMemoChange = (event) => {
    dispatch(setMemo(event.target.value));
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={5}
        ml={5}
        mr={5}
        mb={1}
      >
        <Typography>Other notes and instructions</Typography>
        <Typography style={{ fontSize: 14, color: "gray" }}>
          *Optional
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { ml: 5, mb: 5, width: "85%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          multiline={true}
          rows={5}
          defaultValue={memo}
          onChange={(event) => handleMemoChange(event)}
        ></TextField>
      </Box>
    </>
  );
}
