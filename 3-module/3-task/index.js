/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  // ваш код...
  let result = str.split('-');

  return result.map(
    (item, index) => {
      if (index === 0) {
        return item;
      } else {
        return item[0].toUpperCase() + item.slice(1);
      }
    }
  ).join('');
}
