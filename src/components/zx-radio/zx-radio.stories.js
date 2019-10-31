// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, html, withKnobs, action, boolean, text } from '@open-wc/demoing-storybook';

import './zx-radio.js';

storiesOf('Forms/zx-radio', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () =>
      html`
        <zx-radio
          @change="${action('change')}"
          name="${text('name', 'choice')}"
          value="${text('value', 'one')}"
          .checked="${boolean('checked')}"
          .disabled="${boolean('disabled')}"
        >
          Choice One
        </zx-checkbox>
      `,
  );
