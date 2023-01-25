export const isValidColor = (strColor) => {
  var s = new Option().style;
  s.color = strColor;
  return s.color == strColor;
};
