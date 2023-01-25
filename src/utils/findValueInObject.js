export const findValueInObject = (str, obj) => {
  var keys = str.split(".");
  var current = obj;
  for (var i = 0; i < keys.length; i++) {
    if (current.hasOwnProperty(keys[i])) {
      current = current[keys[i]];
    } else {
      return undefined;
    }
  }
  return current;
};
