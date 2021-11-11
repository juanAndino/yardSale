const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');

const CssMinimizer            = require('css-minimizer-webpack-plugin');
const Terser                  = require('terser-webpack-plugin');



module.exports ={
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new CssMinimizer(),
            new Terser(),
        ]
    },
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            // minimize: true,
                            sources: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff)$/i,
                loader: 'file-loader',
                options: {
                  name: 'assets/font/[name].[ext]',
                },
            },
            {
                test: /\.(jpe?g|png|svg|jpg|gif)$/,
                use: [
                    "file-loader?name=assets/img/[name].[ext]","image-webpack-loader"
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'assets/img/[name].[ext]',
                    //     },
                    // }
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            // filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/assets/", to: "assets/"},
                // {from: "src/prueba/", to: "prueba/"}
            ],
        })
    ]
}