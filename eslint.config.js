/**
 * ESlint Flat Config.
 *
 * https://www.raulmelo.me/en/blog/migration-eslint-to-flat-config
 */

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import prettier from 'eslint-plugin-prettier';

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
    // https://github.com/open-wc/open-wc/blob/master/packages/eslint-config/index.js
    plugins: {
      '@typescript-eslint': tsPlugin,
      wc,
      lit,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: 'HTMLElementTagNameMap' }],
    },
  },
];
