import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: create({
    base: 'light',

    brandTitle: 'Zedix UI — Web Components',
    brandUrl: 'https://github.com/zedix/zedix-ui',
    // brandImage: 'https://cdn.worldvectorlogo.com/logos/web-components.svg',
  }),
});
