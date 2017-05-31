import Vue from 'vue'
import Vuex from 'vuex'
//import actions from './actions';
//import mutations from './mutations';
//import getters from './getters';
import listings from './modules/listing';

import products from './modules/products'
import ListingService from "../services/listing.service";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        items: []
    },
    actions: {
        fetchItem({ commit }, id) {
            // return the Promise via `store.dispatch()` so that we know
            // when the data has been fetched
            return "route:" + id
        },

        FETCH_LISTING({ commit, state }) {
            if (state.items.length === 0) {
                return (new ListingService()).getListingById(2).then(data => {
                    commit('ADD_LISTING', data);
                });
            } else {
                return state.items;
            }
        }
    },
    mutations: {
        ADD_LISTING(state, items) {
            state.items.push(items);
        }
    }
})