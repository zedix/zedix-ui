import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  boolean,
  select,
} from '@open-wc/demoing-storybook';

import { ZxButton } from '../src/index.js';

storiesOf('zx-button', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => html`
      <h2>Primary</h2>
      <div>
        <zx-button variant="primary" size="large">Previous</zx-button>
        <zx-button variant="primary" size="medium">Previous</zx-button>
        <zx-button variant="primary" size="small">Previous</zx-button>
      </div>

      <h2>Outline Primary</h2>
      <div>
        <zx-button variant="outline-primary" size="large">Previous</zx-button>
        <zx-button variant="outline-primary" size="medium">Previous</zx-button>
        <zx-button variant="outline-primary" size="small">Previous</zx-button>
      </div>

      <h2>Secondary</h2>
      <div>
        <zx-button variant="secondary" size="large">Previous</zx-button>
        <zx-button variant="secondary" size="medium">Previous</zx-button>
        <zx-button variant="secondary" size="small">Previous</zx-button>
      </div>

      <h2>Link</h2>
      <div>
        <zx-button href="https://pika.dev">Visit Pika.dev</zx-button>
      </div>
    `,
  )
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxButton, {
      template: html`
        <zx-button>button text</zx-button>
      `,
      overrides: el => [
        {
          key: 'disabled',
          fn: () => boolean('disabled', el.disabled, 'Element'),
        },
        {
          key: 'variant',
          fn: () =>
            select('variant', ['primary', 'secondary', 'outline-primary'], el.variant, 'Element'),
        },
        {
          key: 'size',
          fn: () => select('size', ['small', 'medium', 'large'], el.size, 'Element'),
        },
        {
          key: 'type',
          fn: () => select('type', ['button', 'submit'], el.type, 'Element'),
        },
      ],
    }),
  );
