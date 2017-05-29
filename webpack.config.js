var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname,
	entry: './assets/js/index',
	output: {
		path: path.resolve('./assets/bundles/'),
		publicPath: '/static/bundles/',
		filename: '[name]-[hash].js',
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.js'}),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
				}
			}
		]
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['', '.js', '.jsx']
	}

}
