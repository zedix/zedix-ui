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
        display: block;
        --slide-size: calc(100% / 3);
        --slide-gap: 1rem;
      }
    </style>
    <zx-carousel drag-free>
      ${repeat(
        Array.from({ length: 10 }),
        (_, index) => html`
          <zx-carousel-item>
            <div class="grid place-items-center text-2xl bg-gray-300" style="height: 200px;">
              ${index + 1}
            </div>
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <style>
      zx-carousel.gallery {
        display: block;
        width: 400px;
        --slide-size: 100%;
        --slide-gap: 0;
      }
      zx-carousel.gallery::part(button-prev) {
        left: -24px;
      }
      zx-carousel.gallery::part(button-next) {
        right: -24px;
      }
    </style>
    <div class="p-8">
      <zx-carousel class="gallery" single>
        ${repeat(
          Array.from({ length: 3 }),
          (_, index) => html`
            <zx-carousel-item>
              <img
                class="object-cover"
                src="https://picsum.photos/id/${index + 10}/1200/700"
                width="400"
                height="400"
                style="height: 400px; max-width: none"
              />
            </zx-carousel-item>
          `,
        )}
      </zx-carousel>
    </div>
  `,
};

export const WithBreakpoints: Story = {
  render: () => html`
    <style>
      zx-carousel.related {
        display: block;
        --slide-size: 80%;
        --slide-gap: 1rem;
        --button-border-color: #d3c9c9;
        height: 400px;
      }

      @media (min-width: 768px) {
        zx-carousel.related {
          --slide-size: 33%;
          --slide-gap: 1rem;
        }
      }

      zx-carousel.gallery::part(button-prev) {
        left: -24px;
      }
      zx-carousel.gallery::part(button-next) {
        right: -24px;
      }
    </style>
    <zx-carousel class="related" breakpoints='{"(min-width: 768px)": { "active": false }}'>
      ${repeat(
        Array.from({ length: 3 }),
        (_, index) => html`
          <zx-carousel-item>
            <img
              class="object-cover"
              src="https://picsum.photos/id/${index + 17}/1200/700"
              width="400"
              height="400"
              style="height: 400px"
            />
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export const WithDots: Story = {
  render: () => html`
    <zx-carousel single with-dots>
      ${repeat(
        Array.from({ length: 3 }),
        (_, index) => html`
          <zx-carousel-item>
            <img
              class="object-cover"
              src="https://picsum.photos/id/${index + 17}/1200/700"
              height="400"
            />
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export default meta;
