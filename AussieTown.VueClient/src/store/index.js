import Vue from 'vue';
import Vuex from 'vuex';
import ListingService from "../services/listing.service";
import UserService from "../services/user.service";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        listing: null,
        profile: null
    },
    actions: {
        FETCH_LISTING_BY_ID: function (_a, id) {
            var commit = _a.commit, state = _a.state;
            if (state.listing && state.listing.id === id) {
                return state.listing;
            }
            return (new ListingService()).getListingById(id).then(function (response) {
                commit('UPDATE_LISTING', response.data);
            });
        },
        UPDATE_LISTING: function (_a, listing) {
            var commit = _a.commit, state = _a.state;
            (new ListingService()).updateListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING: function (_a, listing) {
            var commit = _a.commit, state = _a.state;
            (new ListingService()).addListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        FETCH_USER_BY_ID: function (_a, id) {
            var commit = _a.commit, state = _a.state;
            if (state.profile && state.profile.id === id) {
                return state.profile;
            }
            return (new UserService()).getById(id).then(function (response) {
                console.log('inside fetch User:' + response);
                commit('UPDATE_USER', response.data);
            });
        },
        UPDATE_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).update(profile);
            commit('UPDATE_USER', profile);
        },
        INSERT_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).create(profile);
            commit('UPDATE_USER', profile);
        }
    },
    mutations: {
        UPDATE_LISTING: function (state, listing) {
            state.listing = listing;
        },
        UPDATE_USER: function (state, profile) {
            state.profile = profile;
        }
    }
});
