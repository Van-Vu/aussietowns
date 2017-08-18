//https://github.com/leonardovilarinho/vue-acl
import store from '../store';
import { UserRole, UserAction, NotificationType } from '../model/enum';
var Auth = (function () {
    function Auth() {
        this.role = 0;
        this.userId = 0;
        //store.subscribe((mutation, state) => {
        //    //if (filter(mutation)) {
        //    //    setState(key, reducer(state, paths), storage);
        //    //}
        //})
    }
    Auth.prototype.initialize = function (router, permissions) {
        this.router = router;
        this.permissions = Array.isArray(permissions) ? permissions : [permissions];
    };
    Auth.prototype.check = function (permission, userId, action) {
        if (permission === void 0) { permission = UserRole.Anonymous; }
        if (userId === void 0) { userId = -1; }
        if (action === void 0) { action = UserAction.View; }
        if (typeof permission != 'undefined') {
            //const permissions = (permission.indexOf('|') !== -1) ? permission.split('|') : [permission];
            //return permissions.find((permission) => {
            //    const needed = (permission.indexOf('&') !== -1) ? permission.split('&') : permission;
            //    if (Array.isArray(needed)) {
            //        return needed.every(need => {
            //            return this.permissions.indexOf(need) !== -1;
            //        });
            //    }
            //    return (this.permissions.indexOf(needed) !== -1) ? true : false;
            //}) !== undefined;
            console.log('from here');
            var loggedInUser = store.state.loggedInUser;
            if (loggedInUser.id && loggedInUser.role) {
                // Author
                if (userId === loggedInUser.id) {
                    return true;
                }
                if (loggedInUser.role < permission)
                    return false;
            }
            else {
                return action === UserAction.View;
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Auth.prototype, "router", {
        set: function (router) {
            var _this = this;
            router.beforeEach(function (to, from, next) {
                var fail = to.meta.fail || '/';
                if (typeof to.meta.permission == 'undefined')
                    next();
                else {
                    if (!_this.check(to.meta.permission)) {
                        if (_this.userId == UserRole.Anonymous) {
                            //trigger Login
                            //store.dispatch('SHOW_LOGIN_MODAL')
                            store.dispatch('ADD_NOTIFICATION', { title: "Login Required", text: "Please Login or Register to explore more. It's Free !", type: NotificationType.Warning });
                            return next(false);
                        }
                        return next(fail);
                    }
                    next();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    return Auth;
}());
export default {
    install: function (Vue, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.router, router = _c === void 0 ? {} : _c, _d = _b.init, init = _d === void 0 ? {} : _d;
        var acl = new Auth();
        acl.initialize(router, init);
        Vue.prototype.$can = function (permission, authorId) {
            if (authorId === void 0) { authorId = false; }
            if (acl.userId === authorId) {
                return true;
            }
            acl.check(permission);
        };
        Vue.prototype.$access = function (newAccess) {
            if (newAccess === void 0) { newAccess = null; }
            if (newAccess != null) {
                if (Array.isArray(newAccess))
                    acl.permissions = newAccess;
                else if (newAccess.indexOf('&') !== -1)
                    acl.permissions = newAccess.split('&');
                else
                    acl.permissions = [newAccess];
            }
            else
                return acl.permissions;
        };
        Vue.prototype.$auth = acl;
        // Bodom hack: use this in store UPDATE_CURRENT_USER
        // Vue.$auth = acl;
    }
};
//export default Acl;
////let acl = new Acl()
////Acl.install = function (Vue, { router, init }) {
////    acl.init(router, init)
////    Vue.prototype.$can = function (permission) {
////        return acl.check(permission)
////    }
////    Vue.prototype.$access = function (newAccess = null) {
////        if (newAccess != null) {
////            if (Array.isArray(newAccess))
////                acl.permissions = newAccess
////            else if (newAccess.indexOf('&') !== -1)
////                acl.permissions = newAccess.split('&')
////            else
////                acl.permissions = [newAccess]
////        }
////        else
////            return acl.permissions
////    }
////}
////export default Acl 
