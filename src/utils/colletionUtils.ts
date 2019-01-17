export function createNumericIdDistinctFromObjectKeys(object: { [key: number]: any }) {
  let id = 0;

  for (const key in object) {
    if (id === Number(key)) {
      id += 1;
    } else {
      return id;
    }
  }

  return id;
}
