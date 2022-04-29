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
    base: "/qiankun-main",
    mode: 'history',
    routes
})

export default router