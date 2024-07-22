import type { Meta, StoryObj } from '@storybook/web-components';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit';
import './carousel';
import '../carousel-item/carousel-item';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-carousel',
  component: 'zx-carousel',
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['top', 'center'],
    },
  },
  parameters: {
    actions: {
      handles: ['select', 'slides-in-view'],
    },
  },
  args: {},
};

export const Showcase: Story = {
  render: () => html`
    <style>
      zx-carousel {
        --slide-size: calc(100% / 3);
        --slide-gap: 1rem;
      }
    </style>
    <zx-carousel>
      ${repeat(
        Array.from({ length: 10 }),
        (_, index) => html`
          <zx-carousel-item>
            <div class="grid place-items-center text-2xl bg-gray-300" style="height: 200px">
              ${index + 1}
            </div>
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

const imageUrl =
  'https://d3rsafrfc4vkx1.cloudfront.net/eyJidWNrZXQiOiJidWxsZWRlbWFtYW4tcHJvZCIsImtleSI6InNob3BcL2pvbGx5LW1hbWFcL2ptX2Nyb3F1YW50aXNzaW1lX2NhcnJlLmpwZyIsImVkaXRzIjp7InJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjpudWxsLCJoZWlnaHQiOjk2MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19';

export const ProductGallery: Story = {
  render: () => html`
    <style>
      zx-carousel.gallery {
        display: block;
        --slide-size: 100%;
        --slide-gap: 0;
        --button-border-color: #d3c9c9;
        width: 400px;
        height: 400px;
      }
      zx-carousel.gallery::part(button-prev) {
        left: -24px;
      }
      zx-carousel.gallery::part(button-next) {
        right: -24px;
      }
    </style>
    <zx-carousel class="gallery mx-8" contain-scroll="keepSnaps">
      ${repeat(
        Array.from({ length: 10 }),
        () => html`
          <zx-carousel-item>
            <img class="object-contain" src="${imageUrl}" height="200" />
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export const RelatedProducts: Story = {
  render: () => html`
    <style>
      zx-carousel.gallery {
        display: block;
        --slide-size: 33%;
        --slide-gap: 1rem;
        --button-border-color: #d3c9c9;
        width: 90%;
        height: 400px;
      }
      zx-carousel.gallery::part(button-prev) {
        left: -24px;
      }
      zx-carousel.gallery::part(button-next) {
        right: -24px;
      }
    </style>
    <zx-carousel class="gallery" breakpoints='{"(min-width: 768px)": { "active": false }}'>
      ${repeat(
        Array.from({ length: 3 }),
        () => html`
          <zx-carousel-item>
            <img class="object-contain" src="${imageUrl}" height="200" />
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export default meta;
