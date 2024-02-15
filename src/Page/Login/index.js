import * as React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
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

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const [openState, setOpenState] = React.useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailId(email);
    setIsEmailValid(validateEmail(email));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setIsPasswordValid(validatePassword(password));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) {
      console.log("Invalid email or password");
      return;
    }
    setIsLoader(true);
    const body = {
      emailId,
      password,
    };
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
        setOpenState(true);
        throw new Error(jsonData.error || "User not authorized");
      }
      localStorage.setItem("user", JSON.stringify(jsonData.data));
      if (jsonData.data && jsonData.data.type === USER_TYPE[0]) {
        navigate(ROUTE.EMPLOYER);
      } else {
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openState}
        onClose={() => {
          setOpenState(false);
        }}
        message="Invalid Credintial"
      />
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
            error={!isEmailValid && emailId !== ""}
            value={emailId}
            onChange={handleEmailChange}
            helperText={!isEmailValid && emailId !== "" ? "Invalid Email" : ""}
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
            error={!isPasswordValid && password !== ""}
            value={password}
            onChange={handlePasswordChange}
            helperText={
              !isPasswordValid && password !== ""
                ? "Password must be at least 6 characters"
                : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isEmailValid || !isPasswordValid || isLoader}
          >
            {isLoader ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
