import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from "vue-class-component";

sync(store, router)

// Register the router hooks with thier names
//Component.registerHooks([
//    'asyncData'
//])


const app = new Vue({
    router,
    store,
  render: h => h(App)
})

export { app, router, store }