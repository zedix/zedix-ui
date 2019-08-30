import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ZxButton } from '../src/index.js';

storiesOf('zx-button', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxButton, {
      template: html`
        <zx-button>button text</zx-button>
      `,
    }),
  )
  .add(
    'Link button',
    () => html`
      <zx-button href="https://pika.dev">Visit Pika.dev</zx-button>
    `,
  );
