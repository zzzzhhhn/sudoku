/**
 * Created by Administrator on 2018/1/2.
 */
module.exports = {
    entry: {
        index: './src/js/index.ts'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    'ts-loader'
                ],
                exclude: '/sd/node_modules',
                
            }
        ]
    }
}