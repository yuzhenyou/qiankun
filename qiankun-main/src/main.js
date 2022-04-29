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


//引入qiankun
import startQiankun from "./micros";
//启动微应用
startQiankun();

