import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = resolve => require(['@/views/index'], resolve)

const routes = [
    {
        path: '/',
        name: '主页',
        component: Index
    }
]

const router = new Router({
    base: "/qiankun-main", //配合nginx生产发布,https://xxx.com//qiankun-main,具体根据部署动态修改
    mode: 'history',
    routes
})

export default router