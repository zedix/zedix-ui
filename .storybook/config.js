import { configure, addDecorator, addParameters } from '@storybook/polymer';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
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
