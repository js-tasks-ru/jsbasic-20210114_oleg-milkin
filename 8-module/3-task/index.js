export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
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

    if(!res) {
      return;
    }

    amount === 1 ? res.count++ : res.count--;

    if(res.count > 0) {
      this.onProductUpdate(res);
      return;
    }

    if(res.count == 0) {
      let resIndex = this.cartItems.findIndex((item) => item.product.id === productId);
      this.cartItems.splice(resIndex, 1);
    }
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    if(!this.isEmpty()) {
      return this.cartItems.reduce((sum, current) => {
        return sum + current.count;
      }, 0);
    }
  }

  getTotalPrice() {
    if(!this.isEmpty()) {
      return this.cartItems.reduce((sum, current) => {
        return sum + (current.count * current.product.price);
      }, 0);
    }
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}

