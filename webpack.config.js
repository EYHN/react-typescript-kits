var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlWebpackConfig = {
    title: 'react',
    filename: 'index.html',
    template: "./src/index.html",
    hash: true,
    showErrors: true
};


module.exports = {
    mode: "development",
    entry: [
        './src/main.tsx'
    ],
    output: {
        filename: "bundle.js",
        chunkFilename: "[name].js",
        path: __dirname + "/dist"
    },
    
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackConfig)
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true,
                            reportFiles: [
                                "src/**/!(test)/*"
                            ]
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
                        loader: "css-loader"
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
                        loader: 'babel-loader'
                    }
                ],
            }
        ]
    },
    devServer: {
        port: process.env.PORT || 8888,
        host: 'localhost',
        publicPath: '/',
        contentBase: path.resolve(__dirname, "src"),
        historyApiFallback: true,
        open: true,
        headers: {
            "access-control-allow-origin":"*"
        }
    }
}