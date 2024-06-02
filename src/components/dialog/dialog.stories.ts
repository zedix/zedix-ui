import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dialog';

type Story = StoryObj;

const meta: Meta = {
  title: 'Core/zx-dialog',
  component: 'zx-dialog',
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['top', 'center'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'default', 'large'],
    },
  },
  parameters: {
    actions: {
      handles: ['show', 'close', 'after-close'],
    },
  },
  args: {
    open: false,
    persistent: false,
    quick: false,
    noCloseButton: false,
    noHeader: false,
    align: 'center',
    size: 'medium',
  },
};

function openDialog() {
  const dialog = document.querySelector('zx-dialog');
  dialog!.show();
}

function closeDialog() {
  const dialog = document.querySelector('zx-dialog');
  dialog!.close();
}

export const Showcase: Story = {
  render: (args: any) => html`
    <button
      class="border-2 rounded uppercase p-2 focus:ring-4"
      type="button"
      @click="${openDialog}"
    >
      Open dialog
    </button>

    <zx-dialog
      title="Title"
      align="${args.align}"
      size="${args.size}"
      .open="${args.open}"
      .persistent="${args.persistent}"
      .quick="${args.quick}"
      .noCloseButton="${args.noCloseButton}"
      .noHeader="${args.noHeader}"
    >
      <form method="dialog">
        <div class="flex items-center justify-center" style="min-height: 220px;"></div>
      </form>
      <menu slot="actions">
        <button class="px-4 py-2 rounded border focus:ring-4" @click="${closeDialog}">
          Cancel
        </button>
        <button autofocus class="px-4 py-2 rounded border focus:ring-4" @click="${closeDialog}">
          Save changes
        </button>
      </menu>
    </zx-dialog>
  `,
};

export default meta;
