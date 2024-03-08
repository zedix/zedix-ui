import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './popover';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-popover',
  // https://storybook.js.org/docs/7.0/react/essentials/controls#annotation
  argTypes: {
    arrow: { control: 'boolean' },
    animation: {
      control: 'select',
      options: ['fade', 'shift-toward-extreme'],
    },
    distance: {
      control: {
        type: 'range',
        min: 0,
        max: 50,
        step: 1,
      },
    },
    trigger: {
      control: 'inline-radio',
      options: ['hover', 'click'],
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'left-start', 'top-start', 'right-start'],
    },
  },
};

export const Sandbox: Story = {
  args: {
    arrow: false,
    quick: false,
    animation: 'fade',
    placement: 'bottom-start',
    distance: 8,
    trigger: 'click',
  },
  render: args =>
    html`<div class="grid place-items-center w-screen h-screen">
      <button id="anchor" class="shadow rounded bg-gray-900 text-white text-base px-4 py-2">
        Show all options
      </button>
      <zx-popover
        class="bg-white rounded-lg"
        for="anchor"
        .arrow="${args.arrow}"
        .quick="${args.quick}"
        .distance="${args.distance}"
        animation="${args.animation}"
        placement="${args.placement}"
        trigger="${args.trigger}"
      >
        <nav class="text-primary divide-y p-1">
          <a class="block px-4 py-3 hover:bg-gray-50" href="#">Menu item 1</a>
          <a class="block px-4 py-3 hover:bg-gray-50" href="#">Menu item 2</a>
          <a class="block px-4 py-3 hover:bg-gray-50" href="#">Menu item 3</a>
        </nav>
      </zx-popover>
    </div>`,
};

export const MegaMenu: Story = {
  render: () =>
    html`<div class="grid place-items-center h-screen">
      <menu class="flex items-center gap-2">
        <button id="menu1" class="shadow rounded bg-gray-900 text-white text-base px-4 py-2">
          Menu 1
        </button>
        <button id="menu2" class="shadow rounded bg-gray-900 text-white text-base px-4 py-2">
          Menu 2
        </button>
      </menu>

      <zx-popover
        class="bg-white rounded-lg"
        for="menu1"
        animation="shift-toward-extreme"
        trigger="hover"
        full-width
        show-delay="150"
        hide-delay="150"
        style="max-width: none"
        quick
      >
        <div class="grid place-items-center text-primary divide-y p-1 w-full h-40">Content 1</div>
      </zx-popover>
      <zx-popover
        class="bg-white rounded-lg"
        for="menu2"
        animation="shift-toward-extreme"
        trigger="hover"
        full-width
        show-delay="150"
        hide-delay="150"
        style="max-width: none"
        quick
      >
        <div class="grid place-items-center text-primary divide-y p-1 w-full h-40">Content 2</div>
      </zx-popover>
    </div>`,
};

export default meta;
