import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
} from '@open-wc/demoing-storybook';

import { ZxRadio } from '../src/index.js';

storiesOf('Forms/zx-radio', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxRadio, {
      template: html`
        <zx-radio class="mr-4" name="choice" value="one">Choice One</zx-radio>
      `,
      overrides: el => [
        {
          key: 'checked',
          fn: () => boolean('checked', el.checked, 'Element'),
        },
      ],
    }),
  );
