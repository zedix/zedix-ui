# @zedix/zedix-ui

![version](https://img.shields.io/github/package-json/v/zedix/zedix-ui.svg?maxAge=60)
[![lit](https://img.shields.io/badge/lib-lit-blue.svg?maxAge=60)](https://github.com/lit/lit/)
[![Run tests](https://github.com/zedix/zedix-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/zedix/zedix-ui/actions/workflows/ci.yml)

`@zedix/zedix-ui` is a library of essential web components ([lit-based](https://github.com/lit/lit/)) serving as a foundation for web apps or design systems.

The UI kit provides atoms such as:

- `autocomplete`
- `details`
- `dialog`
- `drawer`
- `popover`
- `skeleton`
- `spinner`
- `tooltip`
- …

## Demo

[Demo ↗](https://zedix-ui-storybook.netlify.app)

<div style="display: flex; gap: 1rem; align-teims: center">
  <img height="260" src="https://github.com/zedix/zedix-ui/assets/27975/6594152a-7713-4f16-9693-daa45e478c70" />
  <img height="260" src="https://github.com/zedix/zedix-ui/assets/27975/62ae6196-26a0-47f0-9d09-58437e95798a" />
</div>

## Installation

```
❯ yarn add @zedix/zedix-ui
```

## Usage

Tooltip example:

```js
<script type="module">
import '@zedix/zedix-ui/dist/components/tooltip/tooltip.js';
<script>

<button id="btn-close" type="button">✗<button>

<zx-tooltip
  for="btn-close"
  class="px-3 py-2"
  placement="bottom"
  trigger="focus hover"
  hide-delay="150"
>
  Close
</zx-tooltip>
```
