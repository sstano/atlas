module.exports = {
  env: {
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "airbnb-typescript-prettier",
  ],
  plugins: ["react", "jest"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {},
};
