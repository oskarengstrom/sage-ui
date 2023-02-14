// takes a prop and returns an array of 4 items, with interpolation

export const arrayifyProp = (val, interpolation) => {
  val = Array.isArray(val) ? val : [val];

  val.forEach((item, index) => {
    const isLast = val.length === index + 1;
    if (isLast) {
      const loop = 5 - (index + 1);
      for (let i = 0; i < loop; i++) {
        val.push(item);
      }
    }
  });

  if (interpolation) {
    val.forEach((item, index) => (val[index] = item + interpolation));
  }

  return val;
};
