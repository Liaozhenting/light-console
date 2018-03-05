const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://0.0.0.0:8082',
        path.join(__dirname, 'app.js')
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
                // query:{presets:['react']}
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
        ]
    },
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
    }
};