import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './drawer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-drawer',
  component: 'zx-drawer',
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  parameters: {
    actions: {
      handles: ['show', 'close', 'after-close'],
    },
  },
  args: {
    open: false,
    placement: 'start',
    persistent: false,
    quick: false,
    noCloseButton: false,
    noHeader: true,
  },
};

function openDrawer() {
  const drawer = document.querySelector('zx-drawer');
  drawer!.show();
}

export const Showcase: Story = {
  render: (args: any) => html`
    <button
      class="inline-flex items-center gap-2 border-2 rounded px-4 py-2 focus:ring-4"
      type="button"
      @click="${openDrawer}"
    >
      ☰ Menu
    </button>

    <zx-drawer
      .open="${args.open}"
      .placement="${args.placement}"
      .persistent="${args.persistent}"
      .quick="${args.quick}"
      .noCloseButton="${args.noCloseButton}"
      .noHeader="${args.noHeader}"
    >
      ${['Menu 1', 'Menu 2', 'Menu 3'].map(
        menu => html`
          <details name="menu">
            <summary class="flex items-center p-4 border-b">${menu}</summary>
            <div class="flex p-4">Sub menu</div>
          </details>
        `,
      )}
    </zx-drawer>
  `,
};

export default meta;
