// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root'
import Vue from 'vue'
import merge from 'lodash.merge';
import ListingModel from './model/listing.model';
import { plainToClass } from "class-transformer";

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate')
        store.dispatch("ENABLE_LOADING")

        if (this.asyncData) {
            this.asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

if ((window as any).__INITIAL_STATE__) {
    // Bodom hack: loggInUser is fetched from Cookies
    //Reflect.deleteProperty((window as any).__INITIAL_STATE__, 'loggedInUser');

    // Bodom hack: retain listing state in case of direct browsing
    var initialState = (window as any).__INITIAL_STATE__;
    initialState.listing = plainToClass(ListingModel, initialState.listing); 

    store.replaceState(merge({}, store.state, initialState));
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.

    console.log('hit the client')

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // we only care about none-previously-rendered components,
        // so we compare them until the two matched lists differ
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // this is where we should trigger a loading indicator if there is one

        Promise.all(activated.map(c => {
            //console.log('here in client:' + (c as any).options.methods.asyncData)
            if ((c as any).options && (c as any).options.methods && (c as any).options.methods.asyncData) {
                return (c as any).options.methods.asyncData({ store, route: to })
            }

        // stop loading indicator

        })).then(() => {
            next()
        }).catch(next)
    })

    // actually mount to DOM
    app.$mount('#app')
})


//app.$mount('#app')