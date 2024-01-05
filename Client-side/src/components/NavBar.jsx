import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { indigo, purple } from "@mui/material/colors";
import { ThemeProvider, createTheme, styled, useTheme } from "@mui/material/styles";
import * as React from "react";

import "./NavBar.css";
import { HorizontalMenu, MainComponent, SearchBox, SideBar } from "./NavBarComponents";

const theme2 = createTheme({
  palette: {
    primary: indigo,
    secondary: purple,
  },
});

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const NavBar = ({ main}) => {

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme2}>
      <Box sx={{ flexGrow: 1, marginTop: 0, marginBottom: 0 }} position="static">
        <AppBar position="sticky" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Internship Forum
            </Typography>
            <SearchBox />
            <Box sx={{ flexGrow: 1 }} />
            <HorizontalMenu
              anchorEl={anchorEl1}
              setAnchorEl={setAnchorEl1}
              mobileMoreAnchorEl={mobileMoreAnchorEl1}
              setMobileMoreAnchorEl={setMobileMoreAnchorEl1}
            />
         
          </Toolbar>
        </AppBar>
        <SideBar
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
          theme={theme}
        />
        <MainComponent open={open} main={main} drawerWidth={drawerWidth} theme= {theme} Main= {Main}/>
      </Box>
    </ThemeProvider>
  );
};
export default NavBar;
