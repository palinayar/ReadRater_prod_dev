import { createTheme } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#215a03",
    },
    secondary: {
      main: "#215a03",
    },
    background: {
      default: "#ebf5ed",
    },
  },
  props: {
    MuiAppBar: {
      color: "secondary",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#bbf192",
    },
    secondary: {
      main: "#215a03",
    },
    background: {
      default: "#011707",
    },
  },
  props: {
    MuiAppBar: {
      color: "secondary",
    },
  },
});
