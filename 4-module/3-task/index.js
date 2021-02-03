/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let statusList = table.rows[i].cells[3].dataset.available;
    let genderList = table.rows[i].cells[2];
    let ageList = table.rows[i].cells[1];
    //Available/unavailable class set
    if (statusList === 'true') {
      table.rows[i].classList.add('available');
    } else if (statusList === 'false') {
      table.rows[i].classList.add('unavailable');
    } else {
      table.rows[i].hidden = true;
    }
    //Gender class set
    if (genderList.innerText === 'm') {
      table.rows[i].classList.add('male');
    } else {
      table.rows[i].classList.add('female'); // было genderList
    }
    //Age styling
    if (ageList.innerText < 18) {
      table.rows[i].style.textDecoration = 'line-through'; // было ageList
    }
  }
}
