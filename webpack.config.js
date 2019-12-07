var webpack = require("webpack");

module.exports = {
	mode: "none",
	entry: [
		"./Source/index.ts"
	],
	output: {
		path: __dirname + "/Dist",
		publicPath: "http://localhost:8080/",
		filename: "index.js",
		libraryTarget: "umd",
    	//library: "react-vscrollview",
	},
	resolve: {
		//root: paths.client(),
		//root: "Source",
		extensions: [
			'.js', '.jsx', '.json',
			'.ts', '.tsx',
			'.mjs', // needed for mobx-sync
		],
	},
	externals: {
		// use external version of React (ie, don't bundle react, since any app using this library will already have it available)
		//"react": "React",
		"react": "commonjs react",
 		"react-dom": "commonjs react-dom",
		"js-vextensions": "commonjs js-vextensions",
		"react-vextensions": "commonjs react-vextensions",
		"react-vcomponents": "commonjs react-vcomponents",
		"react-vmessagebox": "commonjs react-vmessagebox",
		"react-vscrollview": "commonjs react-vscrollview",
		"react-vmarkdown": "commonjs react-vmarkdown",
		"react-beautiful-dnd": "commonjs react-beautiful-dnd", // needed as external, to avoid having to use string-replace to lock its redux to its local v5, instead of the CD project v6 (will fix this later)
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
					presets: ["@babel/env", "@babel/react"]
				}
			},
			{test: /\.tsx?$/, loader: "ts-loader"},
			// for mobx-sync
			{ test: /\.mjs$/, type: 'javascript/auto' },
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		//new webpack.IgnorePlugin(/react/),
	]
};