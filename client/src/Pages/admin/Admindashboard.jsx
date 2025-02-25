import React from "react";
import { Container, Typography, Button, Paper } from "@mui/material";

const Dashboard = () => {
  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Welcome to the protected admin panel!
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="error" sx={{ mt: 3 }}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Dashboard;
