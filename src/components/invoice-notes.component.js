import { Box, TextField, Typography } from "@mui/material";

export default function NotesSection() {
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
        <Typography>*Optional</Typography>
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
          defaultValue={"Thank you for your business!"}
        ></TextField>
      </Box>
    </>
  );
}
