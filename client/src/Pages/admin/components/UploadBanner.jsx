import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";

const UploadBanner = ({ fetchBanner, api }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`http://localhost:8000/${api}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      fetchBanner();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} color="primary" variant="contained" sx={{ mt: 2 }}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadBanner;
