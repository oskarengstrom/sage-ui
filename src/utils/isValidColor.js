import chroma from "chroma-js";

// export const isValidColor = (strColor) => {
//   if (typeof window === "undefined") return;
//   var s = new Option().style;
//   s.color = strColor;
//   return s.color == strColor;
// };

// export const isValidColor = (strColor) => {
//   if (typeof window === "undefined") {
//     // On the server-side, use a regular expression to check if the string matches a valid color format
//     return /^(#[0-9a-f]{3}|#[0-9a-f]{6}|(rgb|hsl)a?\([^\)]*\))$/i.test(
//       strColor
//     );
//   } else {
//     // On the client-side, use the Option.style object to check if the string is a valid color
//     var s = new Option().style;
//     s.color = strColor;
//     return s.color == strColor;
//   }
// };

// export function isValidColor(strColor) {
//   // Use a regular expression to check if the string matches a valid color format
//   return /^(#[0-9a-f]{3}|#[0-9a-f]{6}|(rgb|hsl)a?\([^\)]*\))$/i.test(strColor);
// }

export function isValidColor(color) {
  try {
    chroma(color);
    return true;
  } catch (error) {
    return false;
  }
}
