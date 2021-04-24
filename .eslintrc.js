module.exports = {
  extends: ['plugin:cypress/recommended', 'airbnb-base'],
  plugins: ['chai-friendly'],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
  },
}
