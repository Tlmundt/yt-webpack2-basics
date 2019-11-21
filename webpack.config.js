const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractPlugin = new MiniCssExtractPlugin({
	filename: 'main.css',
})

module.exports = {
	mode: 'development',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/dist/',
		watchContentBase: true,
	    compress: true,
	    stats: {
		    all: false,
		    colors: true,
		    errors: true,
		    warnings: true,
		    errorDetails: true
	    }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					  {
					    loader: MiniCssExtractPlugin.loader,
					    options: {
					      // you can specify a publicPath here
					      // by default it uses publicPath in webpackOptions.output
					    },
					  },
					  'css-loader', 'sass-loader'
					],
			}
		]
	},
	optimization: {
	    minimize: false
	},
	plugins: [
		extractPlugin
	]
};