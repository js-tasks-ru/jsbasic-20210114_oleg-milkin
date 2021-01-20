/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...

  let firstLetter = str[0];
  let text = str.slice(1);

  return firstLetter ? firstLetter.toUpperCase() + text : '';
}
