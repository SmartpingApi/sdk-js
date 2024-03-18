import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/**/*.ts'],
	format: 'esm',
	target: 'es2022',
	dts: true,
	minify: false,
	clean: true,
	outDir: 'dist',
	bundle: false,
	platform: 'neutral',
});
