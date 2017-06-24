const install = function (Vue, options) {
    // 1. add global method or property
    Vue.myGlobalMethod = () => 'heythere'
}


//const install = (Vue, options) => {
//    Vue.prototype.$config = Vue.$config = {base: 'asdfasdfasfda'}
//}

export default {
    install
}