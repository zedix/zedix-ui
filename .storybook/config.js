import {
  configure,
  addDecorator,
  addParameters,
  setCustomElements,
} from '@storybook/web-components';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

import customElements from '../custom-elements.json';
setCustomElements(customElements);

/* This line loads all the .story files from the components */
const components = require.context('../src/components/', true, /\.stories\.(js|mdx)$/);

function loadStories() {
  components.keys().forEach(components);
}

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Zedix UI — Web Components',
      // brandImage: 'https://cdn.worldvectorlogo.com/logos/web-components.svg',
    }),
    //isToolshown: true,
  },
});

addDecorator(withA11y);
configure(loadStories, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
