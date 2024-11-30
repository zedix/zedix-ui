import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './product-sticky-bar';
import '../skeleton/skeleton';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-product-sticky-bar',

  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    story: {
      //height: '500px',
    },
  },
};

const addToCartButton = html`
  <button
    type="button"
    class="border border-gray-950 bg-gray-900 text-white rounded text-sm px-3 py-2 hover:shadow"
  >
    Ajouter au panier - 42 €
  </button>
`;

export const PlacementStart: Story = {
  render: () => html`
    <div class="relative">
      <div class="sticky top-0 z-10">
        <header class="relative z-20 bg-white p-4 border-b">Header</header>

        <zx-product-sticky-bar placement="start" target-selector="product-main">
          <div class="flex items-center justify-end gap-8 p-4 bg-white border-b">
            <span class="font-semibold text-sm">Magic Mouse</span>
            ${addToCartButton}
          </div>
        </zx-product-sticky-bar>
      </div>

      <div class="grid gap-8">
        ${repeat(
          Array.from({ length: 6 }),
          () => html`
            <zx-skeleton
              class="product-main"
              shape="rect"
              height="400"
              style="width: 100%"
            ></zx-skeleton>
          `,
        )}
      </div>
    </div>
  `,
};

export const PlacementEnd: Story = {
  render: () => html`
    <div class="relative">
      <div class="sticky top-0 z-10">
        <header class="relative z-20 bg-white p-4 border-b">Header</header>

        <zx-product-sticky-bar placement="end" target-selector="product-main">
          <div class="flex items-center justify-end gap-8 p-4 bg-white border-t">
            <span class="font-semibold text-sm">Magic Mouse</span>
            ${addToCartButton}
          </div>
        </zx-product-sticky-bar>
      </div>

      <div class="grid gap-8">
        ${repeat(
          Array.from({ length: 6 }),
          () => html`
            <zx-skeleton
              class="product-main"
              shape="rect"
              height="400"
              style="width: 100%"
            ></zx-skeleton>
          `,
        )}
      </div>
    </div>
  `,
};

export default meta;
