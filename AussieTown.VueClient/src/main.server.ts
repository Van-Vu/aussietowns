// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router } from './root'

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

      // the Promise should resolve to the app instance so it can be rendered
      resolve(app)
    }, reject)
  })

}

