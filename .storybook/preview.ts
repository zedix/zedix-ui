import type { Preview } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

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
