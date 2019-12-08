// eslint-disable-next-line import/no-extraneous-dependencies
import { html, action, withKnobs, boolean, text } from '@open-wc/demoing-storybook';

import './zx-checkbox.js';

export default {
  title: 'Core/zx-checkbox',
  component: 'zx-checkbox',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
};

export const Sandbox = () => html`
  <zx-checkbox
    @change="${action('change')}"
    name="${text('name', 'remember_me')}"
    value="${text('value', '1')}"
    .checked="${boolean('checked')}"
    .indeterminate="${boolean('indeterminate')}"
    .disabled="${boolean('disabled')}"
  >
    Remember me
  </zx-checkbox>
`;
