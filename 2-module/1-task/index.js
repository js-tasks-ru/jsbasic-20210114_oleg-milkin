/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */

function isNumber(value) {
  if (typeof (value) === 'number' && isFinite(value))
    return true;

  return false;
}

function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (let key in salaries) {
    if (isNumber(salaries[key])) {
      sum += salaries[key];
    }
  }

  return sum;
}
