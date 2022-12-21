export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
  },
};

export const baseTheme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  colors: {
    background: constants.colors.black,
    primary: {
      main: constants.colors.white,
    },
  },
  text: {
    primary: constants.colors.white,
    secondary: constants.colors.white,
    disabled: constants.colors.white,
  },
};
