//https://github.com/leonardovilarinho/vue-acl
import store from '../store';
import User from '../model/user.model';
import { UserRole, NotificationType } from '../model/enum';

class Auth {
    //public router: any;
    public permissions: any;
    public role: any = 0;
    public userId: any = 0;

    initialize(router, permissions) {
        this.router = router;
        this.permissions = Array.isArray(permissions) ? permissions : [permissions];
    }

    check(permission = 0, userId = -1) {
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
            const loggedInUser = store.state.loggedInUser;
            //if (!(loggedInUser instanceof User)) {
            //    return false;
            //}

            if (userId === (loggedInUser as any).id) {
                return true;
            }

            if ((loggedInUser as any).role < permission) return false;

            return true;
        }
        return false;
    }

    set router(router) {
        router.beforeEach((to, from, next) => {
            const fail = to.meta.fail || '/'
            if (typeof to.meta.permission == 'undefined')
                next()
            else {
                if (!this.check(to.meta.permission)) {
                    if (this.userId == UserRole.Anonymous) {
                        //trigger Login
                        //store.dispatch('SHOW_LOGIN_MODAL')
                        store.dispatch('ADD_NOTIFICATION', { title: "Login Required", text: "Please Login or Register to explore more. It's Free !", type: NotificationType.Warning });

                        return next(false)
                    }
                    return next(fail)
                }
                next()
            }
        })
    }    

        //store.subscribe((mutation, state) => {
    //    //if (filter(mutation)) {
    //    //    setState(key, reducer(state, paths), storage);
    //    //}
    //})
}


export default {
    install(Vue, {
        router = {},
        init = {}
    } = {}) {
        let acl = new Auth();

        acl.initialize(router, init);

        Vue.prototype.$can = (permission, authorId = false) => {
            if (acl.userId === authorId) {
                return true;
            }
            acl.check(permission);
        };

        Vue.prototype.$access = (newAccess = null) => {
            if (newAccess != null) {
                if (Array.isArray(newAccess))
                    acl.permissions = newAccess;
                else if (newAccess.indexOf('&') !== -1)
                    acl.permissions = newAccess.split('&');
                else
                    acl.permissions = [newAccess];
            } else
                return acl.permissions;
        }

        Vue.prototype.$auth = acl;

        // Bodom hack: use this in store UPDATE_CURRENT_USER
        // Vue.$auth = acl;
    }
}

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