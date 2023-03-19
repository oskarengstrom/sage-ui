import { ThemeContext, useTheme } from "@emotion/react";

export default function Theme(props) {
  const theme = useTheme(ThemeContext);

  return props.children(theme);
}
