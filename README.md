# @zedix/zedix-ui

![version](https://img.shields.io/github/package-json/v/zedix/zedix-ui.svg?maxAge=60)
![tag](https://img.shields.io/github/tag/zedix/zedix-ui.svg?maxAge=60)

@zedix's web components UI library built with [lit-element](https://github.com/Polymer/lit-element) and following the [open-wc](https://github.com/open-wc/open-wc) recommendations.

## Demo

https://peaceful-swanson-26f657.netlify.com/

## Installation

```
$ yarn add zedix/zedix-ui.git#v1.x.x
```

## Usage

```html
<script>
import 'zedix-ui/components/button';
</script>

<template>
  <zx-button variant="primary" size="medium">Sign in</zx-button>
</template>

<style>
zx-button {
  --button-primary-background-color: #xxx;
  --button-primary-background-color-hover: #xxx;
  --button-border-radius: 4px;
}
</style>
```
