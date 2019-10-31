// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, html, action, withKnobs, boolean, text } from '@open-wc/demoing-storybook';

import './zx-checkbox.js';

storiesOf('Forms/zx-checkbox', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () =>
      html`
        <zx-checkbox
          @change="${action('change')}"
          name="${text('name', 'remember_me')}"
          value="${text('value', '1')}"
          .checked="${boolean('checked')}"
          .indeterminate="${boolean('indeterminate')}"
          .disabled="${boolean('disabled')}"
        >
          Remember me
        </zx-checkbox>
      `,
  );
