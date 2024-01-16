import AllInboxIcon from "@mui/icons-material/AllInbox";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography'


const SideBar = ({ open, setOpen, drawerWidth, theme }) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuItems = [
    { name: "Home", icon: <HomeIcon color="BarIcon"/>, path: "" },
    { name: "Internships", icon: <AllInboxIcon color="BarIcon"/>, path: "internships" },
    { name: "Statistics", icon: <AutoGraphIcon color="BarIcon"/>, path: "statistics" },
    {
      name: "New Internship",
      icon: <CreateNewFolderIcon color="BarIcon"/>,
      path: "internships/new",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "sideBar.main",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((obj) => {
            const { path, name, icon } = obj;
            return (
              <ListItem key={name}>
                <NavLink to={path}   style={{backgroundColor:'transparent', color: "text.primary",textDecoration:'none'}}>
                  <ListItemButton
                  >
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="body1" color="text.primary" >{name}</Typography>}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          })}
        </List>
        {/* <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
      </Drawer>
    </Box>
  );
};
export default SideBar;
