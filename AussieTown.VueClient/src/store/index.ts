import Vue from 'vue'
import Vuex from 'vuex'
//import actions from './actions';
//import mutations from './mutations';
//import getters from './getters';
import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";

import ListingModel from '../model/listing.model';
import RequestResult from '../model/RequestResult';
import ConversationModel from '../model/conversation.model';
import MessageModel from '../model/message.model';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        currentPage: '',
        listing: {},
        profile: {},
        searchListings: [],
        conversations: [],
        conversationsContent: []
    },
    actions: {
        SET_CURRENT_PAGE({ commit }, page) {
            commit('UPDATE_PAGE', page);    
        },
        FETCH_LISTING_BY_ID({ commit, state }, id) {
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
        FETCH_USER_BY_ID({ dispatch, commit, state }, id) {
            return (new UserService()).getById(id).then(response => {
                console.log('fetch User');
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
        },
        SEARCH_LISTINGS_BY_SUBURB({ commit, state }, suburbId) {
            return (new ListingService()).getListingBySuburb(suburbId).then(response => {
                commit('UPDATE_SEARCH_LISTINGS', (response as any).data);
            });
        },
        FETCH_CONVERSATIONS_BY_USER({dispatch, commit, state }, userId) {
            return (new MessageService()).getConversations(userId).then(response => {
                commit('UPDATE_CONVERSATIONS', (response as any).data);
            });
        },
        FETCH_CONVERSATION_CONTENT({ commit, state }, conversationId) {
            return (new MessageService()).getConversationContent(conversationId).then(response => {
                commit('UPDATE_CONVERSATION_MESSAGES', (response as any).data);
            });            
        }
    },
    mutations: {
        UPDATE_PAGE(state, page) {
            Vue.set(state, 'currentPage', page);
        },
        UPDATE_LISTING(state, listing) {
            Vue.set(state, 'listing', listing);
        },
        UPDATE_USER(state, profile) {
            state.profile = profile;
        },
        UPDATE_SEARCH_LISTINGS(state, listings) {
            state.searchListings = listings;
        },
        UPDATE_CONVERSATIONS(state, conversations) {
            state.conversations = conversations;
        },
        UPDATE_CONVERSATION_MESSAGES(state, messages) {
            //if (state.conversationsContent == null) {
            //    state.conversationsContent = new Array<MessageModel>();
            //}
            //state.conversationsContent.push(messages);

            Vue.set(state, 'conversationsContent', messages);
        }
    }
})