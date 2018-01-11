import axios from 'axios';
import Vue from "vue";
import store from '../store';
import { Utils } from '../component/utils';
Vue.prototype.$http = axios;
//export const http = axios.create({
//    baseURL: `http://192.168.1.52/meetthelocal/`
//})
//export const http = axios.create({
//    baseURL: `http://localhost/meetthelocal/`
//})
//const http = axios.create({
//    baseURL: `http://localhost:8888/`,
//})
//const http = axios.create({
//    baseURL: `http://10.0.0.98/meetthelocal/`,
//})
//const http = axios.create({
//    baseURL: `http://10.0.0.98:8000/`,
//})
export var http = axios.create({
    baseURL: "https://api.funwithlocal.com/"
});
http.defaults.withCredentials = true;
http.defaults.headers.common['Access-Control-Allow-Origin'] = Utils.getCurrentHost();
//axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
//axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Authorization';
//axios.defaults.headers.common['Access-Control-Request-Method'] = "GET, POST, OPTIONS";
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('XHR request:' + config.url);
    if (process.env.VUE_ENV === 'server') {
        http.defaults.headers.common = {};
        Object.keys(config.headers).map(function (key) {
            http.defaults.headers.common[key] = config.headers[key];
        });
        http.defaults.headers.common['Cookie'] = "mtltk=" + store.getters.token;
    }
    //console.log('Whole Config:' + store.getters.token);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Full code: https://github.com/mzabriskie/axios/issues/690
// Add a response interceptor
http.interceptors.response.use(function (response) {
    //console.log('from interceptor');
    //console.log(response);
    return response.data;
}, function (error) {
    //let originalRequest = error.config;
    //if (error.response.status === 401) {
    //    return '401';
    //}
    //if (error.response.status === 404) {
    //    window.location.href = '/';
    //    return;
    //}
    //if (error.response.status === 403) {
    //    window.location.href = '/';
    //    return;
    //}
    var response = error.response;
    //console.log('Bodom handleError');
    //console.log(error);
    if (response) {
        Utils.handleXHRError(store, response);
    }
    // Do something with response error
    if (error.response)
        return Promise.reject(error.response);
    return Promise.reject(error);
});
export default http;
