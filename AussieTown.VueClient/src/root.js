import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
sync(store, router);
var app = new Vue({
    router: router,
    store: store,
    render: function (h) { return h(App); }
});
export { app, router, store };
