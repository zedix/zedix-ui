import type { Preview } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
// https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/getting-started/tailwind.md
import './tailwind.css';

const preview: Preview = {
  decorators: [withActions],
  parameters: {
    backgrounds: {
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
