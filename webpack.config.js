const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
// 		publicPath: '/dist/',
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
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:'[name].[ext]',
							outputPath: 'img/',
							publicPath: 'img/'
						}
					}
				]
			}
		]
	},
	optimization: {
	    minimize: false
	},
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
};