var path = require('path')

module.exports = {
    publicPath: '',
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    resources: path.resolve(__dirname, './src/assets/scss/index.scss'),
                })
                .end()
        })
    }
};