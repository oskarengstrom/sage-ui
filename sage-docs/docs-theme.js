export const constants = {
  colors: {
    black: "#100F0F",
    white: "#ffffff",
    green: "#05FF00",
    red: "#923838",
    orange: "#E48130",
    blue: "RoyalBlue",
  },
};

export const docsTheme = {
  bp: ["500px", "700px", "900px", "1100px"],
  section: {
    maxWidth: "1300px",
    px: [1, 2, 4, 8],
  },
  palette: {
    background: constants.colors.black,
    text: {
      primary: constants.colors.white,
    },
    primary: {
      main: constants.colors.green,
    },
  },
  constants,
  typography: {
    variants: {
      default: {
        fontFamily: "var(--font-family-body)",
        fontSize: 1,
        lineHeight: 1.25,
      },
      h1: {
        fontSize: 3,
        lineHeight: 3,
      },
      h2: {
        fontSize: 2,
        lineHeight: 2,
      },
      h3: {},
      h4: {},
      h5: {},
    },
  },
};
