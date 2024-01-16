import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

import * as React from "react";

import { useHomeLayoutContext } from "../../pages/HomeLayout";
import Typography from "@mui/material/Typography";

const HorizontalMenu = ({
  anchorEl,
  setAnchorEl,
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
}) => {
  const { datauser, user, logOutUser } = useHomeLayoutContext();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink
        to={`/profile/${datauser ? datauser._id : ""}`}
        style={{ backgroundColor: "transparent", textDecoration: "none" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="subtitle" color="primary">
            Your Posts
          </Typography>
        </MenuItem>
      </NavLink>
      <NavLink
        to={`/setting`}
        style={{
          backgroundColor: "transparent",
          textDecoration: "none",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="subtitle" color="secondary">
            Account Setting
          </Typography>
        </MenuItem>
      </NavLink>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const MenuComponent = (
    <div style={{ display: "flex" }}>
      {user ? (
        <>
          <MenuItem>
            <Button
              onClick={logOutUser}
              size="large"
              aria-label="logout"
              sx={{ color: "text.primary" }}
            >
              <LogoutIcon />
              <p style={{ textTransform: "none", marginLeft: "1vw" }}>
                {" "}
                LogOut
              </p>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
            >
              <AccountCircle color="text.primary" />
            </IconButton>
            <Typography variant="subtitle" color="text.primary">
              Profile
            </Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <NavLink to={"login"} style={{ textDecoration: "none" }}>
            <MenuItem>
              <IconButton size="large" aria-label="login" color="inherit">
                <LoginIcon sx={{ color: "text.primary" }} />
              </IconButton>
              <Typography variant="subtitle" color="text.primary">
                Login
              </Typography>
            </MenuItem>
          </NavLink>
          <NavLink to={"register"} style={{ textDecoration: "none" }}>
            <MenuItem>
              <IconButton size="large" aria-label="register" color="inherit">
                <LoginIcon sx={{ color: "text.primary" }} />
              </IconButton>
              <Typography variant="subtitle" color="text.primary">
                Register
              </Typography>
            </MenuItem>
          </NavLink>
        </>
      )}
    </div>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {MenuComponent}
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>{MenuComponent}</Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default HorizontalMenu;
