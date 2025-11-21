/* eslint-disable @typescript-eslint/no-var-requires */
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: require('@eslint/js').configs.recommended,
});

module.exports = [
  {
    ignores: [
      '**/*.config.js',
      '**/*.config.cjs',
      'metro.config.js',
      'node_modules/',
      'dist/',
      '.expo/',
      '__mocks__/',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-native': require('eslint-plugin-react-native'),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react-native/no-color-literals': 'off',
      'react-native/sort-styles': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'off',
    },
  },
];
