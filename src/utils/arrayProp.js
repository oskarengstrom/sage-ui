export const arrayProp = ({ theme, value, func, interpolation }) => {
  if (!value) return;
  const bp = theme?.bp || [];

  // create media queries array
  const mq = bp.map((bp) => `@media (min-width: ${bp})`);

  // force value to be array of max 5 items
  value = Array.isArray(value) ? value : [value];
  if (value.length > 5) value = value.slice(0, 5);

  // map over the array and return the css
  return value.map((x, index) => {
    // if the value is null, return nothing
    if (x === null) return;

    // if the value is a number, interpolate it
    if (interpolation && typeof x === "number") {
      x = `${x}${interpolation}`;
    }
    if (index === 0) {
      return func(x);
    } else {
      return `${mq[index - 1]} {${func(x)}}`;
    }
  });
};
