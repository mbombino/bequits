import { Button, Box, Typography, Grid, Avatar } from "@mui/material";
import {
  AddAPhotoRounded,
  ChangeCircleRounded,
  DeleteForeverRounded,
  FileUploadRounded,
} from "@mui/icons-material";
import UploadFileService from "../services/upload-files.service";
import { useEffect, useState } from "react";

export default function UploadFile() {
  const [defaultCoverImages, setDefaultCoverImages] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [logoImageSelected, setLogoImageSelected] = useState(false);

  useEffect(() => {
    UploadFileService.getFiles().then((files) => {
      setDefaultCoverImages(files.data);
    });
  }, []);

  const upload = (event) => {
    let currentFile = event.target.files[0];

    const data = new FileReader();
    data.addEventListener("load", () => {
      setUploadedFile(data.result);
    });
    data.readAsDataURL(currentFile);
    setLogoImageSelected(true);
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
        {logoImageSelected ? (
          <>
            <Grid item xs={4}>
              <Avatar src={uploadedFile} sx={{ height: 80, width: 80 }} />
            </Grid>
            <Grid item xs={6} ml={2}>
              <input
                id="btn-change"
                style={{ display: "none" }}
                type="file"
                onChange={upload}
              />
              <Button
                style={{ height: 0 }}
                component="span"
                onClick={() => document.getElementById("btn-change").click()}
              >
                <ChangeCircleRounded sx={{ color: "white" }} />
                <Typography color={"white"} style={{ textTransform: "none" }}>
                  Change
                </Typography>
              </Button>
              <Button
                style={{ height: 80 }}
                component="label"
                onClick={() => setLogoImageSelected(false)}
              >
                <DeleteForeverRounded sx={{ color: "white" }} />
                <Typography color={"white"} style={{ textTransform: "none" }}>
                  Delete
                </Typography>
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={4}>
              <div>
                <input
                  id="btn-upload"
                  style={{ display: "none" }}
                  type="file"
                  onChange={upload}
                />
                <Button
                  variant="outlined"
                  style={{ borderStyle: "dashed", height: 80, width: 80 }}
                  component="span"
                  onClick={() => document.getElementById("btn-upload").click()}
                >
                  <AddAPhotoRounded sx={{ color: "white" }} />
                </Button>
              </div>
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
          </>
        )}
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
      <Box mt={2}>
        {defaultCoverImages &&
          defaultCoverImages.map((file, index) => {
            return (
              <div key={index} style={{ marginTop: 2 }}>
                <img src={file.url} style={{ width: "80%", borderRadius: 5 }} />
              </div>
            );
          })}
      </Box>
    </Box>
  );
}
