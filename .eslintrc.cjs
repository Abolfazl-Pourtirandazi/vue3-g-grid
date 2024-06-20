/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "no-unreachable": "error",
    "no-multi-spaces": "error",
    "vue/multi-word-component-names": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        printWidth: 120
      }
    ]
  }
};
