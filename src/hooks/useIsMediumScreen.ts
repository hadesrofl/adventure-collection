import { useMediaQuery, useTheme } from "@mui/material";
import useIsSmallScreen from "./useIsSmallScreen";

export default function useIsMediumScreen() {
  const theme = useTheme();
  const isSmallScreen = useIsSmallScreen();
  return useMediaQuery(theme.breakpoints.down("lg")) && !isSmallScreen;
}
