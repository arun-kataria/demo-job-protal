import * as React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import ROUTE, { URL, USER_TYPE } from "../../Config/constant";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoader, setIsLoader] = React.useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    const body = {
      emailId,
      password,
    };
    console.log("body - ", body);
    try {
      const response = await fetch(URL.LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error(jsonData.error || "User not authorized");
      }
      console.log("response: ", jsonData.message);
      localStorage.setItem("user", JSON.stringify(jsonData.data));
      if (jsonData.data && jsonData.data.type === USER_TYPE[0]) {
        navigate(ROUTE.EMPLOYER);
      } else {
        console.log("re--", ROUTE.FREELENCER);
        navigate(ROUTE.FREELENCER);
      }
      setUser(jsonData.data);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoader}
          >
            {isLoader ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              {/* Link to reset password or additional actions */}
            </Grid>
            <Grid item>
              {/* Link to registration page or additional actions */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
