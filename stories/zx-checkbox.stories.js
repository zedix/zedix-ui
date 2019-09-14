import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
} from '@open-wc/demoing-storybook';

import { ZxCheckbox } from '../src/index.js';

storiesOf('Forms/zx-checkbox', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxCheckbox, {
      template: html`
        <zx-checkbox name="remember_me" value="1">Remember me</zx-checkbox>
      `,
      overrides: el => [
        {
          key: 'disabled',
          fn: () => boolean('disabled', el.disabled, 'Element'),
        },
      ],
    }),
  );
