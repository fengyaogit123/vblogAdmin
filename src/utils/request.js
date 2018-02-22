import Vue from "vue";
import axios from 'axios';
import router from '@/router';
import utils from '@/utils/utils';
import $store from '@/store/index';
axios.defaults.timeout = 20 * 1000;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    config.headers.token = $store.state.users.token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    return res;
}, function (error) {
    if (!error.response) {
        utils.$Message.error('请求超时，请重试！');
        return Promise.reject(error);
    }
    let { status, data } = error.response;
    if (data.message) {
        utils.$Message.error(`${data.code}：${data.message}`);
    }
    if (status == 404) {
        utils.$Message.error('404:未找到资源,请重新登录！');
    }
    else if (status == 405) {
        utils.$Message.error('405:方法不被允许！');
    }
    else if (status == 504) {
        utils.$Message.error('504:服务器超时,请重新登录！');
        router.replace({ path: "/" });
        utils.storage.remove("getUserName");
    }
    return Promise.reject(status);
});
Vue.prototype.$http = axios;
export default axios;
