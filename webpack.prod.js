
const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin }         = require('clean-webpack-plugin');
const TerserPlugin                   = require("terser-webpack-plugin");

module.exports = {
    
    mode: 'production',
    optimization:{
        minimizer:[ new OptimizeCssAssetsWebpackPlugin() ],
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        filename: '[hash].js',
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: ['style-loader', 'css-loader'],                
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test:/\.html$/i,
                loader: 'html-loader',
                options: {
                       attributes:false, 
                    //    minimize: true,
                },   
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        }
                    }
                ]
        
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
    devServer: {
        contentBase: './dist',
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
            ignoreOrder:false
        })
    ]
}