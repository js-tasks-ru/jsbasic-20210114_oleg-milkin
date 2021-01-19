/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = n || 1;

  for (let i = n; i > 1; i--) {
    result = result * (i - 1);
  }

  return result;
}

factorial(0);
factorial(1);
factorial(3);
factorial(5);
