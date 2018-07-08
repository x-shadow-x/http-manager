import rollupConfig from './rollup.config.base';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: rollupConfig.input,
    output: {
		file: './dist/js/main.min.js',
		format: 'iife',
		sourcemap: true
    },
    plugins: [
		...rollupConfig.plugins,
		uglify()
	]
}