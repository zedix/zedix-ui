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
  args: {},
};

export const Showcase: Story = {
  render: () => html`
    <style>
      @media (min-width: 750px) {
        zx-carousel {
          --slide-size: 30%;
          --slide-spacing: 1.6rem;
        }
      }

      @media (min-width: 1200px) {
        zx-carousel {
          --slide-size: calc(100% / 3);
          --slide-spacing: 2rem;
        }
      }
    </style>
    <zx-carousel>
      ${repeat(
        Array.from({ length: 10 }),
        (_, index) => html`
          <zx-carousel-item>
            <div
              class="grid place-items-center text-2xl bg-gray-300"
              style="width: 400px; height: 200px"
            >
              ${index + 1}
            </div>
          </zx-carousel-item>
        `,
      )}
    </zx-carousel>
  `,
};

export default meta;
