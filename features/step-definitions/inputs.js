import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import inputsPage from "../pageobjects/inputs.page.js";

When(/^I enter "(\d+)"$/, async function (num) {
  this.num = String(num); // store as string to match element.getValue() return type
  await inputsPage.set(this.num);
});

Then(/^The input value should be the number I entered$/, async function () {
  await expect(await inputsPage.elements.input()).toHaveValue(this.num);
});
