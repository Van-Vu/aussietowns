import axios from 'axios';
import Vue from "vue";


(Vue.prototype as any).$http = axios;


//export const http = axios.create({
//    baseURL: `http://10.0.0.98/meetthelocal/`
//})

//export const http = axios.create({
//    baseURL: `http://localhost/meetthelocal/`
//})

const http = axios.create({
    baseURL: `http://localhost:3514/`,
})

http.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Authorization';
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
http.interceptors.response.use(response => response, error => {
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
    // Do something with response error
    return Promise.reject(error);
});


export default http;