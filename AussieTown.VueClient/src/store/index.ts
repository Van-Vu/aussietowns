import Vue from 'vue'
import Vuex from 'vuex'
//import actions from './actions';
//import mutations from './mutations';
//import getters from './getters';
import listings from './modules/listing';

import products from './modules/products'
import ListingService from "../services/listing.service";
import UserService from "../services/user.service";

import ListingModel from '../components/model/listing.model';
import RequestResult from '../model/RequestResult';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        listing: null,
        profile: null
    },
    actions: {
        FETCH_LISTING_BY_ID({ commit, state }, id) {
            if (state.listing && (state.listing as any).id === id) {
                return state.listing;    
            }

            return (new ListingService()).getListingById(id).then(response => {
                commit('UPDATE_LISTING', (response as any).data);    
            });
        },
        UPDATE_LISTING({ commit, state }, listing) {
            (new ListingService()).updateListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING({ commit, state }, listing) {
            (new ListingService()).addListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        FETCH_USER_BY_ID({ commit, state }, id) {
            if (state.profile && (state.profile as any).id === id) {
                return state.profile;
            }

            return (new UserService()).getById(id).then(response => {
                console.log('inside fetch User:' + response);
                commit('UPDATE_USER', (response as any).data);
            });
        },
        UPDATE_USER({ commit, state }, profile) {
            (new UserService()).update(profile);
            commit('UPDATE_USER', profile);
        },
        INSERT_USER({ commit, state }, profile) {
            (new UserService()).create(profile);
            commit('UPDATE_USER', profile);
        }

    },
    mutations: {
        UPDATE_LISTING(state, listing) {
            state.listing = listing;
        },
        UPDATE_USER(state, profile) {
            state.profile = profile;
        }
    }
})