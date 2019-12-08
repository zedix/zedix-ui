/* eslint-disable lit/no-invalid-html */
// eslint-disable-next-line import/no-extraneous-dependencies
import { html, action, withKnobs, boolean, text, object } from '@open-wc/demoing-storybook';

import './zx-select.js';

export default {
  title: 'Core/zx-select',
  component: 'zx-select',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
};

const options = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
];

export const Sandbox = () => html`
  <zx-select
    @change="${action('change')}"
    name="${text('name', 'sex')}"
    value="${text('value', 'female')}"
    emptyOption="${text('emptyOption', '___')}"
    .options=${object('options', options)}
    .disabled="${boolean('disabled')}"
  />
`;
