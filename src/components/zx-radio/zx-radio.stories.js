import { html } from 'lit-html';
import './zx-radio.js';

export default {
  title: 'Core/zx-radio',
  onChange: { action: 'change' },
};

const Template = args => html`
  <zx-radio
    @change="${args.onChange}"
    name="${args.name}"
    value="${args.value}"
    .checked="${args.checked}"
    .disabled="${args.disabled}"
  >
    Choice One
  </zx-radio>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: 'choice',
  value: 'one',
  disabled: false,
  checked: false,
};
