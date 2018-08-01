module.exports = {
  extends: "airbnb",
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'import/extensions': ['error', { jsx: 'always', js: 'never' }]
  }
}