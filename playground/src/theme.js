export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
  },
};

export const playgroundTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"],
  },
  palette: {
    background: constants.colors.white,
    textPrimary: constants.colors.black,
  },
  typography: {
    variants: {
      default: {
        fontSize: "1rem",
      },
      h1: {
        fontSize: "4rem",
      },
    },
  },
};
