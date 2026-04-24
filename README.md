# UI Automation - Playwright (TypeScript)

This project automates the Demo Web Shop scenario:

- Place order with multiple products
- Validate cart line-item price calculations (`unit price x qty = subtotal`)
- Validate cart subtotal equals the sum of product subtotals

The framework follows Page Object Model (POM), reads test input from external JSON, and publishes both Playwright HTML and Allure reports.

## Tech Stack

- Playwright + TypeScript
- POM design (`pages/`)
- External test data (`test-data/order-data.json`)
- Reports: Playwright HTML + Allure

## Project Structure

- `tests/` -> test specs
- `pages/` -> page object classes
- `utils/` -> helpers and types
- `test-data/` -> external test data files

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

1. Clone repository
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Create environment file:

```bash
copy .env.example .env
```

## Environment Variables

- `BASE_URL` (required) -> target application URL
- `HEADLESS` (optional) -> `true` or `false`
- `DEMO_USER_PASSWORD` (optional) -> test password override for registration flow

No personal account or API keys are stored in the codebase.

## Run Tests

```bash
npm test
```

Run with headed browser:

```bash
npm run test:headed
```

## Reports

Playwright HTML report:

```bash
npm run report:html
```

Allure report:

```bash
npm run report:allure
```

## Notes

- The script creates a unique user email on each run (`mailinator.com`) to avoid account collision.
- Test data is maintained in `test-data/order-data.json` and can be modified without touching test code.
