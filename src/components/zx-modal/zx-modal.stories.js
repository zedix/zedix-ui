// eslint-disable-next-line import/no-extraneous-dependencies
import { html, withKnobs, action, boolean } from '@open-wc/demoing-storybook';

import './zx-modal.js';

export default {
  title: 'Core/zx-modal',
  component: 'zx-modal',
  decorators: [withKnobs],
};

function openModal(e) {
  const modal = e.currentTarget.nextElementSibling;

  modal.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; width: 500px; min-height: 220px;">
      Modal Body
    </div>
  `;

  modal.open = true;
}

export const Sandbox = () => html`
  <button type="button" @click="${openModal}">Open modal</button>
  <zx-modal
    .closeable="${boolean('closeable', true)}"
    .closeOnClickOutside="${boolean('closeOnClickOutside', false)}"
    .closeOnEscape="${boolean('closeOnEscape', true)}"
    @change="${action('change')}"
  ></zx-modal>
`;
