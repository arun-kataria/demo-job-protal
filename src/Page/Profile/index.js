import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ pb: 3 }}>
        My Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
