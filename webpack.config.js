/* global __dirname */
var webpack = require("webpack");

module.exports = {
	mode: "none",
	entry: [
		"./src/index.ts"
	],
	output: {
		path: __dirname + "/dist",
		publicPath: "http://localhost:8080/",
		filename: "index.js",
		libraryTarget: "umd",
    	//library: "react-vscrollview",
	},
	resolve: {
		//root: paths.client(),
		//root: "src",
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
	},
	externals: {
		// use external version of React (ie, don't bundle react, since any app using this library will already have it available)
		//"react": "React",
		"react": "commonjs react",
 		"react-dom": "commonjs react-dom",
		"js-vextensions": "commonjs js-vextensions",
		"react-vextensions": "commonjs react-vextensions",
		"react-vcomponents": "commonjs react-vcomponents",
		"react-redux": "commonjs react-redux",
		"react-redux-firebase": "commonjs react-redux-firebase",
		"react-vmessagebox": "commonjs react-vmessagebox",
		"react-vscrollview": "commonjs react-vscrollview",
		"redux": "commonjs redux",
	},
    /*module: {
        noParse: ["react"]
    },*/
    module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"]
				}
			},
			{test: /\.tsx?$/, loader: "ts-loader"},
			{
				test: /\.(png|jpg|jpeg|svg)$/,
				loader: "file"
			},
			{
				test: /\.json$/,
				loader: "json-loader",
				include: [
					"./node_modules/ajv/lib/refs",
				]
			},
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		//new webpack.IgnorePlugin(/react/),
	]
};