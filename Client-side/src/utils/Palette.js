const Palette = (mode) => {
  return {
    mode,
    ...(mode === "light"
      ? {
        BarIcon: { main: "#9c27b0" },
        sideBar: { main: "#80cbc4" },
        navBar: { main: "#4db6ac" },
        CustomBackGround: "#e0f7fa",
        primary: {
          main: "#673ab7",
        },
        secondary: {
          main: "#ffa000",
        },
        third: {
          main: "#536dfe",
          secondary: "#7e57c2",
        },
        error: {
          main: "#c51162",
        },
        warning: {
          main: "#e65100",
        },
        info: {
          main: "#9e0059",
          light: "#ffa000"
        },
        success: {
          main: "#4caf50",
        },
        text: {
          primary: "#000",
          secondary: "#000",
        },
        barColor:{
          main: "156, 39, 176",
          light: "38, 166, 154",
          dark: "239, 108, 0"
        }
      }
      : {
        BarIcon: { main: "#FF79C6" },
        sideBar: { main: "#44475A" },
        navBar: { main: "#44475A" },
        CustomBackGround: "#282A36",
        primary: {
          main: "#1de9b6",
          light: "#64ffda",
          dark: "#00bfa5",
          contrastText: "#000",
        },
        secondary: {
          main: "#ff4081",
          light: "#FF79C6",
          dark: "#c51162",
          contrastText: "#000",
        },
        third: {
          main: "#76ff03",
          secondary: "#44475A",
        },
        error: {
          main: "#cddc39",
          light: "#e6ee9c",
          dark: "#afb42b",
          contrastText: "#000",
        },
        warning: {
          main: "#ffc107",
          light: "#ffe082",
          dark: "#ff8f00",
          contrastText: "#000",
        },
        info: {
          main: "#00bcd4",
          light: "#80deea",
          dark: "#009688",
          contrastText: "#000",
        },
        success: {
          main: "#009688",
          light: "#b2dfdb",
          dark: "#388e3c",
          contrastText: "#fff",
        },
        text: {
          primary: "#fff",
          secondary: "#fff",
        },
        barColor:{
          main: "63, 81, 181",
          light: "156, 39, 176",
          dark: "237, 174, 73"
        }
      }),
  }
}
export default Palette;