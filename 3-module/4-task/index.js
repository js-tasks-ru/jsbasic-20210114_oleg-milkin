/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  // ваш код...
  let filteredUsers = users.filter(user => user.age <= age);
  let result = '';

  filteredUsers.forEach((item, index) => {

    if (index === filteredUsers.length - 1) {
      result += `${item.name}, ${item.balance}`;
    } else {
      result += `${item.name}, ${item.balance}\n`;
    }
    return result;
  });

  return result;
}
