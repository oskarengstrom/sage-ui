export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
  },
  gradients: {
    primary: "linear-gradient(150.67deg, #8D50E1 7.04%, #E15870 82.01%);",
  },
};

export const playgroundTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "50rem",
    xPadding: "1rem",
  },
  palette: {
    background: constants.colors.white,
    text: {
      primary: "blue",
    },
  },
  typography: {
    variants: {
      default: {
        fontSize: "1rem",
      },
      h1: {
        fontSize: ["1rem", "2rem", "4rem"],
      },
    },
  },
};
