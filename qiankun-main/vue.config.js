// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
  }
const { name } = require('./package');
module.exports = {
    publicPath: `/${name}`,
    lintOnSave: false,
    devServer: {
        port: 8000,
        // 关闭主机检查，使微应用可以被 fetch，否则会提示生命周期未注册
        // disableHostCheck: true,
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            // jsonpFunction: `webpackJsonp_${name}`, //webpack5废弃jsonpFunction
            chunkLoadingGlobal: `webpackJsonp_${name}`,
        },
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                // data: `@import "@/assets/css/sass.scss";`
            }
        }
    }
}