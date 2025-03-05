# Pera by LexisLabs

AI-powered pronunciation assessment platform, currently under development.

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing page.

## Testing

To run the tests:

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui --headed

# Run a specific test file
npx playwright test tests/landing.spec.ts

# Run tests in debug mode
npx playwright test --debug
```

Make sure the development server is running with error monitoring enabled (`npm run dev-sentry`) before running tests. All tests will access pages through `http://localhost:3000`.

## Built With

- [Next.js](https://nextjs.org) - React framework
- [Material-UI](https://mui.com) - UI components
- [Sentry](https://sentry.io) - Error monitoring
- [Playwright](https://playwright.dev) - Testing framework

## Contact

For inquiries, reach out to us at teamlexislabs@outlook.com
