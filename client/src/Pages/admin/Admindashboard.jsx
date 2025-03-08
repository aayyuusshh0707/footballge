import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import NavButtonLinks from "./components/NavButtonLinks";
import UploadBanner from "./components/UploadBanner";
import axios from "axios";

const sections = {
  "Desktop/PC": [
    { name: "Large banner", api: "api/desktop-banner" },
    { name: "Side banner 1", api: "api/desktop-sidebanner" },
    { name: "Side banner 2", api: "api/desktop-sidebannertwo" },
    { name: "Side long", api: "api/desktop-sidelongbanner" },
    { name: "Match section", api: "api/desktop-matchbanner" },
  ],
  iPad: [
    { name: "Large banner", api: "api/ipad-banner" },
    { name: "Side banner 1", api: "api/ipad-sidebanner" },
    { name: "Side banner 2", api: "api/ipad-sidebannertwo" },
    { name: "Side long", api: "api/ipad-sidelongbanner" },
    { name: "Match section", api: "api/ipad/matchbanner" },
  ],
  Mobile: [
    { name: "Large banner", api: "api/mobile-banner" },
    { name: "Side banner 1", api: "api/mobile-sidebanner" },
    { name: "Side banner 2", api: "api/mobile-sidebannertwo" },
    { name: "Side long", api: "api/mobile-sidelongbanner" },
  ],
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [bannerUrl, setBannerUrl] = useState("");

  useEffect(() => {
    if (open && selectedSection.api) {
      fetchBanner(selectedSection.api);
    }
  }, [open, selectedSection]);

  const fetchBanner = async (apiEndpoint) => {
    try {
      const response = await axios.get(`http://localhost:8000/${apiEndpoint}/get`);
      let fileUrl = response.data.file_url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("&dl=0", "");
      setBannerUrl(fileUrl);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const handleOpen = (section) => {
    setSelectedSection(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSection({});
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/admin/logout", { method: "POST", credentials: "include" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", minHeight: "100vh" }}>
      <Container sx={{ color: "#fff", p: 3, borderRadius: 3 }}>
        <Paper elevation={10} sx={{ p: 4, textAlign: "center", borderRadius: 3, backgroundColor: "#1e1e1e" }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>Admin Dashboard</Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#aaa" }}>Manage banners efficiently from this panel.</Typography>
          <Button onClick={handleLogout} variant="contained" color="error" sx={{ mb: 4, borderRadius: 2 }}>
            Logout
          </Button>
          <Grid container spacing={3}>
            {Object.entries(sections).map(([device, sectionData]) => (
              <Grid item xs={12} md={4} key={device}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "#252525", color: "#fff" }}>
                  <Typography variant="h6" sx={{ fontWeight: "medium" }}>{device}</Typography>
                  <Box sx={{ mt: 2 }}>
                    {sectionData.map((section) => (
                      <Button
                        key={section.name}
                        variant="contained"
                        sx={{ m: 1, width: "100%", backgroundColor: "#007bff", borderRadius: 2 }}
                        onClick={() => handleOpen(section)}
                      >
                        {section.name} (Manage)
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <NavButtonLinks />
        </Paper>

        {/* Modal Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ backdropFilter: "blur(5px)" }}>
          <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#333", color: "#fff" }}>
            Manage {selectedSection.name}
            <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10, color: "#fff" }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#222", color: "#fff" }}>
            {bannerUrl ? (
              <Box sx={{ textAlign: "center", my: 2 }}>
                <Typography variant="subtitle1">Current Banner:</Typography>
                {bannerUrl.endsWith(".mp4") ? (
                  <video src={bannerUrl} controls style={{ maxWidth: "100%", maxHeight: "250px" }} />
                ) : (
                  <img src={bannerUrl} alt="Banner" style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }} />
                )}
              </Box>
            ) : (
              <Typography>No banner uploaded yet.</Typography>
            )}
            <UploadBanner fetchBanner={() => fetchBanner(selectedSection.api)} api={selectedSection.api} />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#333" }}>
            <Button onClick={handleClose} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </div>
  );
};

export default Dashboard;