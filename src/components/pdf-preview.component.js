import generatePDF from "react-to-pdf";
import { Box, Typography, Button } from "@mui/material";

import { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";
import uploadFilesService from "../services/upload-files.service";

export default function PDFPreview() {
  const [defaultCoverImage, setDefaultCoverImage] = useState();
  const coverImageUrl = useSelector((state) => state.invoice.coverImageUrl);

  useEffect(() => {
    uploadFilesService.getFile("Screenshot_1720896535.png").then((blob) => {
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob.data);
      fileReaderInstance.onload = () => {
        const base64Data = fileReaderInstance.result;
        console.log(blob.headers["content-type"]);
        setDefaultCoverImage(`data:image/png;base64,${base64Data}`);
      };
    });
  }, []);

  const [inputValue, setInputValue] = useState({
    note: "",
    date: "",
    issued: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      [name]: value,
    });
  };

  const targetRef = useRef();

  return (
    <Box>
      <button onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}>
        Download PDF
      </button>
      <div ref={targetRef}>
        <img
          className="logo"
          src={coverImageUrl}
          alt="logo"
          style={{ width: "80%" }}
        />
      </div>
    </Box>
  );
}
