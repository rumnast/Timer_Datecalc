const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: resolve(__dirname, "build"),
        filename: "main.[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.s[acs]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.mp3$/i,
                use: 'file-loader',

            },
            {
                test: /\.png$/i,
                use: 'file-loader',

            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "index.html")
        }),
    ]
}