import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import Page from "../pageobjects/page.js";
const index = new Page();

Given(/^I am on the (.+) page$/, async (page) => {
  await index.open(page);
});

Given("I am at the index page", async function () {
  await index.open();
});

When(/^I click the (.+) link$/, async function (page) {
  this.page = page;
  await index.click(page);
});

Then("I should be directed to the selected page", async function () {
  // Assert the URL changed to the expected path — more reliable than checking h3 text,
  // which varies across pages and doesn't reflect the link text.
  const expectedPath = index.paths[this.page];
  await expect(browser).toHaveUrl(expect.stringContaining(expectedPath));
});
