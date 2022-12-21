import React from "react";
import { ThemeProvider as Provider } from "@emotion/react";
import { defaultTheme } from "./defaultTheme";

function ThemeProvider({ children, theme }) {
  return <Provider theme={{ ...defaultTheme, ...theme }}>{children}</Provider>;
}

export default ThemeProvider;
