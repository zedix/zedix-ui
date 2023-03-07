import { html } from 'lit';
import './button.js';

export default {
  title: 'Form/zx-button',
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['button', 'submit'],
      },
      defaultValue: 'button',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'outline-primary'],
      },
      defaultValue: 'primary',
    },
    onClick: { action: 'click' },
  },
};

const Template = args => html`
  <zx-button
    @click="${args.onClick}"
    type="${args.type}"
    name="${args.name}"
    href="${args.href}"
    size="${args.size}"
    variant="${args.variant}"
    .disabled="${args.disabled}"
    .loading="${args.loading}"
    .block="${args.block}"
    .fake="${args.fake}"
  >
    Sign in
  </zx-button>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  name: '',
  href: '',
  type: 'button',
  size: 'small',
  variant: 'primary',
  disabled: false,
  loading: false,
  block: false,
  fake: false,
};

/*
export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
*/

export const Showcase = () => html`
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
`;
