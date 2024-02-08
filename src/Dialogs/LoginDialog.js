import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Slide,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ROUTE, { URL, USER_TYPE } from "../Config/constant";
import CircularProgressBar from "../Elements/CircularProgressBar";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog({ handler, isOpen }) {
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
      }
      setUser(jsonData.data);
      handler();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoader(false);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email ID"
            type="email"
            fullWidth
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="Password"
            label="Password"
            type="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          {isLoader ? (
            <CircularProgressBar />
          ) : (
            <>
              <Button onClick={submitHandler}>Submit</Button>
              <Button
                onClick={() => {
                  setPassword("");
                  setEmailId("");
                }}
              >
                Clear
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
