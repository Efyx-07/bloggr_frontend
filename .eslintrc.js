import tailwind from "eslint-plugin-tailwindcss";

export default [
  {
    extends: ["next/core-web-vitals", "prettier"],
    plugins: ["prettier", "tailwindcss"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "all",
          bracketSpacing: true,
        },
      ],
      "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "react/jsx-tag-spacing": [
        "error",
        {
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never",
        },
      ],
      ...tailwind.configs["flat/recommended"],
    },
  },
];
