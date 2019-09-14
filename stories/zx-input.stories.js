import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
} from '@open-wc/demoing-storybook';

import { ZxInput } from '../src/index.js';

storiesOf('Forms/zx-input', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxInput, {
      template: html`
        <zx-input class="mr-4" name="first_name" placeholder="First name">First name</zx-input>
      `,
      overrides: el => [
        {
          key: 'disabled',
          fn: () => boolean('disabled', el.disabled, 'Element'),
        },
      ],
    }),
  );
