/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  // ваш код...
  let strLength = str.length;

  if (strLength > maxlength) {

    let lastLetterIndex = maxlength - 1;

    return str.substr(0, lastLetterIndex) + '…';
  }

  return str;
}
