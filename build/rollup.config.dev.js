import rollupConfig from './rollup.config.base';

export default {
    input: rollupConfig.input,
    output: {
		file: './dist/js/main.commmon.js',
		format: 'iife',
		sourcemap: true
    },
    plugins: [
		...rollupConfig.plugins
	]
}