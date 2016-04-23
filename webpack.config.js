var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/client/index.ts',
	output: {
		path: './bin/client',
		filename: './bundle.js',
		sourceMapFilename: './bundle.map'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader?configFileName=tsconfig-client.json' },
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/client/index.html' }
		])
	]
};
