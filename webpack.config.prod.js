var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};


var HtmlWebpackConfig = {
    title: 'hexo',
    filename: 'index.html',
    template: "./src/index.html",
    hash: true,
    showErrors: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
};

module.exports = {
    entry: [
        'babel-polyfill',
        "./src/main.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new HtmlWebpackPlugin(HtmlWebpackConfig),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new BundleAnalyzerPlugin()
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ["react-hot", "awesome-typescript-loader?useBabel=true"] },
            { test: /\.(scss)$/, loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader' },
            { test: /\.(less)$/, loader: 'style-loader!css-loader?modules!postcss-loader!less-loader' },
            { test: /\.(css)$/, loader: 'style-loader!css-loader?modules!postcss-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.(ttf|otf|woff|woff2|eot)$/, loader: 'file-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-2"]
                }
            },
            {test: /\.json$/,loader: 'json-loader'},
            {test: /\.md$/,loader: 'raw-loader'}
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};