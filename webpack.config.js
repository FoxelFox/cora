var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		client: './src/client/index.ts',
    server: './src/server/server.ts',
	},
	output: {
		path: './bin/',
		filename: './[name]/bundle.js',
		sourceMapFilename: './[name]/bundle.map'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/client/index.html', to: 'client/index.html'}
		])
	]
};
