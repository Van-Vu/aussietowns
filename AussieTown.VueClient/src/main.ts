// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root'
import Vue from 'vue'

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

if ((window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }

        Promise.all(activated.map(c => {
            console.log('here in client:' + (c as any).asyncData)
            if ((c as any).asyncData) {
                return (c as any).asyncData({ store, route: to })
            }
        })).then(() => {
            next()
        }).catch(next)
    })

    // actually mount to DOM
    app.$mount('#app')
})


//app.$mount('#app')