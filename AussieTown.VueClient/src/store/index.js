import Vue from 'vue';
import Vuex from 'vuex';
//import actions from './actions';
//import mutations from './mutations';
//import getters from './getters';
import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
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
        SET_CURRENT_PAGE: function (_a, page) {
            var commit = _a.commit;
            commit('UPDATE_PAGE', page);
        },
        FETCH_LISTING_BY_ID: function (_a, id) {
            var commit = _a.commit, state = _a.state;
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
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new UserService()).getById(id).then(function (response) {
                console.log('fetch User');
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
        },
        SEARCH_LISTINGS_BY_SUBURB: function (_a, suburbId) {
            var commit = _a.commit, state = _a.state;
            return (new ListingService()).getListingBySuburb(suburbId).then(function (response) {
                commit('UPDATE_SEARCH_LISTINGS', response.data);
            });
        },
        FETCH_CONVERSATIONS_BY_USER: function (_a, userId) {
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new MessageService()).getConversations(userId).then(function (response) {
                commit('UPDATE_CONVERSATIONS', response.data);
            });
        },
        FETCH_CONVERSATION_CONTENT: function (_a, conversationId) {
            var commit = _a.commit, state = _a.state;
            return (new MessageService()).getConversationContent(conversationId).then(function (response) {
                commit('UPDATE_CONVERSATION_MESSAGES', response.data);
            });
        }
    },
    mutations: {
        UPDATE_PAGE: function (state, page) {
            Vue.set(state, 'currentPage', page);
        },
        UPDATE_LISTING: function (state, listing) {
            Vue.set(state, 'listing', listing);
        },
        UPDATE_USER: function (state, profile) {
            state.profile = profile;
        },
        UPDATE_SEARCH_LISTINGS: function (state, listings) {
            state.searchListings = listings;
        },
        UPDATE_CONVERSATIONS: function (state, conversations) {
            state.conversations = conversations;
        },
        UPDATE_CONVERSATION_MESSAGES: function (state, messages) {
            if (state.conversationsContent == null) {
                state.conversationsContent = new Array();
            }
            state.conversationsContent.push(messages);
        }
    }
});
