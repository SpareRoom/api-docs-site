module.exports = {
  extends: "airbnb",
  env: {
    browser: true
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'import/extensions': ['error', { jsx: 'always', js: 'never' }]
  }
}