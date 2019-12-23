var webpackConfig = require('@vue/cli-service/webpack.config.js')

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'tests/**/*.spec.ts'
        ],
        preprocessors: {
            '**/*.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['ChromeHeadless']  //没有界面的浏览器，为了后面配合travis使用
    })
}