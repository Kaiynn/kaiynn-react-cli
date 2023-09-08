const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getStyleLoader = (pre) => {
    return [
        'style-loader', 
        'css-loader',
        {
            // 处理css兼容
            // 配合package.json中的browserList来制定兼容性
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['postcss-preset-env']
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: undefined,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[hash:10][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoader()
            },
            {
                test: /\.less$/,
                use: getStyleLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader')
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10*1024
                    }
                }
            },
            {
                test: /\.(woff2?|ttf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    // 多进程 考虑到启动进程的开销较大，小项目不开启
                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         works: threads
                    //     }
                    // },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            plugins: [
                                'react-refresh/babel'   // 激活js的hmr
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new ReactRefreshWebpackPlugin()
    ],
    mode: 'development',
    devtool: 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: (entryPoint) => `runtime-${entryPoint.name}.js`
        }
    },
    resolve: {
        // 自动补全扩展名
        extensions: ['.jsx', '.js', '.json'],
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true,
        // 解决前端路由404问题
        historyApiFallback: true
    }
}