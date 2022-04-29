# qiankun乾坤微前端示例
### 项目说明

主应用和子应用都是通过Vue-cli工具构建，vue2版本项目

- **qiankun-main** 为主应用
- **qiankun-app** 为子应用


#### 一、主应用配置说明（qiankun-main）

***src/micros/apps.js*** 为子应用路由规则

```
const apps = [
    /**
     * name: 微应用名称 - 具有唯一性
     * entry: 微应用入口 - 通过该地址加载微应用
     * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */
    {
        name: "qiankun-app",
        entry: "//localhost:8001/qiankun-app",
        container: "#app",
        activeRule: "/qiankun-app"
    }
];
export default apps;
```

***src/micros/index.js*** 为子应用注册主入口

```
import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from "qiankun";
import apps from "./apps";
/**
 * @description: 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps,
    {
        beforeLoad: [
            app => {
                console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            },
        ],
        beforeMount: [
            app => {
                console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            },
        ],
        afterUnmount: [
            app => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
                location.reload(true)
            },
        ],
    }
);
addGlobalUncaughtErrorHandler((event) => {
    const { msg } = event;
    if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
        console.log('加载失败');
    }
});

/**
 * @description: 导出启动函数
 */
export default start;
```

***src/router/index.js*** 主路由**（base根据实际情况自行修改）**

```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = resolve => require(['@/views/index'], resolve)

const routes = [
    {
        path: '/*',
        name: '主页',
        component: Index
    }
]

const router = new Router({
    base: "/qiankun-main", //配合nginx生产发布https://xxx.com//qiankun-main具体根据部署动态修改
    mode: 'history',
    routes
})

export default router
```

***src/main.js*** 主文件配置

```
import Vue from 'vue'
import store from './store';
import router from "./router";
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')


//引入qiankun注册文件
import startQiankun from "./micros";
//启动微应用
startQiankun();
```

微应用跳转

```
<template>
  <div class="home">
    <h3 @click="push('/qiankun-app')">click to qiankun-app ！！！</h3>
  </div>
</template>

<script>
export default {
  methods: {
    push(subapp) {
      history.pushState(null, subapp, subapp);
    },
  },
};
</script>
```

#### 二、子应用配置说明（qiankun-app）

***src/public-patrh.js*** 为子应用环境变量，用于判断主应用进入时的url地址

*根路径项目webpack_public_path = window.INJECTED_PUBLIC_PATH_BY_QIANKUN

***本项目子应用router base为qiankun-app故添加了‘qiankun-app/’后缀，根据项目自行修改**

 webpack_public_path = window.INJECTED_PUBLIC_PATH_BY_QIANKUN **+ 'qiankun-app/'**

```
// 1.修改运行时的public-path 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题。
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + 'qiankun-app/';
    console.log('__webpack_public_path__', __webpack_public_path__)
}
```

***src/router/index.js*** 主路由**（base根据实际情况自行修改）**

```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = resolve => require(['@/views/index'], resolve)
const About = resolve => require(['@/views/about.vue'], resolve)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
]

const router = new Router({
    base: '/qiankun-app', // 如果作为乾坤的子应用则使用主应用中配置的路由前缀，如果是独立运行则使用根目录
    mode: 'history',
    routes
})

export default router
```

***src/main.js*** 主文件配置

```
import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

let instance = null;
// 重新包装render方法
function render(props = {}) {
    const { container } = props;
    const renderContainer = container ? container.querySelector('#app') : '#app'; // 如果是作为子应用渲染，则渲染到主应用中配置的DOM节点中
    console.log('renderContainer', renderContainer)
    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount(renderContainer);
}
//引入乾坤加载路径
import './public-path';
// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props); // 作为子应用渲染时将主应用传入的配置作为参数去渲染
}

export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
}
```

#### 三、vue.config.js配置说明

```
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
    }
}
```

#### 四、常见问题参考官方说明

https://qiankun.umijs.org/zh/faq

1. 注意子应用mian.js必须导出生命周期
2. 注意public-path.js的路径是否正确
