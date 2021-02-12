import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.classList.add('card');

    let template = `
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `;

    this.elem.innerHTML = template;

    this.elem.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG' && e.target.closest('.card__button')) {

        let myEvent = new CustomEvent("product-add", {
          detail: {
            id: product.id,
          },
          bubbles: true
        });

        this.elem.dispatchEvent(myEvent);
      }
    })
  }
}
