/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement('ul');

  friends.forEach(function(item){
    let li = document.createElement('li');
    li.innerHTML = item.firstName + item.lastName;
    ul.append(li);
  });

  return ul;
}

