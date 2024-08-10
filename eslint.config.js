import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    // Configuration for JavaScript files
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      // Add or override rules here
    },
  },
];
