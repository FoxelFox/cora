var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/client/index.ts',

	output: {
		path: './bin/client',
		filename: './bundle.js',
		sourceMapFilename: './bundle.map'
	},
	externals: {
		"babylonjs": "babylonjs"
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.json', '.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/client/index.html' },
			{ from: 'node_modules/babylonjs/babylon.max.js' },
			{ from: 'node_modules/babylonjs/Oimo.js' }
		])
	]
};
