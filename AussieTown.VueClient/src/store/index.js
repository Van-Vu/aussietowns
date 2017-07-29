import Vue from 'vue';
import Vuex from 'vuex';
import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
import UploadService from "../service/fileupload.service";
import ListingModel from '../model/listing.model';
import { Utils } from '../component/utils';
import { plainToClass } from "class-transformer";
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            getState: function (key) { return Cookies.getJSON(key); },
            setState: function (key, state) { return Cookies.set(key, state, { expires: 3, secure: false }); },
            key: 'mtl',
            paths: ['loggedInUser']
        })
    ],
    state: {
        currentPage: '',
        loggedInUser: '',
        listing: ListingModel,
        profile: {},
        searchListings: [],
        conversations: [],
        conversationsContent: [],
        message: '',
        notifications: [],
        booking: {},
        isLoading: '',
        pageCss: ''
    },
    getters: {
        isLoggedIn: function (state) {
            return ((typeof state.loggedInUser === 'object') && (state.loggedInUser.email !== ''));
        },
        profilePhoto: function (state) {
            return (typeof state.loggedInUser === 'object') ? state.loggedInUser.photoUrl : '';
        }
    },
    actions: {
        SET_CURRENT_USER: function (_a, loggedInUser) {
            var commit = _a.commit, state = _a.state;
            return commit('UPDATE_CURRENT_USER', loggedInUser);
        },
        SET_CURRENT_PAGE: function (_a, page) {
            var commit = _a.commit;
            commit('UPDATE_PAGE', page);
        },
        FETCH_LISTING_BY_ID: function (_a, id) {
            var commit = _a.commit, state = _a.state;
            return (new ListingService()).getListingById(id)
                .then(function (response) { return commit('UPDATE_LISTING', response.data); });
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
        FETCH_PROFILE_BY_ID: function (_a, id) {
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new UserService()).getById(id).then(function (response) {
                commit('UPDATE_PROFILE', response.data);
            });
        },
        UPDATE_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).update(profile);
            commit('UPDATE_PROFILE', profile);
        },
        INSERT_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).signup(profile);
            commit('UPDATE_PROFILE', profile);
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
        },
        SEND_MESSAGE: function (_a, message) {
            var commit = _a.commit, state = _a.state;
            return (new MessageService()).sendMessage(message).then(function (response) {
                commit('ADD_MESSAGE', response.data);
            });
        },
        ADD_NOTIFICATION: function (_a, notification) {
            var dispatch = _a.dispatch, commit = _a.commit;
            commit('ADD_NOTIFICATION', notification);
            setTimeout(function () { dispatch('REMOVE_NOTIFICATION', notification); }, 10000);
        },
        REMOVE_NOTIFICATION: function (_a, notification) {
            var commit = _a.commit;
            commit('REMOVE_NOTIFICATION', notification);
        },
        UPLOAD_LISTING_IMAGES: function (_a, payload) {
            var commit = _a.commit;
            return (new UploadService()).uploadListing(payload.data, payload.actionId)
                .then(function (response) {
                commit('UPDATE_LISTING_IMAGES', response.newImages);
            });
        },
        UPLOAD_PROFILE_IMAGES: function (_a, payload) {
            var commit = _a.commit;
            return (new UploadService()).uploadProfile(payload.data, payload.actionId)
                .then(function (response) { return commit('UPDATE_PROFILE_IMAGES', response.url); });
        },
        REMOVE_IMAGE: function (_a, payload) {
            var commit = _a.commit;
            return (new ListingService()).deleteImage(payload.listingId, payload.url)
                .then(function (response) {
                //commit('UPDATE_LISTING_IMAGES', response);
            });
        },
        UPDATE_BOOKING: function (_a, payload) {
            var commit = _a.commit;
            commit('UPDATE_BOOKING', payload);
        },
        ENABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', true);
        },
        DISABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', false);
        },
        TEST: function (_a, payload) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).getMiniProfile(1).catch(function (error) { return commit('ADD_NOTIFICATION', error); });
        }
    },
    mutations: {
        UPDATE_PAGE: function (state, page) {
            Vue.set(state, 'currentPage', page);
        },
        UPDATE_LISTING: function (state, listing) {
            console.log('update listing');
            var listingObject = plainToClass(ListingModel, listing);
            Vue.set(state, 'listing', listingObject);
        },
        UPDATE_PROFILE: function (state, profile) {
            state.profile = profile;
        },
        UPDATE_SEARCH_LISTINGS: function (state, listings) {
            state.searchListings = listings;
        },
        UPDATE_CONVERSATIONS: function (state, conversations) {
            state.conversations = conversations;
        },
        UPDATE_CONVERSATION_MESSAGES: function (state, messages) {
            //if (state.conversationsContent == null) {
            //    state.conversationsContent = new Array<MessageModel>();
            //}
            //state.conversationsContent.push(messages);
            Vue.set(state, 'conversationsContent', messages);
        },
        ADD_MESSAGE: function (state, message) {
            state.conversationsContent.push(message);
        },
        UPDATE_CURRENT_USER: function (state, loggedInUser) {
            state.loggedInUser = loggedInUser;
        },
        ADD_NOTIFICATION: function (state, notification) {
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION: function (state, notification) {
            Vue.set(state, 'notifications', Utils.removeFromArray(state.notifications, notification));
        },
        UPDATE_LISTING_IMAGES: function (state, listingImages) {
            if (state.listing.imageList) {
                listingImages.map(function (x) { return state.listing.imageList.push(x); });
            }
            else {
                Vue.set(state.listing, 'imageList', listingImages);
            }
        },
        UPDATE_PROFILE_IMAGES: function (state, profileImages) {
            state.profile.images = profileImages;
        },
        UPDATE_BOOKING: function (state, payload) {
            Vue.set(state, 'booking', payload);
        },
        ISLOADING: function (state, value) {
            Vue.set(state, 'isLoading', value);
        }
    }
});
