import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './input-stepper.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Form/zx-input-stepper',
  argTypes: {
    min: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
    max: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
  },
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
};

export const Sandbox: Story = {
  args: {
    disabled: false,
    min: 1,
    max: 100,
    step: 1,
  },
  render: args => html`
    <zx-input-stepper
      @change="${args.onChange}"
      .disabled="${args.disabled}"
      min="${args.min}"
      max="${args.max}"
      step="${args.step}"
    ></zx-input-stepper>
  `,
};

export default meta;
