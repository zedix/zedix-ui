import { html } from 'lit-html';
import './modal.js';

function openModal({ currentTarget }) {
  const invokerElement = currentTarget;
  const modalElement = currentTarget.nextElementSibling;

  if (currentTarget.dataset.longContent === 'true') {
    modalElement.innerHTML = `
    <div class="p-4">
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    </div>
  `;
  } else {
    modalElement.innerHTML = `
    <div class="flex items-center justify-center" style="min-height: 220px;">
      Body content
    </div>
  `;
  }

  modalElement.showModal({ invokerElement });
}

export default {
  title: 'Core/zx-modal',
  argTypes: {
    align: {
      control: {
        type: 'inline-radio',
        options: ['top', 'center'],
      },
      defaultValue: 'top',
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['small', 'default', 'large'],
      },
      defaultValue: 'default',
    },
    onOpen: { action: 'open' },
    onClose: { action: 'close' },
  },
};

const Template = args => html`
  <style>
    #root {
      height: 300vh; /* simulate a long page with scrollbar */
    }
  </style>
  <button
    class="border-2 rounded uppercase p-2"
    data-long-content="${args.useLongContent ? 'true' : 'false'}"
    type="button"
    @click="${openModal}"
  >
    Open modal
  </button>
  <zx-modal
    .closeable="${args.closeable}"
    .closeOnClickOutside="${args.closeOnClickOutside}"
    .closeOnEscape="${args.closeOnEscape}"
    align="${args.align}"
    size="${args.size}"
    @open="${args.onOpen}"
    @close="${args.onClose}"
  ></zx-modal>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  closeable: true,
  closeOnClickOutside: false,
  closeOnEscape: true,
  useLongContent: false,
  align: 'top',
  size: 'default',
};
