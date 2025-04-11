import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";


export default defineConfig([
  // Apply recommended rules to all JS files
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  // Apply Node.js globals to test files and top-level config files
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  // Apply browser globals to all JS files
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: { ...globals.browser, } } },
]);
