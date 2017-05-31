// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root'

export default context => {
  return new Promise((resolve, reject) => {
    // set server-side router's location
    router.push(context.url)

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()

      // no matched routes, reject with 404
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      console.log('router: ' + router);
        console.log('matchedcomponent: ' + matchedComponents);
      // call asyncData() on all matched route components
      Promise.all(matchedComponents.map(component => {
          console.log('inside mainserver: ' + (component as any).asyncData);
          if ((component as any).asyncData) {
              return (component as any).asyncData({
                  store,
                  route: router.currentRoute
              })
          }
      })).then(() => {
          // After all preFetch hooks are resolved, our store is now
          // filled with the state needed to render the app.
          // When we attach the state to the context, and the `template` option
          // is used for the renderer, the state will automatically be
          // serialized and injected into the HTML as window.__INITIAL_STATE__.
          console.log('store.state: ' + (store.state as any).items);

          context.state = store.state

          resolve(app)
          }).catch(reject)

      // the Promise should resolve to the app instance so it can be rendered
      // resolve(app)
    }, reject)
  })

}
