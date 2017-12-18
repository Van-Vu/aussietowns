import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import Component from "vue-class-component";
sync(store, router);
// DO NOT REMOVE, IT WORKS
// Register the router hooks with thier names
Component.registerHooks([
    'asyncData',
    'metaInfo'
]);
var app = new Vue({
    router: router,
    store: store,
    render: function (h) { return h(App); }
});
export { app, router, store };
