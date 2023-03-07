# @zedix/zedix-ui

![version](https://img.shields.io/github/package-json/v/zedix/zedix-ui.svg?maxAge=60)
![tag](https://img.shields.io/github/tag/zedix/zedix-ui.svg?maxAge=60)
![lit](https://img.shields.io/badge/lib-lit-blue.svg?maxAge=60)

@zedix's web components UI library built with [lit](https://github.com/lit/lit/).

## Demo

https://zedix-ui-storybook.netlify.app

## Installation

```
$ yarn add @zedix/zedix-ui@0.5.0
```

## Usage

```js
// app.js
import 'zedix-ui/src/components/zx-button';
```

```html
<!doctype html>
<html>
<head>
  <!-- webcomponents polyfills loader for Edge < 79 -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js">script>

  <style>
  zx-button {
    --button-primary-background-color: #xxx;
    --button-primary-background-color-hover: #xxx;
    --button-border-radius: 4px;
  }
  </style>
</head>
<body>
  <script src="/js/app.js"></script>
  <zx-button variant="primary" size="medium">Sign in</zx-button>
</body>
</html>
```
