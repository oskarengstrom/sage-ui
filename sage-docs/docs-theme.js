export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
    blue: "RoyalBlue",
  },
  gradients: {
    primary: "linear-gradient(150.67deg, #8D50E1 7.04%, #E15870 82.01%);",
  },
};

export const docsTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "80rem",
    xPadding: ["1rem", "2rem"],
  },
  palette: {
    background: constants.colors.white,
    text: {
      primary: constants.colors.black,
      secondary: "rgba(0, 0, 0, 0.45)",
    },
    icon: {
      primary: constants.colors.black,
    },
    primary: {
      main: constants.colors.blue,
    },
  },
  typography: {
    variants: {
      default: {
        fontFamily: "sans-serif",
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
        color: "palette.primary.main",
        fontWeight: "600",
        letterSpacing: 0.1,
      },
      pre: {
        fontFamily: "monospace",
        color: "RoyalBlue",
        backgroundColor: "aliceblue",
        style: {
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          // width: "min-content",
          // height: "min-content",
        },
      },
    },
  },
};
