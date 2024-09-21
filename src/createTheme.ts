"use client";
import { ThemeOptions, createTheme } from "@mui/material/styles";

const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008080",
      light: "#009D9D",
      dark: "#006262",
    },
    secondary: {
      main: "#4c73a3",
      light: "#5A88C0",
      dark: "#3F5F86",
    },
    info: {
      main: "#104040",
      light: "#175D5D",
      dark: "#092323",
    },
  },
});

const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00BABA",
      light: "#00D7D7",
      dark: "#009D9D",
    },
    secondary: {
      main: "#7792b4",
      light: "#8BABD2",
      dark: "#647C98",
    },
    info: {
      main: "#1F7A7A",
      light: "#269898",
      dark: "#175D5D",
    },
  },
});

export const appTheme = createTheme({
  typography: { fontFamily: "var(--font-inter)" },
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: lightTheme, dark: darkTheme },
});
