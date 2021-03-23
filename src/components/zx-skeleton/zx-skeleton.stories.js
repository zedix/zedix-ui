import { html } from 'lit-html';
import './zx-skeleton.js';

export default {
  title: 'Core/zx-skeleton',
  argTypes: {
    animation: {
      control: {
        type: 'inline-radio',
        options: ['pulse', 'wave'],
      },
      defaultValue: 'pulse',
    },
    shape: {
      control: {
        type: 'inline-radio',
        options: ['circle', 'rectangle', 'text'],
      },
      defaultValue: 'text',
    },
  },
};

const Template = args => html`
  <zx-skeleton
    animation="${args.animation}"
    shape="${args.shape}"
    width="300"
    height="${args.shape === 'circle' ? '300' : '30'}"
  ></zx-skeleton>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {};

export const Showcase = () => `
  <div class="grid grid-cols-2 gap-4 p-4">${['pulse', 'wave']
    .map(
      animation => `
      <div>
        <div class="mb-2">
          <zx-skeleton animation="${animation}" shape="circle" width="50" height="50"></zx-skeleton>
        </div>
        <div class="mb-2">
          <zx-skeleton animation="${animation}"  shape="text" width="220" height="20"></zx-skeleton>
          <zx-skeleton animation="${animation}"  shape="text" width="220" height="20"></zx-skeleton>
          </div>
        <div class="mb-2">
          <zx-skeleton animation="${animation}"  shape="rectangle" width="220" height="80"></zx-skeleton>
        </div>
      </div>
    `
    )
    .join('\n')}</div>
`;
