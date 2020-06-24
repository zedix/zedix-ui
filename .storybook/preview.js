// Configures the "preview" iframe that renders the components

import { addParameters, setCustomElements } from '@open-wc/demoing-storybook';

addParameters({
  docs: {
    iframeHeight: '200px',
  },
});

async function run() {
  const customElements = await (
    await fetch(new URL('../custom-elements.json', import.meta.url))
  ).json();

  setCustomElements(customElements);
}

run();
