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