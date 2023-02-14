export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
    blue: "RoyalBlue",
    vulcan: {
      950: "#0F1118",
      900: "#171921",
      800: "#232734",
      700: "#343B52",
      600: "#4C5779",
      500: "#6976A3",
      400: "#8691BB",
      300: "#A4ACCC",
      200: "#C3C9E1",
      100: "#E1E5F7",
    },
    persianBlue: {
      900: "#0E1448",
      800: "#111F6C",
      700: "#112FA4",
      600: "#1C44E0", // primary
      500: "#396FFF",
      400: "#6090FF",
      300: "#86ADFF",
      200: "#B3CAFF",
      100: "#DEE5FC",
    },
  },
  gradients: {
    primary: "linear-gradient(150.67deg, #8D50E1 7.04%, #E15870 82.01%);",
  },
};

export const docsTheme = {
  // bp: ["0rem", "36rem", "62rem", "75rem"],
  bp: ["36rem", "62rem", "75rem", "85rem"],
  section: {
    maxWidth: "80rem",
    xPadding: ["1rem"],
  },
  palette: {
    background: constants.colors.vulcan[900],
    text: {
      primary: constants.colors.vulcan[100],
      secondary: constants.colors.vulcan[500],
    },
    icon: {
      primary: constants.colors.vulcan[200],
    },
    primary: {
      main: constants.colors.persianBlue[500],
    },
  },
  constants,
  typography: {
    variants: {
      default: {
        fontFamily: "var(--font-family-body)",
        fontSize: "0.875rem",
        lineHeight: 1.25,
      },
      h1: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
      },
      h2: {
        fontSize: "1.75rem",
        lineHeight: "2rem",
      },
      h3: {},
      h4: {},
      h5: {},
      paragraph: {},
      caption: {
        fontSize: "0.75rem",
        textTransform: "uppercase",
        lineHeight: "1rem",
        color: "palette.text.secondary",
        fontWeight: "600",
        letterSpacing: 0.1,
      },
      component: {
        fontFamily: "var(--font-family-mono)",
      },
      prop: {
        fontFamily: "var(--font-family-mono)",
      },
      mixin: {
        fontFamily: "var(--font-family-mono)",
      },
      pre: {
        fontFamily: "var(--font-family-mono)",
        color: constants.colors.vulcan[100],
        backgroundColor: constants.colors.vulcan[800],
        style: {
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 6px 32px -8px rgba(0, 0, 0, 0.25)",
          // width: "min-content",
          // height: "min-content",
        },
      },
    },
  },
};
