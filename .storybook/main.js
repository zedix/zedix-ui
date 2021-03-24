module.exports = {
  stories: [
    '../src/**/*.stories.{js,md,mdx}'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  webpackFinal: async (config) => {
    // config.resolve.mainFields = ['browser', 'module', 'main'];
    return config;
  },
};
