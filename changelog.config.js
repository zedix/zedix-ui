// https://github.com/unjs/changelogen
export default {
  types: {
    feat: { title: '🚀 Enhancements', semver: 'minor' },
    fix: { title: '🩹 Fixes', semver: 'patch' },
    perf: false,
    refactor: false,
    docs: false,
    build: false,
    types: false,
    chore: false,
    examples: false,
    test: false,
    style: false,
    ci: false,
  },
  templates: {
    commitMessage: 'chore(release): v{{newVersion}}',
    tagMessage: 'v{{newVersion}}',
    tagBody: 'v{{newVersion}}',
  },
  excludeAuthors: ['Zedix'],
};
