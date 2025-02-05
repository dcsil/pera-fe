## Linting

The linter is run when you run `npm run build`. Build will fail if there are any lint errors.

For VSCode, install the ESLint plugin.

## Style

This repo uses ESLint Stylistic for style linting and formatting. To enable ESLint as a formatter, add the following to your `settings.json`:

```json
{
    "eslint.format.enable": true,
}
```

You can also [turn on autoformat on save](https://eslint.style/guide/faq#how-to-auto-format-on-save).