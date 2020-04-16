```js script
import { html } from '@open-wc/demoing-storybook';
import '../granite-qrcode-generator.js';

export default {
  title: 'GraniteQrcodeGenerator',
  component: 'granite-qrcode-generator',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# GraniteQrcodeGenerator

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add granite-qrcode-generator
```

```js
import 'granite-qrcode-generator/granite-qrcode-generator.js';
```

```js preview-story
export const Simple = () => html`
  <granite-qrcode-generator></granite-qrcode-generator>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <granite-qrcode-generator title="Hello World"></granite-qrcode-generator>
`;
```
