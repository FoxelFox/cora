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
			{ from: 'src/client/index.html' }
		]),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			compress: {
				warnings: false
			}
		})
	]
};
