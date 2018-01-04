/**
 * Created by Administrator on 2018/1/2.
 */
module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/sd/node_modules',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}