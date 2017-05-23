import Vue from 'vue';
import App from './App.vue';
import router from './router';
var app = new Vue({
    router: router,
    render: function (h) { return h(App); }
});
export { app, router };
