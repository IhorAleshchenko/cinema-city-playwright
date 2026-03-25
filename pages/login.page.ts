import { Locator, Page } from "@playwright/test";
import { Header } from "./header.component";
import { loginData } from "../test-data/login.data";

export class LoginPage{
 readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  //readonly logoutButton: Locator;
  readonly loginConfirmation: Locator;
  readonly wrongCredentialsAlert: Locator;

  constructor(private page : Page){
    this.userNameInput =  page.getByRole('textbox', { name: 'E-mail' }).first();
    this.passwordInput = page.getByRole('textbox', { name: 'Hasło' }).first();
    this.loginButton = page.getByRole('button', { name: 'Logowanie' }); 
    this.loginConfirmation = page.getByRole('link', { name: 'Moje konto' })
    this.wrongCredentialsAlert = page.locator('.flash-alert.alert-danger');
    this.tooManyTimesLoggedInSkipButton = page.locator('text=Weiter'); 
    //this.logoutButton = page.getByRole('button', { name: 'Anmelden', exact: true });

  }

  async logIn(): Promise <void>{
    const header = new Header(this.page)
      await header.logInButton.click();
      await this.page.pause();
      await this.userNameInput.fill(loginData.userId);
      await this.passwordInput.fill(loginData.userPassword);
      await this.loginButton.click();
  }


}