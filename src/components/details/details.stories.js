import { html } from 'lit';
import './details.js';

export default {
  title: 'Core/zx-details',
};

const Template = args => html`
  <div class="flex flex-col gap-4">
    <zx-details class="bg-white rounded border hover:border-gray-400" .disabled="${args.disabled}">
      <h3 slot="summary" class="text-lg font-semibold px-3 py-3">What is Wikipedia?</h3>
      <div class="px-3 py-3">
        Wikipedia is an encyclopedia which is free to use and edit. It is available in many
        different languages and on many devices. The content of Wikipedia is free to reproduce under
        the Creative Commons Attribution-Sharealike 3.0 Unported License (CC-BY-SA) and the GNU Free
        Documentation License (GFDL), except for some images.
      </div>
    </zx-details>
    <zx-details class="bg-white rounded shadow hover:shadow-md" .disabled="${args.disabled}">
      <h3 slot="summary" class="text-lg font-semibold px-3 py-3">Who writes Wikipedia?</h3>
      <div class="px-3 py-3">
        Wikipedia is written and edited by volunteers from around the world. If you wish to help,
        you can start by visiting our introduction for contributors.
      </div>
    </zx-details>
    <zx-details class="bg-white rounded shadow hover:shadow-md custom" .disabled="${args.disabled}">
      <h3 slot="summary" class="text-lg font-semibold px-3 py-3">Who writes Wikipedia?</h3>
      <span slot="summary-icon">
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      <div class="px-3 py-3">
        Wikipedia is written and edited by volunteers from around the world. If you wish to help,
        you can start by visiting our introduction for contributors.
      </div>
    </zx-details>
  </div>
`;

export const Sandbox = Template.bind({});
Sandbox.args = {
  disabled: false,
};
