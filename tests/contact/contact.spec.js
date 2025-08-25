import { expect, test } from "@playwright/test";
import { ContactPage } from "../../pageObjects/contact.po.js";
import { LoginPage } from "../../pageObjects/login.po.js";
import { request } from "http";
const testData = require("../../fixtures/contactFixtures.json");
const contactTestData = require('../../fixtures/contactFixtures.json');
const { authenticateUser, createEntity,deleteEntity, validateEntity, getEntity } = require('../../utils/helper.spec.js')

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login("nikitamanandhar8@gmail.com", "zxcvbnm");
  await login.verifyValidLogin();
});

test.describe("Valid contact tests", () => {
  test("Valid Contact", async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.addContact(
      testData.validContact.FirstName,
      testData.validContact.LastName,
      testData.validContact.DateofBirth,
      testData.validContact.Email,
      testData.validContact.Phone,
      testData.validContact.StreetAddress1,
      testData.validContact.StreetAddress2,
      testData.validContact.City,
      testData.validContact.StateofProvience,
      testData.validContact.postalCode,
      testData.validContact.Country
    );

    await contact.verifyValidContact();
  });

  test('Contact Edit test', async ({ page, request }) => {
    const Data = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1990-06-30",
      "email": "johndoe@gmail.com",
      "phone": "1234567890",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.validUser.username, testData.validUser.password, { request });
    await createEntity(Data, accessToken, '/contacts', { request });
    page.reload();
    await contact.viewContact();
    await contact.contactEdit(contactTestData.contactEdit.firstName);
    await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact.lastName, contact)
  })

  test.only('Contact Delete test', async ({ page, request }) => {
    const Data = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1990-06-30",
      "email": "johndoe@gmail.com",
      "phone": "1234567890",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.validUser.username, testData.validUser.password, { request });
    await createEntity(Data, accessToken, '/contacts', { request });
    page.reload();
    await contact.viewContact();
    const id = await getEntity(accessToken, '/contacts', '200', { request });
    await contact.contactDelete();
    await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
  })
})

test.afterEach(async ({ page }) => {
  await page.close();
})
