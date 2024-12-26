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
	};
}

export default defineConfig([modernConfig({ entry: ["src/*.ts"] })]);
