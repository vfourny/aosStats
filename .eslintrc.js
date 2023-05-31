module.exports = {
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
    "plugin:typescript-sort-keys/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["typescript-sort-keys", "sort-keys-fix"],
  root: true,
  rules: {
    "sort-keys-fix/sort-keys-fix": "error",
    "vue/no-deprecated-slot-attribute": "off",
  },
};
