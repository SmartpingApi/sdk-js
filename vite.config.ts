import { defineConfig } from 'vitest/config';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		include: [
			'tests/**/*.{test,spec}.ts',
			// 'src/**/*.ts'
		]
	}
});
