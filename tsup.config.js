import { defineConfig } from "tsup";

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string[]} opts.entry - The entry array.
 * @returns {import('tsup').Options}
 */
export function modernConfig(opts) {
	return {
		entry: opts.entry,
		format: "esm",
		platform: "node",
		outDir: "build",
		dts: true,
		sourcemap: true,
		clean: true,
		tsconfig: "tsconfig.json",
		banner: {
			js: 'import { createRequire } from "module";const require = createRequire(import.meta.url);',
		},
	};
}

export default defineConfig([modernConfig({ entry: ["src/*.ts"] })]);
