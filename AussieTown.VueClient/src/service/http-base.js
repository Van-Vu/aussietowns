import axios from 'axios';
import Vue from "vue";
import store from '../store';
import { Utils } from '../component/utils';
Vue.prototype.$http = axios;
//export const http = axios.create({
//    baseURL: `http://10.0.0.98/meetthelocal/`
//})
//export const http = axios.create({
//    baseURL: `http://localhost/meetthelocal/`
//})
//const http = axios.create({
//    baseURL: `http://localhost:7048/`,
//})
export var http = axios.create({
    baseURL: "https://api.funwithlocal.com/"
});
http.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://www.funwithlocal.com';
//axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
//axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Authorization';
//axios.defaults.headers.common['Access-Control-Request-Method'] = "GET, POST, PUT, DELETE, OPTIONS";
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Full code: https://github.com/mzabriskie/axios/issues/690
// Add a response interceptor
http.interceptors.response.use(function (response) {
    console.log('from interceptor');
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
    console.log('Bodom handleError');
    if (response) {
        Utils.handleError(store, response);
    }
    // Do something with response error
    if (error.response)
        return Promise.reject(error.response);
    return Promise.reject(error);
});
export default http;
