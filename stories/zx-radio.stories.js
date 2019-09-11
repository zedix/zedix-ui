import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ZxRadio } from '../src/index.js';

storiesOf('Forms/zx-radio', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxRadio, {
      template: html`
        <div>
          <zx-radio class="mr-4" name="choice" value="one">Choice One</zx-radio>
          <zx-radio class="mr-4" name="choice" value="two">Choice Two</zx-radio>
        </div>
      `,
    }),
  );
