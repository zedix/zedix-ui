import { html } from 'lit-html';
import './rating.js';

export default {
  title: 'Core/zx-rating',
  argTypes: {
    backgroundColor: { control: 'color' },
    ratingColor: { control: 'color' },
    shape: {
      control: {
        type: 'inline-radio',
        options: ['1', '2', '3'],
      },
      defaultValue: '1',
    },
    size: {
      control: {
        type: 'select',
        options: ['default', 'small', 'xsmall'],
      },
      defaultValue: 'default',
    },
  },
  onChange: { action: 'change' },
};

const labels = ['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent'];

const Template = args => html`
  <zx-rating
    @change="${args.onChange}"
    name="${args.name}"
    value="${args.value}"
    .editMode="${args.editMode}"
    .labels="${args.labels}"
    backgroundColor="${args.backgroundColor}"
    ratingColor="${args.ratingColor}"
    shape="${args.shape}"
    size="${args.size}"
  ></zx-rating>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: 'rating',
  value: '3.5',
  editMode: false,
  backgroundColor: '#DDDDDD',
  ratingColor: 'gold',
  labels,
};

export const Showcase = () => html`
  <p class="flex items-center mb-2">
    <label class="mr-2">Shape 1</label>
    <zx-rating name="rating" .labels="${labels}" value="3" shape="1" editMode></zx-rating>
  </p>
  <p class="flex items-center mb-2">
    <label class="mr-2">Shape 2</label>
    <zx-rating name="rating" .labels="${labels}" shape="2" editMode></zx-rating>
  </p>
  <p class="flex items-center mb-2">
    <label class="mr-2">Shape 3</label>
    <zx-rating name="rating" .labels="${labels}" shape="3" editMode></zx-rating>
  </p>
`;
