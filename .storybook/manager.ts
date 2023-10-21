import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  // https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
  theme: create({
    base: 'dark',
    brandTitle: `
      <div style="display: flex; gap: 12px; align-items: center; font-size: 24px">
        <img src="https://raw.githubusercontent.com/webcomponents/webcomponents-icons/master/logo/logo_512x512.png" width="40" />
        Zedix UI — Web Components
      </div>`,
    brandUrl: 'https://github.com/zedix/zedix-ui',
  }),
});
