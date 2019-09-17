// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
} from '@open-wc/demoing-storybook';

import { ZxInput } from './zx-input.js';

storiesOf('Forms/zx-input', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxInput, {
      template: html`
        <zx-input name="first_name" placeholder="First name">First name</zx-input>
      `,
      overrides: el => [
        {
          key: 'disabled',
          fn: () => boolean('disabled', el.disabled, 'Element'),
        },
      ],
    }),
  );
