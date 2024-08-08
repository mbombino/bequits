import React from "react";
import styled from "@emotion/styled";
import { AddAPhotoRounded, FileUploadRounded } from "@mui/icons-material";
import { Box, Typography, Grid, Button } from "@mui/material";

const Templates = () => {
  return (
    <Box mt={6} ml={6}>
      <Typography variant="h4" color={"white"}>
        Templates
      </Typography>
      <Typography color={"white"} mt={4}>
        Your logo
      </Typography>
      <Grid container mt={2}>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            style={{ borderStyle: "dashed", height: 80, width: 80 }}
            component="label"
          >
            <AddAPhotoRounded sx={{ color: "white" }} />
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={6} ml={2}>
          <Button style={{ height: 80 }} component="label">
            <FileUploadRounded sx={{ color: "white" }} />
            <Typography color={"white"} style={{ textTransform: "none" }}>
              Upload
            </Typography>
            <input type="file" hidden />
          </Button>
        </Grid>
      </Grid>
      <Typography color={"white"} mt={4}>
        Cover image
      </Typography>

      <Box mt={2}>
        <Button
          variant="outlined"
          style={{ borderStyle: "dashed", height: 80, width: "80%" }}
          component="label"
        >
          <AddAPhotoRounded sx={{ color: "white" }} />
          <input type="file" hidden />
        </Button>
      </Box>
      <Box>
        <Button style={{ width: "80%" }} component="label">
          <FileUploadRounded sx={{ color: "white" }} />
          <Typography color={"white"} style={{ textTransform: "none" }}>
            Upload
          </Typography>
          <input type="file" hidden />
        </Button>
      </Box>
    </Box>
  );
};

export default Templates;
