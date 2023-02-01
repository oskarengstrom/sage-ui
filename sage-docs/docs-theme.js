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
      secondary: "rgba(0, 0, 0, 0.4)",
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
        lineHeight: "1rem",
      },
      h1: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
      },
      h2: {
        fontSize: "1.75rem",
        lineHeight: "2rem",
      },
      caption: {
        fontSize: "0.75rem",
        textTransform: "uppercase",
        lineHeight: "1rem",
        color: "palette.primary.main",
        fontWeight: "700",
      },
      pre: {
        fontFamily: "monospace",
        color: "RoyalBlue",
        backgroundColor: "aliceblue",
        style: {
          width: "min-content",
          height: "min-content",
          // padding: "0.15rem",
          borderRadius: "0.25rem",
        },
      },
    },
  },
};
