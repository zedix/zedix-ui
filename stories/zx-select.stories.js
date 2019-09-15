import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
  object,
} from '@open-wc/demoing-storybook';

import { ZxSelect } from '../src/index.js';

const options = JSON.stringify([
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]);

storiesOf('Forms/zx-select', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxSelect, {
      template: html`
        <zx-select name="sex" value="female" emptyOption="___" options=${options} />
      `,
      overrides: el => [
        {
          key: 'options',
          fn: () => object('options', el.options, 'Element'),
        },
        {
          key: 'disabled',
          fn: () => boolean('disabled', el.disabled, 'Element'),
        },
      ],
    }),
  );
