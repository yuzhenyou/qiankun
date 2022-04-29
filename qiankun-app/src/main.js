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