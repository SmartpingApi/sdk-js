/// <reference types="vitest" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	resolve: {
		alias: {
			'#src': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
			'#tests': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './tests'),
		},
	},
	test: {
		include: ['tests/unit/**/*.spec.ts'],
		setupFiles: './tests/setup.ts',
	},
});
