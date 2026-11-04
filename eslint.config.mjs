import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['dist/**'] },
  { linterOptions: { reportUnusedDisableDirectives: 'off' } },
  js.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['app/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    },
    settings: { react: { version: '15.7' } },
    rules: {
      'react/prop-types': 'off',
      'react/no-string-refs': 'off',
      'react/display-name': 'off',
      'react/no-children-prop': 'off',
      'react/jsx-key': 'warn'
    }
  }
];
