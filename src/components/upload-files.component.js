import { Button, Box, Typography, Grid, Avatar } from "@mui/material";
import {
  AddAPhotoRounded,
  ChangeCircleRounded,
  Delete,
  FileUploadRounded,
} from "@mui/icons-material";
import UploadFileService from "../services/upload-files.service";
import { setCoverImageUrl, setLogoImage } from "../store/invoiceSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function UploadFile() {
  //local state
  const [defaultCoverImages, setDefaultCoverImages] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [logoImageSelected, setLogoImageSelected] = useState(false);

  //redux dispatch
  const dispatch = useDispatch();

  //get default cover images
  useEffect(() => {
    UploadFileService.getFiles().then((files) => {
      setDefaultCoverImages(files.data);
    });
  }, []);

  //get base64
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  //upload logo image
  const upload = (event) => {
    let currentFile = event.target.files[0];

    getBase64(currentFile).then((result) => {
      setUploadedFile(result);
      setLogoImageSelected(true);
      dispatch(setLogoImage(result));
    });
  };

  //handle logo image delete change
  const handleLogoImageDeleteChange = () => {
    setLogoImageSelected(false);
    dispatch(setLogoImage(""));
  };

  return (
    <Box m={5}>
      <Typography variant="h5" color={"white"}>
        Templates
      </Typography>
      <Typography color={"white"} mt={4}>
        More invoices will be here
      </Typography>
    </Box>
  );
}
