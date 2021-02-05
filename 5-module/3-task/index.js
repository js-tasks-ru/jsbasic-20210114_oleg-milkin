function initCarousel() {
  // ваш код...

  let slideList = document.querySelectorAll('.carousel__slide');
  let activeSlide = 0;
  let slideWidth = slideList[0].offsetWidth;
  let nextBtn = document.querySelector('.carousel__arrow_right');
  let prevBtn = document.querySelector('.carousel__arrow_left');
  let container = document.querySelector('.carousel__inner');

  function next() {
    if(activeSlide < slideList.length) {
      activeSlide += 1;
      moveSlide(activeSlide);
    }

    if (activeSlide === slideList.length - 1) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'block';
    }

    return false;
  }

  function prev() {
    if(activeSlide > 0) {
      activeSlide -= 1;
      moveSlide(activeSlide);
    }

    if (activeSlide === 0) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'block';
    }

    return false;
  }

  function moveSlide(slide) {
    let sliderPosition = -(slide * slideWidth) + 'px';
    container.style.transform = `translateX(${sliderPosition})`;
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
}
