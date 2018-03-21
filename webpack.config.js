let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let isProduction = (process.env.NODE_ENV == 'production');

module.exports = {
    entry: {
        app : './js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        publicPath: './dist',
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['vue-hot-reload-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-hot-reload-loader', 'vue-loader']
            }
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'defaults': path.resolve(__dirname, 'src/defaults'),
        }
    },

    plugins: [

        new ExtractTextPlugin('[name].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
        }),

    ],
};