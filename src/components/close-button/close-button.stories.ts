import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './close-button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-close-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['square', 'circle'],
    },
  },
  args: {
    variant: 'square',
  },
};

export const Sandbox: Story = {
  render: args => html`<zx-close-button variant="${args.variant}"></zx-close-button>`,
};

export const Showcase = () => `
  <div class="grid gap-8">
    <zx-close-button variant="square"></zx-close-button>
    <zx-close-button variant="circle"></zx-close-button>
  </div>
`;

export default meta;
