import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      'indent': [
        'error',
        2
      ],
      'quotes': [
        'error',
        'single'
      ],
      'no-underscore-dangle': 'off',
    }
  },
  pluginJs.configs.recommended,
];