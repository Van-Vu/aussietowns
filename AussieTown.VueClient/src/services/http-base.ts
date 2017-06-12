import axios from 'axios';

//export const http = axios.create({
//    baseURL: `http://localhost/meetthelocal/`
//})

const http = axios.create({
    baseURL: `http://localhost:3514/`
})

http.defaults.withCredentials = true;


// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('inside RESPONSE INTERCEPTOR');
    return response;
}, function (error) {
    // Do something with response error
    console.log('inside RESPONSE INTERCEPTOR');
    return Promise.reject(error);
});


export default http;