import { Selector } from 'testcafe';
import faker from 'faker';
import LoginPage from './pages/LoginPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

const baseUrl = 'https://www.saucedemo.com';

fixture('Sauce Demo')
  .page(baseUrl)
  .beforeEach(async t => {
    const loginPage = new LoginPage();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
  });

test('Add items to cart and checkout', async t => {
  const shoppingCartPage = new ShoppingCartPage();

  // Check price of Fleece Jacket
  const price = Selector('.inventory_item_price').withText('$49.99');
  await t.expect(price.exists).ok();

  // Add items to cart
  await shoppingCartPage.selectItems();

  // Verify items in cart
    const item1InCart = await shoppingCartPage.isItemInCart('Sauce Labs Backpack');
    const item2InCart = await shoppingCartPage.isItemInCart('Sauce Labs Bolt T-Shirt');

    await t.expect(item1InCart).ok();
    await t.expect(item2InCart).ok();

  // Go to checkout
     await shoppingCartPage.goToCheckout();

  // Fill out checkout information
    const firstNameInput = Selector('#first-name');
    const lastNameInput = Selector('#last-name');
     const zipInput = Selector('#postal-code');
     const continueButton = Selector('.btn_primary.cart_button');

    await t.typeText(firstNameInput, faker.name.firstName())
            .typeText(lastNameInput, faker.name.lastName())
            .typeText(zipInput, faker.address.zipCode())
            .click(continueButton);

  // Complete checkout
        const finishButton = Selector('.btn_action.cart_button');
        await t.click(finishButton);

  // Verify checkout complete
        const completeHeader = Selector('.complete-header').withText('THANK YOU FOR YOUR ORDER');
        await t.expect(completeHeader.exists).ok();
        });
