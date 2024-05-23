import { defineConfig } from 'tsup';

export default defineConfig({
	entry: [
		'src/errors/**/*.ts',
		'src/helpers/**/*.ts',
		'src/models/**/*.ts',
		'src/queries/**/*.ts',
		'src/reporters/**/*.ts',
		'src/serializers/**/*.ts',
		'src/types/**/*.ts',
		'src/api_endpoints.ts',
		'src/credentials.ts',
		'src/index.ts',
		'src/smartping.ts',
	],
	format: 'esm',
	target: 'es2022',
	dts: true,
	minify: false,
	clean: true,
	outDir: 'dist',
	bundle: false,
	platform: 'neutral',
});
