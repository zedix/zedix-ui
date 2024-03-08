import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './spinner';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-spinner',
  argTypes: {
    type: {
      control: 'select',
      options: ['beat', 'square', 'circle'],
    },
    size: {
      control: {
        type: 'range',
        min: 1,
        max: 64,
        step: 1,
      },
    },
  },
  args: {
    type: 'beat',
  },
};

export const Sandbox: Story = {
  args: {
    size: 6,
  },
  render: args =>
    html`<zx-spinner class="text-xxx" type="${args.type}" size="${args.size}"></zx-spinner>`,
};

export const Showcase = () => `
  <div>
    <zx-spinner class="block mb-8" type="square" size="8"></zx-spinner>
    <zx-spinner class="block mb-8" type="beat" size="8"></zx-spinner>
    <zx-spinner class="block mb-8" type="circle" size="20"></zx-spinner>
  </div>
`;

export default meta;
