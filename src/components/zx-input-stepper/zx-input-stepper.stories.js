// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs } from '@open-wc/demoing-storybook';

import './zx-input-stepper.js';

export default {
  title: 'Core/zx-input-stepper',
  component: 'zx-input-stepper',
  decorators: [withKnobs /* , withWebComponentsKnobs */],
  // parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};

export const Sandbox = () => html` <zx-input-stepper></zx-input-stepper> `;
