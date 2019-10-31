// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, html, withKnobs, number, select } from '@open-wc/demoing-storybook';

import './zx-spinner.js';

storiesOf('Core/zx-spinner', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () =>
      html`
        <zx-spinner
          class="text-xxx"
          type="${select('type', ['beat', 'square', 'circle'])}"
          size="${number('size', 6, { range: true, min: 1, max: 64, step: 1 })}"
        />
      `,
  );
