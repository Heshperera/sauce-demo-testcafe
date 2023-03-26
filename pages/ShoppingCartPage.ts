
import { Selector, t } from 'testcafe';

export default class ShoppingCartPage {
  private readonly addToCartButton: Selector;
  private readonly cartIcon: Selector;
  private readonly checkoutButton: Selector;
  private readonly cartItem: Selector;

  constructor() {
    this.addToCartButton = Selector('.btn_primary.btn_inventory');
    this.cartIcon = Selector('.shopping_cart_link');
    this.checkoutButton = Selector('.btn_action.checkout_button');
    this.cartItem = Selector('.cart_item');
  }

  async selectItems() {
    await t.click(this.addToCartButton);
    await t.click(this.addToCartButton);
  }

  async goToCheckout() {
    await t.click(this.cartIcon);
    await t.click(this.checkoutButton);
  }

  async isItemInCart(itemName: string) {
    const itemInCart = await this.cartItem.withText(itemName).exists;
    return itemInCart;
  }
}

