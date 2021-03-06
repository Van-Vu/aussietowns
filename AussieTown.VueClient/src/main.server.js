// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root';
var meta = app.$meta(); // here
var isDev = process.env.NODE_ENV !== 'production';
export default function (context) {
    if (context.cookies.mtl) {
        var mtl = JSON.parse(context.cookies.mtl);
        if (mtl && mtl.loggedInUser)
            store.state.loggedInUser = mtl.loggedInUser;
        if (context.cookies.mtltk)
            store.state.token = context.cookies.mtltk;
    }
    return new Promise(function (resolve, reject) {
        var s = isDev && Date.now();
        context.meta = meta; // and here
        // wait until router has resolved possible async components and hooks
        var routeReady = function () {
            var matchedComponents = router.getMatchedComponents();
            if (process.env.NODE_ENV !== 'production') {
                console.log("hit the server " + context.url);
            }
            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                reject({ code: 404 });
            }
            // call asyncData() on all matched route components
            Promise.all(matchedComponents.map(function (component) {
                //var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(component));
                //console.log('all Prop name: ' + propertyNames);
                //var propertySymbol = Object.getOwnPropertyNames(component);
                //console.log('all Symbol name: ' + propertySymbol);
                //var extendOptions = Object.getOwnPropertyNames((component as any).extendOptions);
                //console.log('all extendOptions name: ' + extendOptions);
                if (component && component.asyncData) {
                    return component.asyncData({
                        store: store,
                        route: router.currentRoute
                    });
                }
            })).then(function () {
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as window.__INITIAL_STATE__.
                isDev && console.log("data pre-fetch: " + (Date.now() - s) + "ms");
                context.state = store.state;
                resolve(app);
            }).catch(reject);
            // the Promise should resolve to the app instance so it can be rendered
            //resolve(app)
        };
        // set server-side router's location
        // Fix the refresh bug
        router.push(context.url, function () {
            router.onReady(routeReady, reject);
        }, function () {
            router.onReady(routeReady, reject);
        });
    });
};
