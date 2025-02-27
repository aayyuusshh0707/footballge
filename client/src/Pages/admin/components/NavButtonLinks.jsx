import React, { useState } from "react";
import { Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

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

  return (
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
    </Paper>
  );
};

export default NavButtonLinks;
