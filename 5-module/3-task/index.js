function initCarousel() {
  // ваш код...

  let slideList = document.querySelectorAll('.carousel__slide');
  let activeSlide = 0;
  let slideWidth = slideList[0].offsetWidth;
  let nextBtn = document.querySelector('.carousel__arrow_right');
  let prevBtn = document.querySelector('.carousel__arrow_left');
  let container = document.querySelector('.carousel__inner');

  prevBtn.style.display = 'none';

  function next() {
    if (activeSlide < slideList.length) {
      activeSlide += 1;
      moveSlide(activeSlide);
    }

    if (activeSlide === slideList.length - 1) {
      hideNextBtn();
    } else {
      showBothButtons();
    }

    return false;
  }

  function prev() {
    if (activeSlide > 0) {
      activeSlide -= 1;
      moveSlide(activeSlide);
    }

    if (activeSlide === 0) {
      hidePrevBtn();
    } else {
      showBothButtons();
    }

    return false;
  }

  function moveSlide(slide) {
    let sliderPosition = -(slide * slideWidth) + 'px';
    container.style.transform = `translateX(${sliderPosition})`;
  }

  function showBothButtons() {
    nextBtn.style.display = '';
    prevBtn.style.display = '';
  }

  function hidePrevBtn() {
    prevBtn.style.display = 'none';
  }

  function hideNextBtn() {
    nextBtn.style.display = 'none';
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
}
