/* eslint-disable lit/no-invalid-html */
// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs, number, select } from '@open-wc/demoing-storybook';

import './zx-spinner.js';

export default {
  title: 'Core/zx-spinner',
  component: 'zx-spinner',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
};

export const Sandbox = () => html`
  <zx-spinner
    class="text-xxx"
    type="${select('type', ['beat', 'square', 'circle'])}"
    size="${number('size', 6, { range: true, min: 1, max: 64, step: 1 })}"
  />
`;
