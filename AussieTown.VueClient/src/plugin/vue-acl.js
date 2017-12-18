//https://github.com/leonardovilarinho/vue-acl
import store from '../store';
import { UserRole, UserAction, NotificationType } from '../model/enum';
var Auth = /** @class */ (function () {
    function Auth() {
        this.role = 0;
        this.userId = 0;
    }
    Auth.prototype.initialize = function (router, permissions) {
        this.router = router;
        this.permissions = Array.isArray(permissions) ? permissions : [permissions];
    };
    Auth.prototype.check = function (permission, userId, action, isPublic) {
        if (permission === void 0) { permission = UserRole.Anonymous; }
        if (userId === void 0) { userId = -1; }
        if (action === void 0) { action = UserAction.View; }
        if (isPublic === void 0) { isPublic = true; }
        if (typeof permission != 'undefined') {
            var loggedInUser = store.state.loggedInUser;
            if (loggedInUser && loggedInUser.id && loggedInUser.role) {
                // Author
                if (userId == loggedInUser.id) {
                    return true;
                }
                if (loggedInUser.role < permission)
                    return false;
            }
            else {
                return isPublic && action === UserAction.View;
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Auth.prototype, "router", {
        set: function (router) {
            router.beforeEach(function (to, from, next) {
                //let fail = to.meta.fail || '/'
                //if (typeof to.meta.permission == 'undefined')
                //    next()
                //else {
                //    if (!this.check(to.meta.permission, to.params.profileId, UserAction.View, to.meta.isPublic)) {
                //        store.dispatch('ADD_NOTIFICATION', { title: "Login Required", text: "Please Login or Register to explore more. It's super easy", type: NotificationType.Warning });
                //        if (this.role !== UserRole.Anonymous) {
                //            console.log('ACL false');
                //            return next(false)
                //        }
                //        if (to.meta.returnRequired) {
                //            fail += `?returnUrl=${to.fullPath}`;
                //        }
                //        console.log('ACL fail:' + fail);
                //        return next(fail)
                //    }
                //    next()
                //}
                var fail = to.meta.fail || '/';
                if (typeof to.meta.permission == 'undefined' || to.meta.permission == UserRole.Anonymous)
                    next();
                else {
                    if (to.meta.isPublic != 'undefined' && to.meta.isPublic)
                        next();
                    else {
                        if (store.getters.isLoggedIn) {
                            next();
                        }
                        else {
                            store.dispatch('ADD_NOTIFICATION', { title: "Login Required", text: "Please Login or Register to explore more. It's super easy", type: NotificationType.Warning });
                            // Bodom: comeback
                            //next(fail)
                            next();
                        }
                    }
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
    }
};
