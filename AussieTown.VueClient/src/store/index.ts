import Vue from 'vue'
import Vuex from 'vuex'

import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
import UploadService from "../service/fileupload.service";

import ListingModel from '../model/listing.model';
import BookingModel from '../model/booking.model';
import UserModel from '../model/user.model';
import RequestResult from '../model/RequestResult';
import ConversationModel from '../model/conversation.model';
import MessageModel from '../model/message.model';

import { ListingType } from '../model/enum';

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
            filter: (mutation) => { return mutation.type === 'UPDATE_CURRENT_USER' },
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
        isLoggedIn: state => {
            if (state.loggedInUser) {
                return typeof (state.loggedInUser as any).email != 'undefined' && (state.loggedInUser as any).email !== '';    
            }
            return false;
        },
        profilePhoto: state => {
            if (state.loggedInUser) {
                return (state.loggedInUser as any).photoUrl;    
            }
            return null;
        },
        profileLink: state => {
            if (state.loggedInUser) {
                return Utils.seorizeString(`${(state.loggedInUser as any).firstName} ${(state.loggedInUser as any).lastName}`) ;
            }
            return null;
        },
        userId: state => {
            if (state.loggedInUser) {
                return (state.loggedInUser as any).id;
            }
            return null;
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
                .then(response => {
                    commit('UPDATE_LISTING', response);
                });
        },
        CREATE_LISTING({ commit, state }, listingType) {
            let newListing = new ListingModel();
            newListing.type = listingType.toUpperCase() === ListingType[ListingType.Offer].toUpperCase() ? 0 : 1;
            return commit('UPDATE_LISTING', newListing);
        },
        FETCH_FEATURELISTINGS({ commit }) {
            return (new ListingService()).getFeatureListings()
                .then(response => {
                    commit('UPDATE_FEATURELISTINGS', response);
                });
        },
        UPDATE_LISTING({ commit, state }, listing) {
            return (new ListingService()).updateListing(listing)
                .then(response => response);
            //commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING({ commit, state }, listing) {
            return (new ListingService()).addListing(listing)
                .then(response => response);
            //commit('UPDATE_LISTING', listing);
        },
        INSERT_LISTING_OPERATOR({ commit, state }, operator) {
            commit('INSERT_OPERATOR', operator);
        },
        REMOVE_LISTING_OPERATOR({ commit, state }, operator) {
            commit('DELETE_OPERATOR', operator);
        },
        FETCH_PROFILE_BY_ID({ dispatch, commit, state }, id) {
            return (new UserService()).getById(id).then(response => {
                commit('UPDATE_PROFILE', response);
            });
        },
        UPDATE_USER({ commit, state }, profile) {
            return (new UserService()).update(profile)
                .then(response => {
                    commit('UPDATE_PROFILE', profile);
                    return response;
                });
        },
        INSERT_USER({ commit, state }, profile) {
            (new UserService()).signup(profile);
            commit('UPDATE_PROFILE', profile);
        },
        SEARCH_LISTINGS_BY_SUBURB({ commit, state }, suburbId) {
            return (new ListingService()).getListingBySuburb(suburbId).then(response => {
                commit('UPDATE_SEARCH_LISTINGS', response);
            });
        },
        FETCH_CONVERSATIONS_BY_USER({dispatch, commit, state }, userId) {
            return (new MessageService()).getConversations(userId).then(response => {
                commit('UPDATE_CONVERSATIONS', response);
            });
        },
        FETCH_CONVERSATION_CONTENT({ commit, state }, conversationId) {
            return (new MessageService()).getConversationContent(conversationId).then(response => {
                commit('UPDATE_CONVERSATION_MESSAGES', response);
            });            
        },
        SEND_MESSAGE({commit, state}, message)
        {
            return (new MessageService()).sendMessage(message).then(response => {
                if ((response as any) == 1) {
                    commit('ADD_MESSAGE', message);    
                }
                
            });                
        },
        ADD_NOTIFICATION({ dispatch, commit }, notification) {
            commit('ADD_NOTIFICATION', notification);
            setTimeout(() => {dispatch('REMOVE_NOTIFICATION', notification)}, 10000);
        },
        REMOVE_NOTIFICATION({ commit }, notification) {
            commit('REMOVE_NOTIFICATION', notification);
        },
        UPLOAD_LISTING_IMAGES({ commit }, payload) {
            return (new UploadService()).uploadListing(payload.data, payload.actionId)
                .then(response => {
                    commit('ADD_LISTING_IMAGES', response);
                    return (response as any).length;
                });
        },
        UPLOAD_PROFILE_IMAGES({ commit }, payload) {
            return (new UploadService()).uploadProfileImage(payload.data, payload.actionId)
                .then(response => commit('ADD_PROFILE_IMAGES', response));
        },
        UPLOAD_PROFILE_HEROIMAGE({ commit }, payload) {
            return (new UploadService()).uploadProfileHeroImage(payload.data, payload.actionId)
                .then(response => commit('UPDATE_PROFILE_HEROIMAGE', response));
        },
        REMOVE_IMAGE({ commit }, payload) {
            return (new ListingService()).deleteImage(payload.listingId, payload.url)
                .then(response => {
                    commit('REMOVE_LISTING_IMAGES', payload.url);
                });
        },
        UPDATE_BOOKING({ commit }, payload) {
            commit('UPDATE_BOOKING', payload);
        },
        ADD_BOOKING_PARTICIPANT({ commit }, user) {
            commit('ADD_BOOKING_PARTICIPANT', user);
        },
        REMOVE_BOOKING_PARTICIPANT({ commit }, index) {
            commit('REMOVE_BOOKING_PARTICIPANT', index);
        },
        ENABLE_LOADING({commit}) {
            commit('ISLOADING', true);    
        },
        DISABLE_LOADING({ commit }) {
            commit('ISLOADING', false);
        },
        SHOW_LOGIN_MODAL({ commit }) {
            commit('SHOW_LOGIN_MODAL', true);
        },
        SHOW_SCHEDULE_MODAL({ commit }, payload) {
            commit('SHOW_SCHEDULE_MODAL', {state: true, data: payload});
        },
        HIDE_MODAL({ commit }) {
            commit('HIDE_MODAL');
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
            let listingObject = plainToClass(ListingModel, listing);
            Vue.set(state, 'listing', listingObject);
        },
        UPDATE_FEATURELISTINGS(state, listings) {
            state.featureListings = listings;
        },
        UPDATE_PROFILE(state, profile) {
            state.profile = profile;
        },
        UPDATE_SEARCH_LISTINGS(state, listings) {
            state.searchListings = listings;
        },
        UPDATE_CONVERSATIONS(state, conversations) {
            if (conversations) {
                let conversationArr = plainToClass(ConversationModel, conversations);
                state.conversations = conversationArr;
            }
        },
        UPDATE_CONVERSATION_MESSAGES(state, messages) {
            //if (state.conversationsContent == null) {
            //    state.conversationsContent = new Array<MessageModel>();
            //}
            //state.conversationsContent.push(messages);
            Vue.set(state, 'conversationsContent', messages);
        },
        ADD_MESSAGE(state, message) {
            state.conversationsContent.unshift(message);
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
        ADD_LISTING_IMAGES(state, listingImages) {
            if ((state.listing as any).imageList) {
                listingImages.map(x => (state.listing as any).imageList.push(x));
            } else {
                Vue.set(state.listing, 'imageList', listingImages);
            }
        },
        REMOVE_LISTING_IMAGES(state, imageUrl) {
            let image = (state.listing as any).imageList.find(x => x.url === imageUrl);
            Vue.set(state.listing, 'imageList', Utils.removeFromArray((state.listing as any).imageList, image));
        },
        ADD_PROFILE_IMAGES(state, profileImages) {
            if ((state.profile as any).images) {
                profileImages.map(x => (state.profile as any).images.push(x));
            } else {
                Vue.set(state.profile, 'images', profileImages);
            }
        },
        UPDATE_PROFILE_HEROIMAGE(state, heroImage) {
            Vue.set(state.profile, 'heroImage', heroImage);
        },
        REMOVE_PROFILE_IMAGE(state, imageUrl) {
            let image = (state.profile as any).images.find(x => x.url === imageUrl);
            Vue.set(state.profile, 'images', Utils.removeFromArray((state.profile as any).images, image));
        },
        UPDATE_BOOKING(state, payload) {
            Vue.set(state,'booking', payload);
        },
        ADD_BOOKING_PARTICIPANT(state, user) {
            //var participants = (state.booking as any).participants;
            //participants.push(user);
            //Vue.set(state.booking, 'participants', participants);
            if (!(state.booking as any).participants) {
                (state.booking as any).participants = user;
            } else {
                //(state.booking as any).participants.push(user);    
                Vue.set((state.booking as any).participants, (state.booking as any).participants.length, user);
            }

            
        },
        REMOVE_BOOKING_PARTICIPANT(state, index) {
            var participants = (state.booking as any).participants;
            participants.splice(index, 1);
            Vue.set(state.booking, 'participants', participants);
        },
        ISLOADING(state, value) {
            Vue.set(state, 'isLoading', value);
        },
        SHOW_LOGIN_MODAL(state, value) {
            if (value) {
                let onSuccessfulLogin: any;
                let hideLoginModal: any;
                let test: any;
                state.dynamicModal = {
                    name: 'loginmodal',
                    props: {show: true},
                    events: { 'value-updated': test}
                }
            }
            //Vue.set(state, 'showLoginModal', value);
        },
        SHOW_SCHEDULE_MODAL(state, payload) {
            if (payload.state) {
                let onSaveSchedule: any;
                let onHideScheduleModal: any;

                state.dynamicModal = {
                    name: 'schedulemodal',
                    props: { show: true, schedule: payload.data},
                    events: { onSave:onSaveSchedule, onClose: onHideScheduleModal }
                }
            }

            //Vue.set(state, 'showScheduleModal', value);
        },
        HIDE_MODAL(state) {
            if (state.dynamicModal && (state.dynamicModal as any).props) {
                (state.dynamicModal as any).props.show = false;
                (state.dynamicModal as any).props.name = '';
            }

            // will lose the fly-out effect of run this statement
            //setTimeout(() => { state.dynamicModal = null; }, 200);
        },
        INSERT_OPERATOR(state, value) {
            (state.listing as any).tourOperators.push(value);
        },
        DELETE_OPERATOR(state, value) {
            Vue.set(state.listing, 'tourOperators', Utils.removeFromArray((state.listing as any).tourOperators, value));
        }
    }
})
