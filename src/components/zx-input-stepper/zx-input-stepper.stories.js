// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs, boolean, number } from '@open-wc/demoing-storybook';

import './zx-input-stepper.js';

export default {
  title: 'Core/zx-input-stepper',
  component: 'zx-input-stepper',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
  // parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};

export const Sandbox = () => html` <zx-input-stepper
  .disabled="${boolean('disabled')}"
  min="${number('min', 1, { range: true, min: 1, max: 100, step: 1 })}"
  max="${number('max', 100, { range: true, min: 1, max: 100, step: 1 })}"
  step="${number('step', 1, { range: true, min: 1, max: 100, step: 1 })}"
></zx-input-stepper>`;
