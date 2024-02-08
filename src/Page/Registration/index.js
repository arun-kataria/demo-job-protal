import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { URL, USER_TYPE } from "../../Config/constant";
import { handlers } from "../../mocks/handlers";
import { worker } from "../../mocks/setup-msw";
worker.use(...handlers);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography component="div" sx={{ p: 3 }}>
          {children}
        </Typography>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function Registration() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [gitUserName, setGitUserName] = React.useState("");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submitHandler = React.useCallback(
    async (e) => {
      const body = {
        emailId,
        password,
        name,
        type: USER_TYPE[value],
      };
      console.log("body - ", body);
      e.preventDefault();

      const response = await fetch(URL.CREATE_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      console.log("response: ", jsonData.message);
    },
    [name, emailId, value, password]
  );

  const registrationForm = React.useCallback(() => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
        component="form"
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <TextField
          label={value ? "Name" : "Organization Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        {value ? (
          <TextField
            label="Github User Name"
            value={gitUserName}
            onChange={(e) => setGitUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
        ) : null}
        <TextField
          label="EmailId"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          onBlur={(e) =>
            e.target.value && setEmailError(!validateEmail(e.target.value))
          }
          fullWidth
          margin="normal"
          error={emailError}
          helperText={emailError ? "Invalid email format" : ""}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    );
  }, [
    name,
    emailId,
    value,
    password,
    confirmPassword,
    emailError,
    submitHandler,
    gitUserName,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        width: "100%",
        bgcolor: "background.paper",
        p: 3,
        boxSizing: "border-box",
        "& .MuiBox-root": { maxWidth: "500px" },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Employer" {...a11yProps(0)} />
            <Tab label="FreeLancer" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          {registrationForm()}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {registrationForm()}
        </TabPanel>
      </Box>
    </Box>
  );
}
