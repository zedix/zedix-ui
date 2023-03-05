import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tooltip';

type Story = StoryObj;

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const meta: Meta = {
  title: 'Core/zx-tooltip',
  component: 'zx-tooltip',
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
    },
    trigger: {
      control: 'inline-radio',
      options: ['hover', 'click'],
    },
    distance: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      defaultValue: 8,
    },
  },
};

export const Sandbox: Story = {
  args: {
    noArrow: false,
    distance: 8,
    placement: 'top',
    trigger: 'hover',
  },
  render: args => html`
    <div class="p-4 w-screen h-screen flex items-center justify-center">
      <button
        id="tooltip-target"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition-all duration-100"
      >
        Hover me
      </button>
      <zx-tooltip
        for="tooltip-target"
        placement="${args.placement}"
        distance="${args.distance}"
        trigger="${args.trigger}"
        .noArrow="${args.noArrow}"
      >
        ${args.placement}
      </zx-tooltip>
    </div>
  `,
};

export const Showcase = () => html`
  <div class="flex items-center justify-center p-4 w-screen h-screen">
    <div class="grid grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
      ${placements.map(
        placement => html` <div>
          <zx-tooltip for="${placement}" placement="${placement}">
            Tooltip ${placement}
          </zx-tooltip>
          <button
            id="${placement}"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center transition-all duration-100"
          >
            Tooltip ${placement}
          </button>
        </div>`,
      )}
    </div>
  </div>
`;

export default meta;
