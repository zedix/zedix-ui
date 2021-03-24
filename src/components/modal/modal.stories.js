import { html } from 'lit-html';
import './modal.js';

function openModal({ currentTarget }) {
  const invokerElement = currentTarget;
  const modalElement = currentTarget.nextElementSibling;

  modalElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; width: 500px; min-height: 220px;">
      Modal Body
    </div>
  `;
  modalElement.showModal({ invokerElement });
}

export default {
  title: 'Core/zx-modal',
  onOpen: { action: 'open' },
  onClose: { action: 'close' },
};

const Template = args => html`
  <style>
    #root {
      height: 300vh; /* simulate a long page with scrollbar */
    }
  </style>
  <button type="button" @click="${openModal}">Open modal</button>
  <zx-modal
    .closeable="${args.closeable}"
    .closeOnClickOutside="${args.closeOnClickOutside}"
    .closeOnEscape="${args.closeOnEscape}"
    @open="${args.onOpen}"
    @close="${args.onClose}"
  ></zx-modal>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  closeable: true,
  closeOnClickOutside: false,
  closeOnEscape: true,
};
