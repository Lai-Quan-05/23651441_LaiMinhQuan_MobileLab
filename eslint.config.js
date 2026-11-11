const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
module.exports = defineConfig([
  expoConfig,
  {
    files: ['src/app/week*/**/*.tsx'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    ignores: [
      'dist/**',
      'dist-android/**',
      'week1/**',
      'week2/**',
      'week3/**',
      'week5/**',
      'week6/**',
      'week7/**',
      'week8/**',
      'week9/**',
    ],
  },
]);
