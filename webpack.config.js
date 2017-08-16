var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
};

var HtmlWebpackConfig = {
    title: 'hexo',
    filename: 'index.html',
    template: "./src/index.html",
    hash: true,
    showErrors: true
};


module.exports = {
    entry: [
        "./src/main.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new HtmlWebpackPlugin(HtmlWebpackConfig)
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: "react-hot-loader"
                    },
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true
                        }
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[path][name]---[local]---[hash:base64:5]",
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[path][name]---[local]---[hash:base64:5]",
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[path][name]---[local]---[hash:base64:5]",
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: "react-hot-loader"
                    },
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: /\.md$/, use: [{ loader: 'raw-loader' }]
            }
        ]
    },
    devServer: {
        port: process.env.PORT || 8888,
        host: 'localhost',
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true,
        open: true,
        proxy: {
            // OPTIONAL: proxy configuration:
            // '/optional-prefix/**': { // path pattern to rewrite
            //   target: 'http://target-host.com',
            //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
            // }
        }
    }
}