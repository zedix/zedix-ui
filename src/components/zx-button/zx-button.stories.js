// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  withKnobs,
  // withWebComponentsKnobs,
  action,
  boolean,
  text,
  select,
} from '@open-wc/demoing-storybook';

import './zx-button.js';

/*
export default {
  title: 'Core/zx-button',
  component: 'zx-button',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};

export const singleComponent = () => html`
  <zx-button>
    Sign in
  </zx-button>
`;
*/

storiesOf('Core/zx-button', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () =>
      html`
        <zx-button
          @click="${action('click')}"
          href="${text('href', '')}"
          name="${text('name', '')}"
          type="${select('type', ['button', 'submit'])}"
          variant="${select('variant', ['primary', 'secondary', 'outline-primary'], 'primary')}"
          size="${select('size', ['small', 'medium', 'large'], 'medium')}"
          .disabled="${boolean('disabled')}"
          .loading="${boolean('loading')}"
          .block="${boolean('block')}"
          .fake="${boolean('fake')}"
        >
          Sign in
        </zx-button>
      `,
  )
  .add(
    'Showcase',
    () => html`
      <h2 class="mb-2">Primary</h2>
      <div class="mb-4">
        <zx-button variant="primary" size="large">Previous</zx-button>
        <zx-button variant="primary" size="medium">Previous</zx-button>
        <zx-button variant="primary" size="small">Previous</zx-button>
      </div>

      <h2 class="mb-2">Outline Primary</h2>
      <div class="mb-4">
        <zx-button variant="outline-primary" size="large">Previous</zx-button>
        <zx-button variant="outline-primary" size="medium">Previous</zx-button>
        <zx-button variant="outline-primary" size="small">Previous</zx-button>
      </div>

      <h2 class="mb-2">Secondary</h2>
      <div class="mb-4">
        <zx-button variant="secondary" size="large">Previous</zx-button>
        <zx-button variant="secondary" size="medium">Previous</zx-button>
        <zx-button variant="secondary" size="small">Previous</zx-button>
      </div>

      <h2 class="mb-2">Link</h2>
      <div class="mb-4">
        <zx-button href="https://pika.dev">Visit Pika.dev</zx-button>
      </div>
    `,
  );
