// icon:menu-left-alt | CSS Icons https://css.gg/ | Astrit
import { ThemeContext } from "@emotion/react";
import { useTheme } from "@emotion/react";
import * as React from "react";

function IconMenuLeftAlt(props) {
  const theme = useTheme(ThemeContext);
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="1.5rem"
      width="1.5rem"
      {...props}
    >
      <path
        fill={theme.palette.text.primary}
        d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM4 18a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h8a1 1 0 100-2H5z"
      />
    </svg>
  );
}

export default IconMenuLeftAlt;
