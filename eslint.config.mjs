import process from 'node:process';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import importX from 'eslint-plugin-import-x';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // 1. Global Ignores (Matches your Prettier ignore)
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/public/Cesium/**'],
  },

  // 2. Base JS Rules
  js.configs.recommended,

  // 3. TypeScript Rules
  ...ts.configs.recommended,

  // 4. Vue Rules
  ...pluginVue.configs['flat/recommended'],

  // 5. Customizations
  {
    files: ['**/src/**/*.{ts,mts,tsx,js,jsx,vue}'],
    plugins: {
      import: importX,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          // Location of tsconfigs
          project: ['vue-epm/tsconfig.app.json', 'vue-epm/tsconfig.node.json'],
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        Cesium: 'readonly', // Tells ESLint that 'Cesium' is a global variable
      },
      parserOptions: {
        parser: ts.parser, // Uses TS parser for the <script> block in Vue
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // Easier for side projects
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      // Ensure imports point to a file/module that can be resolved.
      'import/no-unresolved': 'error',
      // Forbid modules without exports, or exports without matching import in another module.
      'import/no-unused-modules': 'warn',
      // Forbid repeated import of the same module in multiple places.
      'import/no-duplicates': 'warn',
      // Forbid namespace (a.k.a. "wildcard" *) imports
      'import/no-namespace': 'warn',
      // Enforce a newline after import statements.
      'import/newline-after-import': 'warn',
    },
  },

  // 6. PRETTIER (Must be last to override everything)
  configPrettier,
];
