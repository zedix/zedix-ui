import { html } from 'lit';
import './select.js';

export default {
  title: 'Form/zx-select',
  argTypes: {
    options: { control: 'object' },
  },
  onChange: { action: 'change' },
};

const Template = args => html`
  <zx-select
    @change="${args.onChange}"
    name="${args.name}"
    value="${args.value}"
    emptyOption="${args.emptyOption}"
    .options="${args.options}"
    .disabled="${args.disabled}"
  ></zx-select>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: 'sex',
  value: 'female',
  emptyOption: '___',
  disabled: false,
  checked: false,
  options: [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
  ],
};
