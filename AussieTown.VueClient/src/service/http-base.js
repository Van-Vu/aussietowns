import axios from 'axios';
import Vue from "vue";
Vue.prototype.$http = axios;
//export const http = axios.create({
//    baseURL: `http://10.0.0.98/meetthelocal/`
//})
//export const http = axios.create({
//    baseURL: `http://localhost/meetthelocal/`
//})
var http = axios.create({
    baseURL: "http://localhost:3514/",
});
http.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
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
    // Do something with response error
    if (error.response)
        return Promise.reject(error.response);
    //this.$store.dispatch("DISABLE_LOADING");
    //switch (error.status) {
    //    case 400:
    //        this.$store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
    //        break;
    //    case 403:
    //        this.$store.dispatch('SHOW_LOGIN_MODAL');
    //        this.$store.dispatch('ADD_NOTIFICATION', { title: "Login required", text: "Please login or register to proceed", type: NotificationType.Warning });
    //        break;
    //    case 500:
    //        this.$store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
    //        break;
    //}
    //this.$store.dispatch('LOG_ERROR', { message: `Listing page: ${error.data}`, stack: error.config.data });
    return Promise.reject(error);
});
export default http;
