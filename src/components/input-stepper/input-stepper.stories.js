import { html } from 'lit';
import './input-stepper.js';

export default {
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
  onChange: { action: 'change' },
};

const Template = args => html`
  <zx-input-stepper
    @change="${args.onChange}"
    .disabled="${args.disabled}"
    min="${args.min}"
    max="${args.max}"
    step="${args.step}"
  ></zx-input-stepper>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  disabled: false,
  min: 1,
  max: 100,
  step: 1,
};
