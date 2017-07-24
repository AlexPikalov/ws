'use strict';

var webpackConfig = require('./webpack.config');
Object.assign(webpackConfig, {
    entry: './specs.js',
    devtool: 'cheap-module-inline-source-map'
});

// var disableCoverage = !!process.env.NO_COVERAGE;
// if (!disableCoverage) {

//     webpackConfig.module.rules.push({
//         test: /\.js$/,
//         exclude: [
//             /\.spec\.js/,
//             /node_modules/
//         ],
//         loader: 'istanbul-instrumenter-loader',
//         enforce: 'post'
//     });
// }

module.exports = webpackConfig;
