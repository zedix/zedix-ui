import {
  addParameters,
  addDecorator,
  setCustomElements,
  withA11y,
} from '@open-wc/demoing-storybook';

// import { create } from '@storybook/theming';

async function run() {
  const customElements = await (
    await fetch(new URL('../custom-elements.json', import.meta.url))
  ).json();
  setCustomElements(customElements);

  addDecorator(withA11y);

  addParameters({
    a11y: {
      config: {},
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    docs: {
      iframeHeight: '200px',
    },
    options: {
      // https://storybook.js.org/docs/configurations/theming/#create-a-theme-quickstart
      //theme: create({
      //base: 'light',
      //brandTitle: 'Zedix UI — Web Components',
      // brandImage: 'https://cdn.worldvectorlogo.com/logos/web-components.svg',
      //}),
      //isToolshown: true,
    },
  });
}

run();
