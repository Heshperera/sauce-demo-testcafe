import { Selector, t } from 'testcafe';

export default class LoginPage {
  private usernameInput: Selector;
  private passwordInput: Selector;
  private loginButton: Selector;

  constructor() {
    this.usernameInput = Selector('#user-name');
    this.passwordInput = Selector('#password');
    this.loginButton = Selector('.btn_action');
  }

  async login(username: string, password: string) {
    await t.typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.loginButton);
  }
}
