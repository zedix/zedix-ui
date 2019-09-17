// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  number,
  select,
} from '@open-wc/demoing-storybook';

import { ZxSpinner } from './zx-spinner.js';

storiesOf('Core/zx-spinner', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxSpinner, {
      template: html`
        <zx-spinner class="text-xxx" />
      `,
      overrides: el => [
        {
          key: 'type',
          fn: () => select('type', ['beat', 'square', 'circle'], el.type, 'Element'),
        },
        {
          key: 'size',
          fn: () => number('size', el.size, { range: true, min: 1, max: 64, step: 1 }, 'Element'),
        },
      ],
    }),
  );
