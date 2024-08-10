const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");

module.exports = [
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		languageOptions: {
			globals: { ...globals.node },
		},
		ignores: ["node_modules/**", "dist/**"],
	},
	pluginJs.configs.recommended,
	tseslint.configs.recommended,
	{
		rules: {
			"no-console": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"no-unused-vars": "error", // corrected rule name
			"no-unused-expressions": "error", // corrected rule name
			"prefer-const": "error",
			"no-undef": "error",
		},
	},
];
