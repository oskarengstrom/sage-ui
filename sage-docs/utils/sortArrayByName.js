export default function sortArrayByName(array) {
  return array.sort((a, b) => {
    if (a.data.name < b.data.name) {
      return -1;
    }
    if (a.data.name > b.data.name) {
      return 1;
    }
    return 0;
  });
}
