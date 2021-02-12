import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slidesLength = slides.length;
    this.activeSlide = 0;

    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');

    let slidesTemplate = '';

    slides.forEach((item, index) => {

      let template = `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;

      slidesTemplate += template;
    });

    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none;">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${slidesTemplate}
      </div>
    `;

    this.elem.addEventListener('click', (e) => {

      if (e.target.closest('.carousel__arrow_right')) {
        this.next();
      }

      if (e.target.closest('.carousel__arrow_left')) {
        this.prev();
      }

      if (e.target.closest('.carousel__button')) {

        let myEvent = new CustomEvent("product-add", {
          detail: slides[this.activeSlide].id,
          bubbles: true
        });

        this.elem.dispatchEvent(myEvent);
      }

    });
  }

  next() {
    if (this.activeSlide < this.slidesLength) {
      this.activeSlide += 1;
      this.moveSlide(this.activeSlide);
    }

    if (this.activeSlide === this.slidesLength - 1) {
      this.hideNextBtn();
    } else {
      this.showBothButtons();
    }
  }

  prev() {
    if (this.activeSlide > 0) {
      this.activeSlide -= 1;
      this.moveSlide(this.activeSlide);
    }

    if (this.activeSlide === 0) {
      this.hidePrevBtn();
    } else {
      this.showBothButtons();
    }
  }

  showBothButtons() {
    document.querySelector('.carousel__arrow_right').style.display = '';
    document.querySelector('.carousel__arrow_left').style.display = '';
  }

  hidePrevBtn() {
    document.querySelector('.carousel__arrow_left').style.display = 'none';
  }

  hideNextBtn() {
    document.querySelector('.carousel__arrow_right').style.display = 'none';
  }

  moveSlide(slide) {
    let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
    let sliderPosition = -(slide * slideWidth) + 'px';
    let container = document.querySelector('.carousel__inner');

    container.style.transform = `translateX(${sliderPosition})`;
  }
}
