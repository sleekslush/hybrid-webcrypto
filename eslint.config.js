import prettierConfig from "eslint-plugin-prettier/recommended";
import { configs as tseslintConfig } from "typescript-eslint";

import eslintConfig from "@eslint/js";

export default [
  // Ignores must be first due to config format stupidity
  /*{
    ignores: ["src/public/**", "build/**", ".output/**", ".wxt/**"]
  },*/

  eslintConfig.configs.recommended,
  ...tseslintConfig.recommended,
  prettierConfig,

  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      curly: "error",
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
      "prettier/prettier": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "error",
      "no-unused-vars": "off",
      "require-await": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
