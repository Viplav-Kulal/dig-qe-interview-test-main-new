# The internet is broken

We're trying to test https://the-internet.herokuapp.com/ but, it's going horribly. Goodness gracious, barely any tests are green. Please help us by doing the following:

1. Unzip this repo.
2. Create a new GitHub repo.
3. Push this repo in its broken state to your new repo.
4. Fix as much as you can.
5. Make any changes you feel would make this better.
6. Make a PR against the original.
7. Send us the PR link for review.

## Prerequisites

- **Node.js** v20.19.3 or v22.17.1 (recommended — use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **Google Chrome** installed (WebdriverIO uses ChromeDriver under the hood)
- **npm** (comes bundled with Node.js)

## Setup

```bash
# Install the recommended Node version via nvm (if using nvm)
nvm install 20
nvm use 20

# Install dependencies
npm install
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run wdio` | Run all tests with a visible browser window |
| `npm run wdio-headless` | Run all tests headlessly (no browser UI — ideal for CI) |
| `npm run wdio -- --cucumberOpts.tagExpression="@TAG"` | Run a specific tagged test suite |

**Available tags:**

| Tag | Feature |
|-----|---------|
| `@BASIC_AUTH` | Basic authentication via URL credentials |
| `@CHECKBOXES` | Checkbox selection and verification |
| `@DROPDOWN` | Dropdown option selection |
| `@INPUTS` | Number input field behaviour |
| `@LOGIN` | Form login — valid and invalid credentials |
| `@INDEX` | Navigation links from the home page |

**Example — run only login tests:**
```bash
npm run wdio-headless -- --cucumberOpts.tagExpression="@LOGIN"
```

---

## Test Results

All 6 spec files pass with **169 steps passing** across **37 scenarios**. Output from `npm run wdio-headless`:

```
[0-0] PASSED in chrome - features/basic_auth.feature
[0-1] PASSED in chrome - features/checkboxes.feature
[0-2] PASSED in chrome - features/dropdown.feature
[0-4] PASSED in chrome - features/inputs.feature
[0-5] PASSED in chrome - features/login.feature
[0-3] PASSED in chrome - features/index.feature

basic_auth   2 passing
checkboxes   6 passing
dropdown     8 passing
inputs      15 passing
login        6 passing
index      132 passing

Spec Files:  6 passed, 6 total (100% completed) in 00:00:59
```

---

## Fixes Made

The following broken tests were identified and fixed:

### `basic_auth.feature`
- **Page object imports were commented out** — `basic_auth.page.js` had `import { $ }` and `import Page` commented out, causing the page object to silently fail. Imports were restored and the class was made to properly extend `Page`.

### `checkboxes.feature`
- **Checkbox selector was incorrect** — The original selector did not account for `<br>` elements between checkboxes, causing `nth-child` to return the wrong element. Updated to use `nth-of-type` to target only `<input>` elements.
- **Click logic was unconditional** — Clicking an already-checked checkbox would uncheck it. Added an `isSelected()` guard so a checkbox is only clicked if it is not already checked.

### `dropdown.feature`
- **Selected option selector used the HTML `selected` attribute** — The original used `option[selected]` which reflects the initial HTML state, not the current user selection. Updated to use `option:checked` which tracks the live DOM property.

### `inputs.feature`
- **Input selector used a fragile absolute XPath** — Replaced with a semantic CSS selector `input[type='number']` which is resilient to DOM structure changes.
- **Value comparison type mismatch** — `element.getValue()` returns a string, but the test was comparing against a number. The entered value is now explicitly stored as a string to ensure the assertion matches correctly.

### `login.feature`
- **`Given` step was missing** — The `login.js` step definition file was not registering a `Given` step to open the login page. This was handled by moving the shared "I am on the X page" step into `index.js` as a common step available to all features.

### `index.feature`
- **Navigation step was asserting on `h3` text** — Page headings vary across pages and do not reliably match the link text used in the test. Updated to assert on the URL path instead, which is a stable and unambiguous signal.
- **Missing path mappings** — Several pages listed in the index scenario had no corresponding entry in the `paths` map in `page.js`. All 44 links now have path mappings.

---

## Improvements Applied

The following improvements were made beyond fixing broken tests:

| # | What | Where |
|---|------|--------|
| 1 | Tags moved to `Feature:` level for consistency across all feature files | `basic_auth`, `checkboxes`, `login`, `index` feature files |
| 2 | Fixed copy-paste scenario description ("I can log into the secure area" → "I can check and verify checkboxes") | `checkboxes.feature` |
| 3 | Fixed `Scenario Outline:` indentation to be consistently indented under `Feature:` | `login.feature` |
| 4 | Removed dead commented-out imports; class now properly extends `Page` | `basic_auth.page.js` |
| 5 | Updated Babel transpilation target from Node 18 to Node 20 to match the recommended runtime in the README | `babel.config.js` |
| 6 | Set `baseUrl` in WDIO config; page objects now use relative paths instead of hardcoding the full base URL in every file | `wdio.conf.js`, `page.js` |
| 7 | Changed `logLevel` from `"silent"` to `"warn"` so real warnings and errors surface during debugging without excessive noise | `wdio.conf.js` |

---

## Remaining Improvements

The following improvements were identified but not yet applied:

| # | What | Where | Why it matters |
|---|------|--------|----------------|
| 1 | Move `@cucumber/cucumber`, `@cucumber/gherkin`, and `@cucumber/messages` from `dependencies` to `devDependencies` | `package.json` | Test-only tooling should not be included in a production bundle |
| 2 | Remove the `resolutions` field (Yarn-only) — only `overrides` is needed for npm | `package.json` | `resolutions` is silently ignored by npm, making it dead and misleading config |
| 3 | Rename `package.json` `name` field from `nutrien_wiki` to match the actual repo | `package.json` | Leftover from a template — causes confusion if the package is ever published or referenced |
