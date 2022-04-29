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