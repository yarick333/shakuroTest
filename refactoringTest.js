function func(string, a, b) {
  if (string.trim() === '') {
    return -1;
  }

  let index = string.length - 1;
  let aIndex = -1;
  let bIndex = -1;

  while (aIndex === -1 && bIndex === -1 && index > 0) {
    const substring = string.substring(index, index + 1);

    if (substring === a) {
      aIndex = index;
    }

    if (substring === b) {
      bIndex = index;
    }

    index = index - 1;
  }

  if (aIndex !== -1) {
    return bIndex === -1 ? aIndex : Math.max(aIndex, bIndex);
  }

  return bIndex !== -1 ? bIndex : -1;
}
