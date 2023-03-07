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
    distance: 16,
    placement: 'top',
    trigger: 'hover',
  },
  render: args => html`
    <div class="grid place-items-center w-screen h-screen">
      <div class="relative h-[20rem] w-[20rem]">
        ${[
          {
            placement: 'top-start',
            style: 'left:calc(50% - 70px - 1rem);top:0',
          },
          {
            placement: 'top',
            style: 'left:calc(50% - 10px - 1rem);top:0',
          },
          {
            placement: 'top-end',
            style: 'left:calc(50% + 50px - 1rem);top:0',
          },
          {
            placement: 'bottom-start',
            style: 'left:calc(50% - 70px - 1rem);bottom:0',
          },
          {
            placement: 'bottom',
            style: 'left:calc(50% - 10px - 1rem);bottom:0',
          },
          {
            placement: 'bottom-end',
            style: 'left:calc(50% + 50px - 1rem);bottom:0',
          },
          {
            placement: 'right',
            style: 'top:calc(50% - 10px - 1rem);right:min(50px, 5%)',
          },
          {
            placement: 'right-start',
            style: 'top:calc(50% - 70px - 1rem);right:min(50px, 5%)',
          },
          {
            placement: 'right-end',
            style: 'top:calc(50% + 50px - 1rem);right:min(50px, 5%)',
          },
          {
            placement: 'left',
            style: 'top:calc(50% - 10px - 1rem);left:min(50px, 5%)',
          },
          {
            placement: 'left-start',
            style: 'top:calc(50% - 70px - 1rem);left:min(50px, 5%)',
          },
          {
            placement: 'left-end',
            style: 'top:calc(50% + 50px - 1rem);left:min(50px, 5%)',
          },
        ].map(
          item => html`<div>
            <button
              id="${item.placement}"
              class="absolute p-4 transition w-5 h-5 rounded border-2 border-gray-900 hover:border-blue-600 hover:bg-blue-200"
              style="${item.style}"
              aria-label="${item.placement}"
            ></button>
            <zx-tooltip
              for="${item.placement}"
              placement="${item.placement}"
              distance="${args.distance}"
              trigger="${args.trigger}"
              .noArrow="${args.noArrow}"
            >
              Tooltip ${item.placement}
            </zx-tooltip>
          </div>`,
        )}
      </div>
    </div>
  `,
};

export const Showcase: Story = {
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

export default meta;
