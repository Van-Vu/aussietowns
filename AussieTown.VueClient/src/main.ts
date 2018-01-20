// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root'
import Vue from 'vue'
import merge from 'lodash.merge';
import ListingModel from './model/listing.model';
import UserModel from './model/user.model';
import { plainToClass } from "class-transformer";
import VueAnalytics from 'vue-ua';
import { Utils } from './component/utils';

Vue.use(VueAnalytics, {
    // [Required] The name of your app as specified in Google Analytics.
    appName: 'FunWithLocal',
    // [Required] The version of your app.
    appVersion: '1.0',
    // [Required] Your Google Analytics tracking ID.
    trackingId: 'UA-110375519-2'
})

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
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
    initialState.loggedInUser = plainToClass(UserModel, initialState.loggedInUser); 

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
        

        Promise.all(activated.map(component => {
            //console.log('here in client:' + (c as any).options.methods.asyncData)
            if (component && (component as any).asyncData) {
                return (component as any).asyncData({ store, route: to })
            }

        // stop loading indicator
        


        })).then(() => {
            next()
        }).catch((err) => {
            Utils.handleRouteError(store, to, err);
            if (process.env.NODE_ENV !== 'production') {
                console.log('Bodom catch')
                console.log(err)
            }
            next()
        })
    })

    // actually mount to DOM
    app.$mount('#app')
})

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
//        console.log('ServiceWorker registration successful!');
//    }).catch(function (err) {
//        console.log('ServiceWorker registration failed: ', err);
//    });
//}

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}