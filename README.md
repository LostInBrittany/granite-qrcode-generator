[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/LostInBrittanygranite-qrcode-generator)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/LostInBrittanygranite-qrcode-generator.svg)](https://vaadin.com/directory/component/LostInBrittanygranite-qrcode-generator)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/LostInBrittany/granite-qrcode-generator)

# \<granite-qrcode-generator>

A custom element to generate and render a QR Codes, using [qr.js](https://github.com/lifthrasiir/qr.js) library

Built on [lit-element](https://github.com/Polymer/lit-element) following the [open-wc](https://github.com/open-wc/open-wc) recommendation.

> The old Polymer 2.x-1.x version is available on the [`polymer-hybrid` branch](https://github.com/LostInBrittany/granite-qrcode-generator/tree/polymer-hybrid).

## Installation
```bash
npm i granite-qrcode-generator
```

## Usage
```html
<script type="module">
  import 'granite-qrcode-generator/granite-qrcode-generator.js';
</script>

<granite-qrcode-generator 
    data="https://github.com/lostinbrittany/granite-elements"
    mode="alphanumeric"
    auto></granite-qrcode-generator>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`




## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)