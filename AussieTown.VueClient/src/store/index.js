import Vue from 'vue';
import Vuex from 'vuex';
import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
import UploadService from "../service/fileupload.service";
import ListingModel from '../model/listing.model';
import UserModel from '../model/user.model';
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
            filter: function (mutation) { return mutation.type === 'UPDATE_CURRENT_USER'; },
            key: 'mtl',
            paths: ['loggedInUser']
        })
    ],
    state: {
        currentPage: '',
        loggedInUser: UserModel,
        listing: ListingModel,
        profile: {},
        searchListings: [],
        conversations: [],
        conversationsContent: [],
        message: '',
        notifications: [],
        booking: {},
        isLoading: '',
        featureListings: [],
        dynamicModal: {},
        showLoginModal: false,
        showScheduleModal: false
    },
    getters: {
        isLoggedIn: function (state) {
            return typeof state.loggedInUser.email != 'undefined' && state.loggedInUser.email !== '';
        },
        profilePhoto: function (state) {
            return state.loggedInUser.photoUrl;
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
                .then(function (response) {
                commit('UPDATE_LISTING', response);
            });
        },
        FETCH_FEATURELISTINGS: function (_a) {
            var commit = _a.commit;
            return (new ListingService()).getFeatureListings()
                .then(function (response) {
                commit('UPDATE_FEATURELISTINGS', response);
            });
        },
        UPDATE_LISTING: function (_a, listing) {
            var commit = _a.commit, state = _a.state;
            return (new ListingService()).updateListing(listing)
                .then(function (response) { return response; });
            //commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING: function (_a, listing) {
            var commit = _a.commit, state = _a.state;
            return (new ListingService()).addListing(listing)
                .then(function (response) { return response; });
            //commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING_OPERATOR: function (_a, operator) {
            var commit = _a.commit, state = _a.state;
            commit('INSERT_OPERATOR', operator);
        },
        REMOVE_LISTING_OPERATOR: function (_a, operator) {
            var commit = _a.commit, state = _a.state;
            commit('DELETE_OPERATOR', operator);
        },
        FETCH_PROFILE_BY_ID: function (_a, id) {
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new UserService()).getById(id).then(function (response) {
                commit('UPDATE_PROFILE', response);
            });
        },
        UPDATE_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            return (new UserService()).update(profile)
                .then(function (response) {
                commit('UPDATE_PROFILE', profile);
                return response;
            });
        },
        INSERT_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            (new UserService()).signup(profile);
            commit('UPDATE_PROFILE', profile);
        },
        SEARCH_LISTINGS_BY_SUBURB: function (_a, suburbId) {
            var commit = _a.commit, state = _a.state;
            return (new ListingService()).getListingBySuburb(suburbId).then(function (response) {
                commit('UPDATE_SEARCH_LISTINGS', response);
            });
        },
        FETCH_CONVERSATIONS_BY_USER: function (_a, userId) {
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new MessageService()).getConversations(userId).then(function (response) {
                commit('UPDATE_CONVERSATIONS', response);
            });
        },
        FETCH_CONVERSATION_CONTENT: function (_a, conversationId) {
            var commit = _a.commit, state = _a.state;
            return (new MessageService()).getConversationContent(conversationId).then(function (response) {
                commit('UPDATE_CONVERSATION_MESSAGES', response);
            });
        },
        SEND_MESSAGE: function (_a, message) {
            var commit = _a.commit, state = _a.state;
            return (new MessageService()).sendMessage(message).then(function (response) {
                if (response == 1) {
                    commit('ADD_MESSAGE', message);
                }
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
                commit('ADD_LISTING_IMAGES', response);
                return response.length;
            });
        },
        UPLOAD_PROFILE_IMAGES: function (_a, payload) {
            var commit = _a.commit;
            return (new UploadService()).uploadProfile(payload.data, payload.actionId)
                .then(function (response) { return commit('ADD_PROFILE_IMAGES', response); });
        },
        REMOVE_IMAGE: function (_a, payload) {
            var commit = _a.commit;
            return (new ListingService()).deleteImage(payload.listingId, payload.url)
                .then(function (response) {
                commit('REMOVE_LISTING_IMAGES', payload.url);
            });
        },
        UPDATE_BOOKING: function (_a, payload) {
            var commit = _a.commit;
            commit('UPDATE_BOOKING', payload);
        },
        ADD_BOOKING_PARTICIPANT: function (_a, user) {
            var commit = _a.commit;
            commit('ADD_BOOKING_PARTICIPANT', user);
        },
        REMOVE_BOOKING_PARTICIPANT: function (_a, index) {
            var commit = _a.commit;
            commit('REMOVE_BOOKING_PARTICIPANT', index);
        },
        ENABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', true);
        },
        DISABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', false);
        },
        SHOW_LOGIN_MODAL: function (_a) {
            var commit = _a.commit;
            commit('TOGGLE_LOGIN_MODAL', true);
        },
        HIDE_LOGIN_MODAL: function (_a) {
            var commit = _a.commit;
            commit('TOGGLE_LOGIN_MODAL', false);
        },
        SHOW_SCHEDULE_MODAL: function (_a, payload) {
            var commit = _a.commit;
            commit('TOGGLE_SCHEDULE_MODAL', { state: true, data: payload });
        },
        HIDE_SCHEDULE_MODAL: function (_a) {
            var commit = _a.commit;
            commit('TOGGLE_SCHEDULE_MODAL', { state: false });
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
            var listingObject = plainToClass(ListingModel, listing);
            Vue.set(state, 'listing', listingObject);
        },
        UPDATE_FEATURELISTINGS: function (state, listings) {
            state.featureListings = listings;
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
            state.conversationsContent.unshift(message);
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
        ADD_LISTING_IMAGES: function (state, listingImages) {
            if (state.listing.imageList) {
                listingImages.map(function (x) { return state.listing.imageList.push(x); });
            }
            else {
                Vue.set(state.listing, 'imageList', listingImages);
            }
        },
        REMOVE_LISTING_IMAGES: function (state, imageUrl) {
            var image = state.listing.imageList.find(function (x) { return x.url === imageUrl; });
            Vue.set(state.listing, 'imageList', Utils.removeFromArray(state.listing.imageList, image));
        },
        ADD_PROFILE_IMAGES: function (state, profileImages) {
            if (state.profile.images) {
                profileImages.map(function (x) { return state.profile.images.push(x); });
            }
            else {
                Vue.set(state.profile, 'images', profileImages);
            }
        },
        REMOVE_PROFILE_IMAGE: function (state, imageUrl) {
            var image = state.profile.images.find(function (x) { return x.url === imageUrl; });
            Vue.set(state.profile, 'images', Utils.removeFromArray(state.profile.images, image));
        },
        UPDATE_BOOKING: function (state, payload) {
            Vue.set(state, 'booking', payload);
        },
        ADD_BOOKING_PARTICIPANT: function (state, user) {
            //var participants = (state.booking as any).participants;
            //participants.push(user);
            //Vue.set(state.booking, 'participants', participants);
            if (!state.booking.participants) {
                state.booking.participants = user;
            }
            else {
                //(state.booking as any).participants.push(user);    
                Vue.set(state.booking.participants, state.booking.participants.length, user);
            }
        },
        REMOVE_BOOKING_PARTICIPANT: function (state, index) {
            var participants = state.booking.participants;
            participants.splice(index, 1);
            Vue.set(state.booking, 'participants', participants);
        },
        ISLOADING: function (state, value) {
            Vue.set(state, 'isLoading', value);
        },
        TOGGLE_LOGIN_MODAL: function (state, value) {
            if (value) {
                state.dynamicModal = {
                    name: 'loginmodal',
                    props: { show: true },
                    events: { onSuccessfulLogin: "onSuccessfulLogin", onClose: "hideLoginModal" }
                };
            }
            else {
                state.dynamicModal = null;
            }
            //Vue.set(state, 'showLoginModal', value);
        },
        TOGGLE_SCHEDULE_MODAL: function (state, payload) {
            if (payload.state) {
                state.dynamicModal = {
                    name: 'schedulemodal',
                    props: { show: true, schedule: payload.data },
                    events: { onSave: "onSaveSchedule", onClose: "onHideScheduleModal" }
                };
            }
            else {
                state.dynamicModal = null;
            }
            //Vue.set(state, 'showScheduleModal', value);
        },
        INSERT_OPERATOR: function (state, value) {
            state.listing.tourOperators.push(value);
        },
        DELETE_OPERATOR: function (state, value) {
            Vue.set(state.listing, 'tourOperators', Utils.removeFromArray(state.listing.tourOperators, value));
        }
    }
});
