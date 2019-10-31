// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  action,
  withKnobs,
  boolean,
  text,
  object,
} from '@open-wc/demoing-storybook';

import './zx-select.js';

const options = [{ label: 'Female', value: 'female' }, { label: 'Male', value: 'male' }];

storiesOf('Forms/zx-select', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () =>
      html`
        <zx-select
          @change="${action('change')}"
          name="${text('name', 'sex')}"
          value="${text('value', 'female')}"
          emptyOption="${text('emptyOption', '___')}"
          .options=${object('options', options)}
          .disabled="${boolean('disabled')}"
        />
      `,
  );
