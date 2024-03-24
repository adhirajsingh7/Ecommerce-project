import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
});

export default responsiveFontSizes(theme);
