import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    stylistic.configs.customize({
        flat: true,
        indent: 4,
        quotes: "double",
        semi: true,
    }),
    {
        rules: {
            "react/jsx-no-literals": "error",
        },
    },
    {
        ignores: [".next/"],
    },
];

export default eslintConfig;
