import { html } from 'lit-html';
import './zx-input.js';

export default {
  title: 'Core/zx-input',
  onChange: { action: 'change' },
};

const Template = args => html`
  <zx-input
    @change="${args.onChange}"
    name="${args.name}"
    autocomplete="${args.autocomplete}"
    type="${args.type}"
    placeholder="${args.placeholder}"
    rows="${args.rows}"
    .readOnly="${args.readOnly}"
    .disabled="${args.disabled}"
  >
    First name
  </zx-input>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: 'first_name',
  type: 'text',
  autocomplete: 'on',
  placeholder: 'First name',
  readOnly: false,
  disabled: false,
  rows: 0,
};
