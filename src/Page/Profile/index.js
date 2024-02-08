import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { useUser } from "../../UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setUser((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ pb: 3 }}>
        My Profile
      </Typography>
      {profile ? (
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
              value={profile.emailId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              name="Password"
              value={profile.password}
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
      ) : null}
    </Container>
  );
}
