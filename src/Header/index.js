import React, { useCallback, useState } from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import LoginDialog from "../Dialogs/LoginDialog";
import { useNavigate } from "react-router-dom";
import ROUTE from "../Config/constant";
import { useUser } from "../UserContext";

export default function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLoginDialog, setLoginDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const loginHandler = useCallback(() => {
    setLoginDialog(!showLoginDialog);
  }, [showLoginDialog]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={loginHandler}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Registration" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar position="fixed">
      <LoginDialog handler={loginHandler} isOpen={showLoginDialog} />

      <Toolbar>
        {user ? (
          <>
            {" "}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              Logo
            </Typography>{" "}
            <Avatar
              src="/broken-image.jpg"
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {isMobile ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              Logo
            </Typography>
            {isMobile ? (
              <Drawer
                anchor={"right"}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
            ) : (
              <>
                <Button color="inherit" onClick={loginHandler}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate(ROUTE.REGISTRATION)}
                >
                  Registration
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
