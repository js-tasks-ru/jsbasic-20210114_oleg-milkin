/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...
  let searchParam1 = '1XbeT'.toLowerCase();
  let searchParam2 = 'XXX'.toLowerCase();

  return str.toLowerCase().includes(searchParam1) || str.toLowerCase().includes(searchParam2);
}
