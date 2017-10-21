// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root';
var meta = app.$meta(); // here
export default function (context) {
    if (context.cookies.mtl) {
        var mtl = JSON.parse(context.cookies.mtl);
        if (mtl.loggedInUser)
            store.state.loggedInUser = mtl.loggedInUser;
    }
    return new Promise(function (resolve, reject) {
        // set server-side router's location
        router.push(context.url);
        context.meta = meta; // and here
        // wait until router has resolved possible async components and hooks
        router.onReady(function () {
            var matchedComponents = router.getMatchedComponents();
            console.log("hit the server " + context.url);
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
                //console.log('all Symbol name: ' + extendOptions);
                if (component && component.extendOptions && component.extendOptions.asyncData) {
                    return component.extendOptions.asyncData({
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
                context.state = store.state;
                resolve(app);
            }).catch(reject);
            // the Promise should resolve to the app instance so it can be rendered
            //resolve(app)
        }, reject);
    });
};
