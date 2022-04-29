// 1.修改运行时的public-path 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题。
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + 'qiankun-app/';
    console.log('__webpack_public_path__', __webpack_public_path__)
}