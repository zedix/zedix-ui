import { html } from 'lit-html';
import './zx-checkbox.js';

export default {
  title: 'Core/zx-checkbox',
  onChange: { action: 'change' },
};

const Template = args => html`
  <zx-checkbox
    @change="${args.onChange}"
    name="${args.name}"
    value="${args.value}"
    .checked="${args.checked}"
    .indeterminate="${args.indeterminate}"
    .disabled="${args.disabled}"
  >
    Remember me
  </zx-checkbox>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: 'remember_me',
  value: '1',
  checked: false,
  disabled: false,
  indeterminate: false,
};
