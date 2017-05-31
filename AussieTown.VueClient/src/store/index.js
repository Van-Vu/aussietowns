import Vue from 'vue';
import Vuex from 'vuex';
import ListingService from "../services/listing.service";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        items: []
    },
    actions: {
        fetchItem: function (_a, id) {
            var commit = _a.commit;
            // return the Promise via `store.dispatch()` so that we know
            // when the data has been fetched
            return "route:" + id;
        },
        FETCH_LISTING: function (_a) {
            var commit = _a.commit, state = _a.state;
            if (state.items.length === 0) {
                return (new ListingService()).getListingById(2).then(function (data) {
                    commit('ADD_LISTING', data);
                });
            }
            else {
                return state.items;
            }
        }
    },
    mutations: {
        ADD_LISTING: function (state, items) {
            state.items.push(items);
        }
    }
});
