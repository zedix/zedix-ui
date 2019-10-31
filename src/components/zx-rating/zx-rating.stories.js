// eslint-disable-next-line import/no-extraneous-dependencies
import {
  storiesOf,
  html,
  withKnobs,
  action,
  boolean,
  color,
  object,
  select,
  text,
} from '@open-wc/demoing-storybook';

import './zx-rating.js';

const labels = ['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent'];

storiesOf('Core/zx-rating', module)
  .addDecorator(withKnobs)
  .add(
    'Sandbox',
    () => html`
      <zx-rating
        @change="${action('change')}"
        name="${text('name', 'rating')}"
        value="${text('value', '3.5')}"
        .editMode="${boolean('editMode')}"
        .labels="${object('labels', labels)}"
        backgroundColor="${color('backgroundColor', '#DDDDDD')}"
        ratingColor="${color('ratingColor', 'gold')}"
        shape="${select('shape', ['1', '2', '3'], '1')}"
        size="${select('size', ['default', 'small', 'xsmall'], 'default')}"
      />
    `,
  )
  .add(
    'Showcase',
    () => html`
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 1</label>
        <zx-rating name="rating" .labels="${labels}" value="3" shape="1" editMode />
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 2</label>
        <zx-rating name="rating" .labels="${labels}" shape="2" editMode>
      </p>
      <p class="flex items-center mb-2">
        <label class="mr-2">Shape 3</label>
        <zx-rating name="rating" .labels="${labels}" shape="3" editMode />
      </p>
    `,
  );
