/**
 * ESlint Flat Config.
 *
 * https://www.raulmelo.me/en/blog/migration-eslint-to-flat-config
 */

import globals from 'globals';
import js from '@eslint/js';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import eslintConfigPrettier from 'eslint-config-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Global ignores
    ignores: ['dist/**', 'node_modules/**'],
    // Global languageOptions
    languageOptions: {
      // https://eslint.org/docs/latest/use/configure/migration-guide#configuring-language-options
      globals: globals.mocha,
    },
  },
  {
    files: ['src/components/**/*.js', 'src/components/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      typescriptEslint,
      // https://github.com/open-wc/open-wc/blob/master/packages/eslint-config/index.js
      // https://github.com/43081j/eslint-plugin-wc/blob/master/src/configs/best-practice.ts
      wc,
      lit,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: 'HTMLElementTagNameMap' }],
    },
  },
  // https://github.com/prettier/eslint-config-prettier#eslintconfigjs-flat-config-plugin-caveat
  eslintConfigPrettier,
];
