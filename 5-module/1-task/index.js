function hideSelf() {
  // ваш код...
  let btn = document.querySelector('.hide-self-button');

  btn.addEventListener('click', (e) => e.target.hidden = true);
}
