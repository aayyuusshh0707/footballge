import React, { useState } from "react";
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
  TextField,
} from "@mui/material";

const sections = [
  "Featured Match",
  "Large banner",
  "Side banner 1",
  "Side banner 2",
  "Side long",
  "Match section",
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [link, setLink] = useState("");
  const [buttonType, setButtonType] = useState("");

  const handleOpen = (section) => {
    setSelectedSection(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSection("");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  const handleLinkOpen = (button) => {
    setButtonType(button);
    setLinkDialogOpen(true);
  };

  const handleLinkClose = () => {
    setLinkDialogOpen(false);
  };

  const handleLinkSave = async () => {
    let apiRoute = "";
    if (buttonType === "button-one") apiRoute = "/api/button-one/updatelink";
    if (buttonType === "button-two") apiRoute = "/api/button-two/updatelink";
    if (buttonType === "button-three") apiRoute = "/api/button-three/updatelink";

    if (apiRoute) {
      await fetch(`http://localhost:8000${apiRoute}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });
    }
    setLinkDialogOpen(false);
  };

  const renderSection = (title) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {sections.map((section) => (
        <Button
          key={section}
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => handleOpen(section)}
        >
          {section} (Add/Remove)
        </Button>
      ))}
    </Paper>
  );

  return (
  
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper elevation={10} sx={{ p: 4, my: 4, textAlign: "center" }}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Welcome to the protected admin panel!
          </Typography>
          <Button onClick={handleLogout} variant="contained" color="error" sx={{ mt: 3 }}>
            Logout
          </Button>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>{renderSection("Desktop/PC")}</Grid>
          <Grid item xs={12} md={4}>{renderSection("iPad")}</Grid>
          <Grid item xs={12} md={4}>{renderSection("Mobile")}</Grid>
        </Grid>
        <Paper elevation={3} sx={{ p: 2, mt: 4, textAlign: "center" }}>
          <Typography variant="h6">Basic Link</Typography>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => handleLinkOpen("button-one")}>
            Button 1 (Add/Remove)
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => handleLinkOpen("button-two")}>
            Button 2 (Add/Remove)
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => handleLinkOpen("button-three")}>
            Button 3 (Add/Remove)
          </Button>
        </Paper>

        {/* Modal Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Manage {selectedSection}</DialogTitle>
          <DialogContent>
            <Typography>Here you can add or remove {selectedSection}.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
        {/* Link Input Dialog */}
        <Dialog open={linkDialogOpen} onClose={handleLinkClose}>
          <DialogTitle>Update Link for {buttonType.replace("-", " ")}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Enter Link"
              fullWidth
              variant="outlined"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLinkClose} color="secondary">Cancel</Button>
            <Button onClick={handleLinkSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    
  );
};

export default Dashboard;
