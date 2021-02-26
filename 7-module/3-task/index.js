export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.checkedSegment = 0;

    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    let stepsTemplate = '';

    for (let i = 0; i < steps; i++) {
      stepsTemplate += `<span></span>`;
    }

    let template = `
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <div class="slider__progress" style="width: 50%;"></div>

      <div class="slider__steps">
        ${stepsTemplate}
      </div>
    `;

    this.elem.addEventListener('click', this.checkSegment);

    this.elem.innerHTML = template;

    this.setSliderValue(value);
    this.changeSlider();
    this.setActive();
  }

  checkSegment = (e) => {
    if (!e.target.classList.contains('slider__thumb')) {
      let clickedPosition = e.offsetX || 0;
      let stepsEl = this.elem.querySelector('.slider__steps');
      let stepsWidth = stepsEl.clientWidth;
      let segmentWidth = stepsWidth / (this.steps - 1);
      this.checkedSegment = Math.round(clickedPosition / segmentWidth);
      this.setSliderValue();
      this.changeSlider();
      this.setActive();

      let myEvent = new CustomEvent('slider-change', {
        detail: this.checkedSegment,
        bubbles: true
      });

      this.elem.dispatchEvent(myEvent);
    }

    return false;
  }

  setSliderValue() {
    this.elem.querySelector('.slider__value').innerHTML = this.checkedSegment;
  }

  setActive() {
    let stepsPoint = this.elem.querySelector('.slider__steps').querySelectorAll('span');

    stepsPoint.forEach((item) => {
      item.classList.remove('slider__step-active');
    });

    stepsPoint[this.checkedSegment].classList.add('slider__step-active');
  }

  changeSlider() {
    let leftPosition = (100 / (this.steps - 1)) * this.checkedSegment;
    this.elem.querySelector('.slider__thumb').style.left = `${leftPosition}%`;

    let progressEl = this.elem.querySelector('.slider__progress');
    progressEl.style.width = `${leftPosition}%`;
  }
}
