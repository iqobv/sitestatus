import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['eslint.config.mjs', 'node_modules', 'dist'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
				},
			],
		},
	},
	{
		files: ['**/index.ts'],
		ignores: ['src/libs/constants/index.ts', 'src/libs/constants/**/index.ts'],
		plugins: {
			architecture: {
				rules: {
					'no-index-file': {
						create(context) {
							return {
								Program(node) {
									context.report({
										node,
										message:
											'Index files are not allowed. Please use named exports instead.',
									});
								},
							};
						},
					},
				},
			},
		},
		rules: {
			'architecture/no-index-file': 'error',
		},
	},
	eslintConfigPrettier,
];
