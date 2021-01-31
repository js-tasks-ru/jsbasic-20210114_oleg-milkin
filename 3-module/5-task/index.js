/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */

function isNumber(value) {
  return typeof (value) === 'number' && isFinite(value);
}

function getMinMax(str) {
  // ваш код...
  let arrStr = str.split(' ').join().split(',');
  let numbers = arrStr.filter(item => isNumber(+item) && item !== "");

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
