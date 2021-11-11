const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');


module.exports ={
    mode: 'development',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
        ]
    },
    output: {
        clean: true
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
                            // minimize: false,
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
                    //         name: 'assets/[name].[ext]',
                    //     },
                    // }
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            // filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/assets/", to: "assets/"},
            ],
        })
    ]
}