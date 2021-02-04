function toggleText() {
  // ваш код...
  let btn = document.querySelector('.toggle-text-button');

  btn.addEventListener('click', () => {
    text.hidden = !text.hidden;
  });
}
