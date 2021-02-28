import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';
export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {

    if (!product) {
      return;
    }

    let res = this.cartItems.find((item) => item.product.id === product.id);

    if (res) {
      res.count += 1;
      this.onProductUpdate(res);
    } else {

      let productTemplate = {
        product,
        count: 1
      };

      this.cartItems.push(productTemplate);

      this.onProductUpdate(productTemplate);
    }
  }

  updateProductCount(productId, amount) {
    let res = this.cartItems.find((item) => item.product.id === productId);

    if (!res) {
      return;
    }

    amount === 1 ? res.count++ : res.count--;

    if (res.count > 0) {
      this.onProductUpdate(res);
      return;
    }

    if (res.count === 0) {
      let resIndex = this.cartItems.findIndex((item) => item.product.id === productId);
      this.cartItems.splice(resIndex, 1);
      this.onProductUpdate(res);
    }
  }

  removeCartProduct(product) {
    let productId = product.product.id;
    let modalBody = document.querySelector('.modal__body');
    let removedProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);

    if (this.getTotalCount()) {
      removedProduct.remove();
    } else {
      this.modal.close();
    }
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    if (!this.isEmpty()) {
      return this.cartItems.reduce((sum, current) => {
        return sum + current.count;
      }, 0);
    } else {
      return 0;
    }
  }

  getTotalPrice() {
    if (!this.isEmpty()) {
      return this.cartItems.reduce((sum, current) => {
        return sum + (current.count * current.product.price);
      }, 0);
    }
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal.setTitle('Your order');

    let result = '';

    this.cartItems.forEach((item) => {
      result += this.renderProduct(item.product, item.count).outerHTML;
    });

    let orderForm = this.renderOrderForm().outerHTML;

    this.modal.setBody(createElement(`<div>${result}${orderForm}</div>`));

    this.modal.open();

    let products = [...document.querySelectorAll('.cart-product')];

    products.forEach((item, index) => {
      item.addEventListener('click', (event) => {

        if (event.target.closest('.cart-counter__button_plus')) {
          let productId = event.target.closest('.cart-product').dataset.productId;
          this.updateProductCount(productId, 1)
        }

        if (event.target.closest('.cart-counter__button_minus')) {
          let productId = event.target.closest('.cart-product').dataset.productId;
          this.updateProductCount(productId, -1);
        }
      });
    });

    let cartForm = this.modal.elem.querySelector('.cart-form');

    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    let isModalOpen = document.querySelector('body').classList.contains('is-modal-open');

    if (isModalOpen) {
      let productId = cartItem.product.id;
      let modalBody = this.modal.elem.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      if (cartItem.count !== 0) {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      } else {
        this.removeCartProduct(cartItem);
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    let submitBtn = this.modal.elem.querySelector('button[type="submit"]');
    submitBtn.classList.add('is-loading');

    try {
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(event.target)
      });

      await response.json();

      submitBtn.classList.remove('is-loading');
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.cartIcon.elem.classList.remove('cart-icon_visible');
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif" alt="">
          </p>
        </div>
      `));
    } catch (e) {
      console.log(e);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

