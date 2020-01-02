module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    'plugin:vue/recommended',
    'airbnb-base'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': false,
    '__statics': true,
    'process': true,
    'Capacitor': false,
    'chrome': true
  },

  // add your custom rules here
  rules: {
    'no-param-reassign': 'off',
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_'
    }],

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'error',

    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false
    }],
    'vue/match-component-file-name': ['error', {
      extensions: ['.vue'],
      shouldMatchCase: true
    }],
    //'vue/no-deprecated-scope-attribute': 'error',
    'vue/require-direct-export': 'error',
    'vue/v-on-function-call': ['error', 'never'],
    //'vue/v-slot-style': ['error', 'shorthand'],
    //'vue/valid-v-slot': 'error',

    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
