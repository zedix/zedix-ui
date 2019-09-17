// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  withKnobs,
  withClassPropertiesKnobs,
  action,
  color,
  object,
  select,
} from '@open-wc/demoing-storybook';

import { ZxRating } from './zx-rating.js';

const labels = '["Very Poor", "Poor", "Satisfactory", "Good", "Excellent"]';

storiesOf('Core/zx-rating', module)
  .addDecorator(withKnobs)
  .add('Sandbox', () =>
    withClassPropertiesKnobs(ZxRating, {
      template: html`
        <zx-rating name="rating" value="3.5" @change="${action('change')}" labels="${labels}" />
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
        {
          key: 'labels',
          fn: () => object('labels', el.labels, 'Element'),
        },
      ],
    }),
  )
  .add(
    'Showcase',
    () => html`
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 1</label>
        <zx-rating name="rating" labels="${labels}" value="3" shape="1" editMode />
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 2</label>
        <zx-rating name="rating" labels="${labels}" shape="2" editMode>
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 3</label>
        <zx-rating name="rating" labels="${labels}" shape="3" editMode />
      </p>
    `,
  );
