import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    let itemsTemplate = '';

    this.categories.forEach((item) => {

      itemsTemplate += `
        <a
          href="#"
          class="ribbon__item"
          data-id="${item.id}"
        >
          ${item.name}
        </a>
      `;

    });

    let rootTemplate = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${itemsTemplate}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    this.elem.innerHTML = rootTemplate;

    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    arrowLeft.addEventListener('click', () => {
      this.moveSlide(-350, 0, ribbonInner);
    });

    arrowRight.addEventListener('click', () => {
      this.moveSlide(350, 0, ribbonInner);
    });

    ribbonInner.addEventListener('click', (e) => {
      e.preventDefault();

      ribbonItems.forEach((item) => {
        item.classList.remove('ribbon__item_active');
      })

      e.target.classList.add('ribbon__item_active');

      let myEvent = new CustomEvent('ribbon-select', {
        detail: e.target.dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(myEvent);
    })

    ribbonInner.addEventListener('scroll', (e) => {
      let scrollLeft = e.target.scrollLeft;
      let scrollWidth = e.target.scrollWidth;
      let clientWidth = e.target.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if(scrollRight < 1) {
        this.toggleArrowsVisibility(arrowLeft, arrowRight);
      }

      if(scrollLeft < 1) {
        this.toggleArrowsVisibility(arrowLeft, arrowRight);
      }
    });

  }

  moveSlide(x, y, ribbonInner) {
    ribbonInner.scrollBy(x, y);
  }

  toggleArrowsVisibility(arrowLeft, arrowRight) {
    arrowRight.classList.toggle('ribbon__arrow_visible');
    arrowLeft.classList.toggle('ribbon__arrow_visible');
  }

}
