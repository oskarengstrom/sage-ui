# Theming

Same provider as @emotion but with defaultTheme already built in.

Quick start-up:

```
import { ThemeProvider } from "@oskarengstrom/sage-ui"

export default function Home() {
  return (
    <ThemeProvider>
        ...
    </ThemeProvider>
  }
}

```

The default theme is also available if you need to extend it:

```
import { ThemeProvider, defaultTheme } from "@oskarengstrom/sage-ui"
import { myTheme } from "somewhere"

export default function Home() {
  return (
    <ThemeProvider theme={{...defaultTheme, ...myTheme}}>
        ...
    </ThemeProvider>
  }
}

```
