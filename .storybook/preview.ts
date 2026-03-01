import type { Preview } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
// https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/getting-started/tailwind.md
import './tailwind.css';

const preview: Preview = {
  decorators: [withActions],

  parameters: {
    backgrounds: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;
