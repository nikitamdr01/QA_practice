const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;
    this.addContact = '//button[@id="add-contact"]';
    this.firstName = "#firstName";
    this.lastName = "#lastName";
    this.dob = '//input[@placeholder="yyyy-MM-dd"]';
    this.email = '//input[@id="email"]';
    this.phone = '//input[@id="phone"]';
    this.address = '//input[@placeholder="Address 1 "]';
    this.city = '//input[@placeholder="City"]';
    this.state = '//input[@placeholder="State or Province"]';
    this.postal = '//input[@placeholder="Postal Code"]';
    this.country = '//input[@placeholder="Country"]';
    this.Save = '//button[@id="Submit"]';
    this.savedFirstName = '//span[@id="firstName"]';
    this.savedLastName = '//span[@id="lastName"]';
    this.savedDOB = '//span[@id="phone"]';
    this.savedAddress = '//span[@id="street1"]';
    this.savedCity = '//span[@id="city"]';
    this.savedState = '//span[@id="stateProvince"]';
    this.savedPostal = '//span[@id="postalCode"]';
    this.savedCountry = '//span[@id="country"]';
    this.viewCreatedContact = '//th[contains(text(),"Name")]//following::1';
    this.editContact = '//button[@id="edit-contact"]';
    this.deleteContact = '//button[@id="delete"]';
  }

  async contactAdd(
    firstName,
    lastName,
    dateOfBirth,
    email,
    phone,
    address,
    city,
    state,
    postal,
    country
  ) {
    await this.page.locator(this.addContact).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.dateOfBirth).fill(dateOfBirth);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.Save).click();
  }

  async verifyAdd(
    fName,
    lName,
    dob,
    email,
    phone,
    address,
    city,
    state,
    postal,
    country
  ) {
    const fNameValidation = await this.page.locator(this.savedFirstName);
    const lNameValidation = await this.page.locator(this.savedLastName);
    const dobValidation = await this.page.locator(this.savedDOB);
    const phoneValidation = await this.page.locator(this.savedPhone);

    await expect(fNameValidation).toHaveText(fName);
    await expect(lNameValidation).toHaveText(lName);
    await expect(dobValidation).toHaveText(dob);
    await expect(phoneValidation).toHaveText(phone);
  }

  async viewContact() {
    await this.page.locator(this.viewCreatedContact).click();
  }
  async contactEdit(firstName) {
    await this.page.locator(this.editContact).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.Save).click();
  }

  async contactDelete(){
    await this.page.waitForTimeout(2000);
    this.page.once('dialog',async dialog=>{
      console.log(`Dialog message:${dialog.message()}`);
      await dialog.accept();      //Use dialog.dismiss() if you want to cancel instead
    });
    await this.page.locator(this.deleteContact).click();
  }
};