import Vue from 'vue'
import Vuex from 'vuex'

import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
import UploadService from "../service/fileupload.service";

import ListingModel from '../model/listing.model';
import RequestResult from '../model/RequestResult';
import ConversationModel from '../model/conversation.model';
import MessageModel from '../model/message.model';

import { Utils } from '../component/utils';
import { plainToClass } from "class-transformer";

import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false }),
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
        booking: {}
    },
    getters: {
        isLoggedIn: state => {
            return ((typeof state.loggedInUser === 'object') && ((state.loggedInUser as any).email !== ''));
        },
        profilePhoto: state => {
            return (typeof state.loggedInUser === 'object') ? (state.loggedInUser as any).photoUrl : '';
        }
    },
    actions: {
        SET_CURRENT_USER({ commit, state }, loggedInUser) {
            return commit('UPDATE_CURRENT_USER', loggedInUser);
        },
        SET_CURRENT_PAGE({ commit }, page) {
            commit('UPDATE_PAGE', page);    
        },
        FETCH_LISTING_BY_ID({ commit, state }, id) {
            return (new ListingService()).getListingById(id)
                .then(response => commit('UPDATE_LISTING', (response as any).data));
        },
        UPDATE_LISTING({ commit, state }, listing) {
            (new ListingService()).updateListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING({ commit, state }, listing) {
            (new ListingService()).addListing(listing);
            commit('UPDATE_LISTING', listing);
        },
        FETCH_PROFILE_BY_ID({ dispatch, commit, state }, id) {
            return (new UserService()).getById(id).then(response => {
                commit('UPDATE_PROFILE', (response as any).data);
            });
        },
        UPDATE_USER({ commit, state }, profile) {
            (new UserService()).update(profile);
            commit('UPDATE_PROFILE', profile);
        },
        INSERT_USER({ commit, state }, profile) {
            (new UserService()).signup(profile);
            commit('UPDATE_PROFILE', profile);
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
        },
        SEND_MESSAGE({commit, state}, message)
        {
            return (new MessageService()).sendMessage(message).then(response => {
                commit('ADD_MESSAGE', (response as any).data);
            });                
        },
        ADD_NOTIFICATION({ commit }, notification) {
            commit('ADD_NOTIFICATION', notification);
        },
        REMOVE_NOTIFICATION({ commit }, notification) {
            commit('REMOVE_NOTIFICATION', notification);
        },
        UPLOAD_LISTING_IMAGES({ commit }, payload) {
            return (new UploadService()).uploadListing(payload.data, payload.actionId)
                .then(response => {
                    commit('UPDATE_LISTING_IMAGES', response.newImages);
                });
        },
        UPLOAD_PROFILE_IMAGES({ commit }, payload) {
            return (new UploadService()).uploadProfile(payload.data, payload.actionId)
                .then(response => commit('UPDATE_PROFILE_IMAGES', response.url));
        },
        REMOVE_IMAGE({ commit }, payload) {
            return (new ListingService()).deleteImage(payload.listingId, payload.url)
                .then(response => {
                    //commit('UPDATE_LISTING_IMAGES', response);
                });
        },
        UPDATE_BOOKING({ commit }, payload) {
            commit('UPDATE_BOOKING', payload);
        },
        TEST({ commit, state }, payload) {
            (new UserService()).getMiniProfile(1).catch(error => commit('ADD_NOTIFICATION', error));
        }
    },
    mutations: {
        UPDATE_PAGE(state, page) {
            Vue.set(state, 'currentPage', page);
        },
        UPDATE_LISTING(state, listing) {
            console.log('update listing');
            let listingObject = plainToClass(ListingModel, listing);
            Vue.set(state, 'listing', listingObject);
        },
        UPDATE_PROFILE(state, profile) {
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
        },
        ADD_MESSAGE(state, message) {
            state.conversationsContent.push(message);
        },
        UPDATE_CURRENT_USER(state, loggedInUser) {
            state.loggedInUser = loggedInUser;
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION(state, notification) {
            Vue.set(state, 'notifications', Utils.removeFromArray(state.notifications, notification));
        },
        UPDATE_LISTING_IMAGES(state, listingImages) {
            if ((state.listing as any).imageList) {
                listingImages.map(x => (state.listing as any).imageList.push(x));
            } else {
                Vue.set(state.listing, 'imageList', listingImages);
            }
        },
        UPDATE_PROFILE_IMAGES(state, profileImages) {
            (state.profile as any).images = profileImages;
        },
        UPDATE_BOOKING(state, payload) {
            Vue.set(state,'booking', payload);
        }
    }
})