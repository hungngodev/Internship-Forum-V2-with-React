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
    { name: "Home", icon: <HomeIcon />, path: "" },
    { name: "Internships", icon: <AllInboxIcon />, path: "internships" },
    { name: "Statistics", icon: <AutoGraphIcon />, path: "statistics" },
    {
      name: "New Internship",
      icon: <CreateNewFolderIcon />,
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
            backgroundColor: "#6272A4",
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
                <NavLink to={path}   style={{backgroundColor:'transparent', color:'fff',textDecoration:'none'}}>
                  <ListItemButton
                    sx={{ color: "#F8F8F2"}}
                  >
                    <ListItemIcon sx={{ color: "#FF79C6" }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "#F8F8F2"}}
                      primary={name}
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
