import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  BlobProvider,
} from "@react-pdf/renderer";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Drawer,
  Paper,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";

import React, { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";
import uploadFilesService from "../services/upload-files.service";
import {
  Download,
  DownloadDoneRounded,
  Settings,
  SettingsOutlined,
  Cloud,
  ContentCut,
  ContentCopy,
  ContentPaste,
} from "@mui/icons-material";

export default function PDFPreview() {
  const [defaultCoverImage, setDefaultCoverImage] = useState();
  const coverImageUrl = useSelector((state) => state.invoice.coverImageUrl);
  const logoImage = useSelector((state) => state.invoice.logoImage);
  const itemsData = useSelector((state) => state.invoice.itemsData);
  const [drawer, setDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*useEffect(() => {
    uploadFilesService.getFile("Screenshot_1720896535.png").then((blob) => {
    
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(blob.data);
    fileReaderInstance.onload = () => {
      const base64Data = fileReaderInstance.result;
      console.log(base64Data);
      setDefaultCoverImage(`data:image/png;${base64Data.split(";")[1]}`);
    };
    //});
  }, []);*/

  return (
    <>
      <Box m={5}>
        <Typography variant="h5">PDF preview</Typography>
      </Box>

      <Box
        m={5}
        bgcolor={"white"}
        boxShadow={"1px 1px 10px 0px gray"}
        borderRadius={0.5}
      >
        <img
          src={coverImageUrl}
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <Box mt={5} ml={2}>
          <Typography variant="h5">Invoice</Typography>
          <Box style={styles.titleContainer}>
            <Box style={styles.spaceBetween}>
              <Typography>#001 * August 14, 2024</Typography>
              <img src={logoImage} style={styles.logo} />
            </Box>
          </Box>
        </Box>
        {itemsData.length > 0 &&
          itemsData.map((item) => (
            <Box
              key={item.itemNumber}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography>{item.itemDescription}</Typography>
              <Typography>{item.itemQuantity}</Typography>
              <Typography>{item.itemRate}</Typography>
            </Box>
          ))}
      </Box>
    </>
  );
}
const styles = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: { flexDirection: "row", marginTop: 24 },

  logo: { width: 150, alignSelf: "flex-end" },

  reportTitle: { fontSize: 16, textAlign: "right" },
});
