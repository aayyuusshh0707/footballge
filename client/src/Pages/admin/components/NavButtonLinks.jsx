import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

const NavButtonLinks = () => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [link, setLink] = useState("");
  const [buttonType, setButtonType] = useState("");

  const handleLinkOpen = (button) => {
    setButtonType(button);
    setLinkDialogOpen(true);
  };

  const handleLinkClose = () => {
    setLinkDialogOpen(false);
    setLink("");
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
    setLink("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 4,
        textAlign: "center",
        borderRadius: 3,
        backgroundColor: "#252525",
        color: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
        Manage Links
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007bff", borderRadius: 2 }}
          onClick={() => handleLinkOpen("button-one")}
        >
          Button 1 (Add/Remove)
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007bff", borderRadius: 2 }}
          onClick={() => handleLinkOpen("button-two")}
        >
          Button 2 (Add/Remove)
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007bff", borderRadius: 2 }}
          onClick={() => handleLinkOpen("button-three")}
        >
          Button 3 (Add/Remove)
        </Button>
      </Box>

      {/* Link Input Dialog */}
      <Dialog open={linkDialogOpen} onClose={handleLinkClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#333", color: "#fff" }}>
          Update Link for {buttonType.replace("-", " ")}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#222", color: "#fff" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Link"
            fullWidth
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            sx={{ input: { color: "#fff" }, label: { color: "#bbb" } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#333" }}>
          <Button onClick={handleLinkClose} color="secondary" variant="contained" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleLinkSave} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NavButtonLinks;
