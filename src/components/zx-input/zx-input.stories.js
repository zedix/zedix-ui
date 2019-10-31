// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  action,
  withKnobs,
  boolean,
  number,
  text,
} from '@open-wc/demoing-storybook';

import './zx-input.js';

storiesOf('Forms/zx-input', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () => html`
      <zx-input
        @change="${action('change')}"
        name="${text('name', 'first_name')}"
        autocomplete="${text('autocomplete', 'on')}"
        type="${text('type', 'text')}"
        placeholder="${text('placeholder', 'First name')}"
        rows="${number('rows')}"
        .readOnly="${boolean('readOnly')}"
        .disabled="${boolean('disabled')}"
      >
        First name
      </zx-input>
    `,
  );
