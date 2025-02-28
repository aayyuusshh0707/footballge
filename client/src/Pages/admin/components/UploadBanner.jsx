import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";

const UploadBanner = ({ fetchBanner, api }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); 
    }
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
      setFile(null);
      setPreviewUrl(""); // Clear preview after successful upload
      fetchBanner();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      {/* Hidden Input for File Selection */}
      <input
        type="file"
        accept="image/*,video/*"
        id="upload-banner"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Choose File Button */}

      <label htmlFor="upload-banner">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1.5,
            "&:hover": { backgroundColor: "#0056b3" },
          }}
          startIcon={<CloudUpload />}
        >
          Choose Image/Video
        </Button>
      </label>

      {/* Display Selected File Name */}
      {file && (
        <Typography sx={{ mt: 1, color: "#bbb", fontSize: "14px" }}>
          Selected: {file.name}
        </Typography>
      )}

      {/* Preview Section */}
      {previewUrl && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            border: "1px solid #444",
            borderRadius: 2,
            p: 2,
            backgroundColor: "#222",
          }}
        >
          {file.type.startsWith("video/") ? (
            <video
              src={previewUrl}
              controls
              style={{ maxWidth: "100%", maxHeight: "250px", borderRadius: "5px" }}
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain", borderRadius: "5px" }}
            />
          )}
        </Box>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={!file}
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: 2,
          backgroundColor: file ? "#28a745" : "#555",
          color: "#fff",
          "&:hover": { backgroundColor: file ? "#218838" : "#555" },
        }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadBanner;
