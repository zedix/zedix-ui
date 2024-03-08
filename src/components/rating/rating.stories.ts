import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './rating.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-rating',
  argTypes: {
    backgroundColor: { control: 'color' },
    ratingColor: { control: 'color' },
    shape: {
      control: 'inline-radio',
      options: ['1', '2', '3'],
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'xsmall'],
    },
  },
  args: {
    editMode: false,
    shape: '1',
    size: 'default',
    backgroundColor: '#DDDDDD',
    ratingColor: 'gold',
  },
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
};

const labels = ['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent'];

export const Sandbox: Story = {
  args: {
    name: 'rating',
    value: '3.5',
    labels,
  },
  render: args => html`
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
  `,
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

export default meta;
