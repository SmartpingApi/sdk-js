/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	resolve: {
		alias: {
			'@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
			'@tests': resolve(dirname(fileURLToPath(import.meta.url)), './tests'),
		},
	},
	test: {
		include: [
			'src/**/*.spec.ts',
		],
		setupFiles: './tests/setup.ts',
	},
});
