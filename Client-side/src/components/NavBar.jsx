import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { indigo, purple } from "@mui/material/colors";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
import * as React from "react";
import { useState,useEffect} from "react";
import { useLocation } from "react-router-dom";

import { useHomeLayoutContext } from "../pages/HomeLayout";
import SwitchButton from "./SwitchButton";
import "./NavBar.css";
import { HorizontalMenu, MainComponent, SideBar } from "./NavBarComponents";
import { resetBodyStyle,titleObject, Palette} from "../utils";
import Font from "../utils/FontConfiguration";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    overflowX:"hidden",
    height:"100%",
    padding: theme.spacing(3),
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
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
  let { setTheme, Theme } = useHomeLayoutContext();

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = useState(null);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const ModeTheme = React.useMemo(
    () =>
      createTheme({
        palette: Palette(mode),
      }),
    [mode]
  );
  const [Title, changeTitle] = useState("Home Page");
  const location = useLocation();
  useEffect(() => {
    document.body.style.backgroundColor = Palette(mode).CustomBackGround;
  }, [mode]);
  useEffect(() => {
    changeTitle(titleObject(location.pathname));
  }, [location]);
  return (
    <ThemeProvider theme={ModeTheme}>
      <Box
        sx={{ flexGrow: 1, marginTop: 0, marginBottom: 0, width: "100%",height:"100%"}}
        position="static"
      >
        <AppBar
          position="sticky"
          open={open}
          sx={{ width: "100%s" }}
          color="navBar"
          enableColorOnDark={false}
        >
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item md={2}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon sx={{color:"text.primary"}} />
                </IconButton>
              </Grid>
              <Grid item md={1} sx={{ display: "flex", justifyContent: "end" }}>
                <SwitchButton
                  onChange={() => {
                    colorMode.toggleColorMode();
                  }}
                />
              </Grid>
              <Grid item md={6} display="flex" justifyContent="center" alignItems="center" sx={{paddingTop:'10px'}}>
                <Typography variant="h3" color="text.primary" fontFamily={Font.subtitle}>{Title}</Typography>
              </Grid>
              <Grid item md={3} sx={{ display: "flex", justifyContent: "end" }}>
                <HorizontalMenu
                  anchorEl={anchorEl1}
                  setAnchorEl={setAnchorEl1}
                  mobileMoreAnchorEl={mobileMoreAnchorEl1}
                  setMobileMoreAnchorEl={setMobileMoreAnchorEl1}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <SideBar
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
          theme={theme}
        />
        <MainComponent
          open={open}
          main={main}
          drawerWidth={drawerWidth}
          theme={theme}
          Main={Main}
        />
      </Box>
    </ThemeProvider>
  );
};
export default NavBar;
