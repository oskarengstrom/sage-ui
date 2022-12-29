import React from "react";
import { ThemeProvider as Provider } from "@emotion/react";

function SageProvider({ children, theme }) {
  return <Provider theme={{ ...theme }}>{children}</Provider>;
}

export default SageProvider;
