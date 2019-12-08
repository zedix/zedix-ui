// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs, action, boolean, text } from '@open-wc/demoing-storybook';

import './zx-radio.js';

export default {
  title: 'Core/zx-radio',
  component: 'zx-radio',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
};

export const Sandbox = () => html`
<zx-radio
  @change="${action('change')}"
  name="${text('name', 'choice')}"
  value="${text('value', 'one')}"
  .checked="${boolean('checked')}"
  .disabled="${boolean('disabled')}"
>
  Choice One
</zx-checkbox>
`;
