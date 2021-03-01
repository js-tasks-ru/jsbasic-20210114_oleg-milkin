import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let products = await this.getProducts();
    let productGridHolder = document.querySelector('[data-products-grid-holder]');
    this.productsGrid = new ProductsGrid(products);
    productGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    const body = document.querySelector('body');

    body.addEventListener('product-add', (event) => {
      let productId = event.detail;
      let res = this.data.find((item) => item.id === productId);
      cart.addProduct(res);
    });

    body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    let vegeterian = document.querySelector('#vegeterian-checkbox');
    vegeterian.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });

    let nuts = document.querySelector('#nuts-checkbox');
    nuts.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });
  }

  async getProducts() {
    try {
      const response = await fetch('products.json');
      this.data = await response.json();
      let productGrid = document.querySelector('[data-products-grid-holder] .products-grid');
      productGrid.remove();
      return this.data;
    } catch (e) {
      console.error(e);
    }
  }
}
