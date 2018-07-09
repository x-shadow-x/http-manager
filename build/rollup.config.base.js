import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

export default {
	input: './src/main.js',
	plugins: [
		resolve({
			jsnext: true, // 该属性是指定将Node包转换为ES2015模块
			// main 和 browser 属性将使插件决定将那些文件应用到bundle中
			main: true, // Default: true 
			browser: true // Default: false
		}),
		commonjs(),
		json(),
		builtins(),
		globals(),
		babel({
			runtimeHelpers: true,
			exclude: 'node_modules/**' // 排除node_module下的所有文件
		}),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
}
