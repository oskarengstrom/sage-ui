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
    primary: {
      main: constants.colors.green,
    },
  },
  text: {
    primary: constants.colors.black,
    secondary: constants.colors.black,
    disabled: constants.colors.black,
    variants: {
      default: {
        fontSize: "2rem",
      },
      h1: {
        fontSize: "4rem",
      },
    },
  },
};
