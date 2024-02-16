"use client";
import { ThemeOptions, createTheme } from "@mui/material/styles";

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#80CBC4",
    },
    secondary: {
      main: "#CC9981",
    },
    background: {
      paper: "#ffffff",
      default: "#FFF6F4",
    },
  },
});

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});
