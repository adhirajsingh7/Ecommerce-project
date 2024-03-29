import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

export default responsiveFontSizes(theme);
