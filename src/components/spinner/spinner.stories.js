import { html } from 'lit-html';
import './spinner.js';

export default {
  title: 'Core/zx-spinner',
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['beat', 'square', 'circle'],
      },
      defaultValue: 'beat',
    },
    size: {
      control: { type: 'range', min: 1, max: 64, step: 1 },
    },
  },
};

const Template = args => html`
  <zx-spinner class="text-xxx" type="${args.type}" size="${args.size}"></zx-spinner>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  size: 6,
};

export const Showcase = () => `
  <div>
    <zx-spinner class="block mb-8" type="square" size="8"></zx-spinner>
    <zx-spinner class="block mb-8" type="beat" size="8"></zx-spinner>
    <zx-spinner class="block mb-8" type="circle" size="20"></zx-spinner>
  </div>
`;
