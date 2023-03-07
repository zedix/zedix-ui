# @zedix/zedix-ui

![version](https://img.shields.io/github/package-json/v/zedix/zedix-ui.svg?maxAge=60)
![lit](https://img.shields.io/badge/lib-lit-blue.svg?maxAge=60)

`@zedix/zedix-ui` is a library of essential web components ([lit-based](https://github.com/lit/lit/)) serving as a foundation for web apps or design systems.

The UI kit provides atoms such as:

- `autocomplete`
- `details`
- `drawer`
- `popover`
- `skeleton`
- `spinner`
- `tooltip`
- …

## Demo

<a href="https://zedix-ui-storybook.netlify.app" target="_blank" style="display: flex; align-items: center; gap: 8px; color: white; font-size: 18px">
  <img src="https://raw.githubusercontent.com/storybookjs/brand/main/icon/icon-storybook-default.svg" height="24">
  Storybook ↗
</a>

## Installation

```
❯ yarn add @zedix/zedix-ui
```

## Usage

Tooltip example:

```html
<script type="module">
import { Tooltip } from '@zedix/zedix-ui';
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
