import { configure, addDecorator, addParameters } from '@storybook/polymer';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

/* This line loads all the .story files from the components */
const components = require.context('../src/components/', true, /\.stories\.js$/);

function loadStories() {
  components.keys().forEach(components);
}

addParameters({
  options: {
    theme: create({
      brandTitle: 'Zedix UI — Web Components',
      // brandImage: 'https://cdn.worldvectorlogo.com/logos/web-components.svg',
    }),
    //isToolshown: true,
  },
});

addDecorator(withA11y);
configure(loadStories, module);
