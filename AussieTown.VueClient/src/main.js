// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root';
import Vue from 'vue';
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate: function (to, from, next) {
        var asyncData = this.$options.asyncData;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        }
        else {
            next();
        }
    }
});
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady(function () {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve(function (to, from, next) {
        var matched = router.getMatchedComponents(to);
        var prevMatched = router.getMatchedComponents(from);
        var diffed = false;
        var activated = matched.filter(function (c, i) {
            return diffed || (diffed = (prevMatched[i] !== c));
        });
        if (!activated.length) {
            return next();
        }
        Promise.all(activated.map(function (c) {
            console.log('here in client:' + c.asyncData);
            if (c.asyncData) {
                return c.asyncData({ store: store, route: to });
            }
        })).then(function () {
            next();
        }).catch(next);
    });
    // actually mount to DOM
    app.$mount('#app');
});
//app.$mount('#app') 
