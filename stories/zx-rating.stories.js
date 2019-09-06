import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  action,
  color,
  select,
} from '@open-wc/demoing-storybook';

import { ZxRating } from '../src/index.js';

storiesOf('zx-rating', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxRating, {
      template: html`
        <zx-rating name="rating" value="3.5" @change="${action('change')}" />
      `,
      overrides: el => [
        {
          key: 'backgroundColor',
          fn: () => color('backgroundColor', el.backgroundColor, 'Element'),
        },
        { key: 'ratingColor', fn: () => color('ratingColor', el.ratingColor, 'Element') },
        {
          key: 'shape',
          fn: () => select('shape', ['1', '2', '3'], el.shape, 'Element'),
        },
        {
          key: 'size',
          fn: () => select('size', ['default', 'small', 'xsmall'], el.size, 'Element'),
        },
      ],
    }),
  )
  .add(
    'Showcase',
    () => html`
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 1</label><zx-rating name="rating" value="3.5" shape="1" />
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 2</label><zx-rating name="rating" value="3.5" shape="2" />
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 3</label><zx-rating name="rating" value="3.5" shape="3" />
      </p>
    `,
  );
