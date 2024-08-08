import React, { useState } from "react";
import axios from "axios";
import { AddAPhotoRounded, FileUploadRounded } from "@mui/icons-material";
import { Box, Typography, Grid, Button, LinearProgress } from "@mui/material";

const Templates = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const completedProgress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(completedProgress);
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
            //onClick={handleFileUpload}
          >
            <AddAPhotoRounded sx={{ color: "white" }} />
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Grid>
        <Grid item xs={6} ml={2}>
          <form>
            <Button style={{ height: 80 }} component="label">
              <FileUploadRounded sx={{ color: "white" }} />
              <Typography color={"white"} style={{ textTransform: "none" }}>
                Upload
              </Typography>
              <input type="file" hidden />
            </Button>
          </form>
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
