// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs, action, boolean } from '@open-wc/demoing-storybook';

import './zx-modal.js';

export default {
  title: 'Core/zx-modal',
  component: 'zx-modal',
  decorators: [withKnobs],
};

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

export const Sandbox = () => html`
  <style>
    #root {
      height: 300vh; /* simulate a long page with scrollbar */
    }
  </style>
  <button type="button" @click="${openModal}" style="margin-top: 50vh">
    Open modal
  </button>
  <zx-modal
    .closeable="${boolean('closeable', true)}"
    .closeOnClickOutside="${boolean('closeOnClickOutside', false)}"
    .closeOnEscape="${boolean('closeOnEscape', true)}"
    @open="${action('open')}"
    @close="${action('close')}"
  ></zx-modal>
`;
