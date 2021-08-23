import { html } from 'lit';
import './popover.js';

export default {
  title: 'Core/zx-popover',
  argTypes: {
    arrow: { control: 'boolean' },
    animation: {
      control: {
        type: 'select',
        options: ['shift-away', 'shift-toward', 'fade', 'scale', 'perspective'],
      },
      defaultValue: 'fade',
    },
    distance: {
      control: {
        type: 'range',
        min: 0,
        max: 50,
        step: 1,
      },
      defaultValue: 10,
    },
    trigger: {
      control: {
        type: 'inline-radio',
        options: ['hover', 'click'],
      },
      defaultValue: 'click',
    },
    placement: {
      control: {
        type: 'select',
        options: ['top-start', 'left-start'],
      },
      defaultValue: 'top-start',
    },
  },
};

const Template = args => html`<button
    id="anchor"
    class="shadow rounded bg-gray-900 text-white text-base px-4 py-2"
  >
    Show all options
  </button>
  <zx-popover
    for="anchor"
    .arrow="${args.arrow}"
    .distance="${args.distance}"
    animation="${args.animation}"
    placement="${args.placement}"
    trigger="${args.trigger}"
  >
    <nav class="bg-white text-primary divide-y">
      <a class="block p-4" href="#">Menu item 1</a>
      <a class="block p-4" href="#">Menu item 2</a>
    </nav>
  </zx-popover>`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  arrow: false,
};
