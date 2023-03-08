import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './skeleton';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-skeleton',
  argTypes: {
    animation: {
      control: {
        type: 'inline-radio',
      },
      options: ['pulse', 'wave'],
      defaultValue: 'pulse',
    },
    shape: {
      control: {
        type: 'inline-radio',
      },
      options: ['circle', 'rectangle', 'text'],
      defaultValue: 'text',
    },
  },
};

export const Sandbox: Story = {
  args: {},
  render: args => html`
    <zx-skeleton
      animation="${args.animation}"
      shape="${args.shape}"
      width="300"
      height="${args.shape === 'circle' ? '300' : '30'}"
    ></zx-skeleton>
  `,
};

export const Showcase: Story = {
  render: () => html`
    <div class="grid grid-cols-2 gap-4 p-4 max-w-xl">
      ${['pulse', 'wave'].map(
        animation => html`
          <div>
            <div class="mb-2">
              <zx-skeleton
                animation="${animation}"
                shape="circle"
                width="50"
                height="50"
              ></zx-skeleton>
            </div>
            <div class="mb-2">
              <zx-skeleton
                animation="${animation}"
                shape="text"
                width="220"
                height="20"
              ></zx-skeleton>
              <zx-skeleton
                animation="${animation}"
                shape="text"
                width="220"
                height="20"
              ></zx-skeleton>
            </div>
            <div class="mb-2">
              <zx-skeleton
                animation="${animation}"
                shape="rectangle"
                width="220"
                height="80"
              ></zx-skeleton>
            </div>
          </div>
        `,
      )}
    </div>
  `,
};

export default meta;
