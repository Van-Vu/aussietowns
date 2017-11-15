import Vue from 'vue';
import Vuex from 'vuex';
import ListingService from "../service/listing.service";
import UserService from "../service/user.service";
import MessageService from "../service/message.service";
import UploadService from "../service/fileupload.service";
import LogService from "../service/log.service";
import BookingService from "../service/booking.service";
import ListingModel from '../model/listing.model';
import MiniProfile from '../model/miniprofile.model';
import UserModel from '../model/user.model';
import ConversationModel from '../model/conversation.model';
import { ListingType, NotificationType } from '../model/enum';
import { Utils } from '../component/utils';
import { plainToClass } from "class-transformer";
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            getState: function (key) { return Cookies.getJSON(key); },
            setState: function (key, state) { if (state)
                Cookies.set(key, state, { expires: 3, secure: false }); },
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
            if (state.loggedInUser) {
                return typeof state.loggedInUser.email != 'undefined' && state.loggedInUser.email !== '';
            }
            return false;
        },
        profilePhoto: function (state) {
            if (state.loggedInUser) {
                return Utils.getProfileImage(state.loggedInUser.photoUrl);
            }
            return '';
        },
        profileLink: function (state) {
            if (typeof state.loggedInUser != 'undefined' && typeof state.loggedInUser != 'function') {
                return Utils.seorizeString(Utils.getProfileFullName(state.loggedInUser));
            }
            return null;
        },
        userId: function (state) {
            if (state.loggedInUser) {
                return state.loggedInUser.id;
            }
            return null;
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
            var dispatch = _a.dispatch, commit = _a.commit, state = _a.state;
            return (new ListingService()).getListingById(id)
                .then(function (response) {
                commit('UPDATE_LISTING', response);
            });
        },
        CREATE_LISTING: function (_a, listingType) {
            var commit = _a.commit, state = _a.state;
            var newListing = new ListingModel();
            var user = state.loggedInUser;
            newListing.tourOperators.push(new MiniProfile(user.id, Utils.getProfileFullName(user), user.email, '', Utils.getProfileImage(user.photoUrl), ''));
            if (listingType) {
                newListing.type = listingType.toUpperCase() === ListingType[ListingType.Offer].toUpperCase() ? 0 : 1;
            }
            return commit('UPDATE_LISTING', newListing);
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
        // via confirm email cpage
        CONFIRM_USER: function (_a, profile) {
            var commit = _a.commit, state = _a.state;
            return (new UserService()).confirm(profile)
                .then(function (response) { return response; });
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
        UPLOAD_PROFILE_IMAGE: function (_a, payload) {
            var commit = _a.commit;
            return (new UploadService()).uploadProfileImage(payload.data, payload.actionId)
                .then(function (response) { return commit('UPDATE_PROFILE_IMAGE', response); });
        },
        UPLOAD_PROFILE_HEROIMAGE: function (_a, payload) {
            var commit = _a.commit;
            return (new UploadService()).uploadProfileHeroImage(payload.data, payload.actionId)
                .then(function (response) { return commit('UPDATE_PROFILE_HEROIMAGE', response); });
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
            commit('SHOW_LOGIN_MODAL', true);
        },
        SHOW_SCHEDULE_MODAL: function (_a, payload) {
            var commit = _a.commit;
            commit('SHOW_SCHEDULE_MODAL', payload);
        },
        SHOW_IMAGECROP_MODAL: function (_a, payload) {
            var commit = _a.commit;
            return commit('SHOW_IMAGECROP_MODAL', payload);
        },
        HIDE_MODAL: function (_a) {
            var commit = _a.commit;
            commit('HIDE_MODAL');
        },
        LOG_ERROR: function (_a, err) {
            var commit = _a.commit;
            return (new LogService()).logError(err.message, err.stack);
        },
        HANDLE_ERROR: function (_a, error) {
            var dispatch = _a.dispatch, commit = _a.commit;
            console.log('bodom handle error in store');
            console.log(error);
            dispatch("DISABLE_LOADING");
            switch (error.status) {
                case 400:
                    dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                    break;
                case 403:
                    dispatch('SHOW_LOGIN_MODAL');
                    dispatch('ADD_NOTIFICATION', { title: "Login required", text: "Please login or register to proceed", type: NotificationType.Warning });
                    break;
                case 500:
                    dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                    break;
            }
            dispatch('LOG_ERROR', { message: "" + error.data, stack: error.config.data });
        },
        FETCH_BOOKING_DETAIL: function (_a, bookingId) {
            var commit = _a.commit;
            return (new BookingService()).getBookingById(bookingId).then(function (response) {
                commit('UPDATE_BOOKING', response);
            });
        },
        FETCH_LISTING_WITH_BOOKING_DETAIL: function (_a, listingId) {
            var commit = _a.commit;
            return (new ListingService()).getListingWithBookingDetailById(listingId).then(function (response) {
                commit('UPDATE_BOOKING', response);
            });
        },
        FETCH_ALL_BOOKING_BY_DATE: function (_a, payload) {
            var commit = _a.commit;
            return (new BookingService()).getAllBookingsByDate(payload).then(function (response) {
                commit('UPDATE_BOOKING_GROUPS_DETAIL', response);
            });
        },
        VERIFY_EMAIL_TOKEN: function (_a, payload) {
            var commit = _a.commit;
            return (new UserService()).verifyToken(payload).then(function (response) {
                commit('UPDATE_PROFILE', response);
            });
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
            if (conversations) {
                var conversationArr = plainToClass(ConversationModel, conversations);
                state.conversations = conversationArr;
            }
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
        UPDATE_PROFILE_IMAGE: function (state, profileImage) {
            //if ((state.profile as any).images) {
            //    profileImages.map(x => (state.profile as any).images.push(x));
            //} else {
            //    Vue.set(state.profile, 'images', profileImages);
            //}
            Vue.set(state.profile, 'images', [{ url: profileImage }]);
        },
        UPDATE_PROFILE_HEROIMAGE: function (state, heroImage) {
            Vue.set(state.profile, 'heroImageUrl', heroImage);
        },
        REMOVE_PROFILE_IMAGE: function (state, imageUrl) {
            var image = state.profile.images.find(function (x) { return x.url === imageUrl; });
            Vue.set(state.profile, 'images', Utils.removeFromArray(state.profile.images, image));
        },
        UPDATE_BOOKING: function (state, payload) {
            var listingObject = plainToClass(ListingModel, payload.listing);
            payload.listing = listingObject;
            Vue.set(state, 'booking', payload);
        },
        UPDATE_BOOKING_GROUPS_DETAIL: function (state, payload) {
            Vue.set(state.booking, 'bookingGroups', payload);
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
        SHOW_LOGIN_MODAL: function (state, value) {
            if (value) {
                var onSuccessfulLogin = void 0;
                var hideLoginModal = void 0;
                var test = void 0;
                state.dynamicModal = {
                    name: 'loginmodal',
                    props: { show: true },
                    events: { 'value-updated': test }
                };
            }
            //Vue.set(state, 'showLoginModal', value);
        },
        SHOW_SCHEDULE_MODAL: function (state, payload) {
            var onSaveSchedule;
            var onHideScheduleModal;
            state.dynamicModal = {
                name: 'schedulemodal',
                props: { show: true, schedule: payload },
                events: { onSave: onSaveSchedule, onClose: onHideScheduleModal }
            };
            //Vue.set(state, 'showScheduleModal', value);
        },
        SHOW_IMAGECROP_MODAL: function (state, payload) {
            var onUploadImage;
            return state.dynamicModal = {
                name: 'imagecropmodal',
                props: { show: true, imageSources: payload.images, imageSizeSettings: payload.setting },
                events: { onSave: onUploadImage }
            };
        },
        HIDE_MODAL: function (state) {
            if (state.dynamicModal && state.dynamicModal.props) {
                state.dynamicModal.props.show = false;
                state.dynamicModal.props.name = '';
            }
            // will lose the fly-out effect of run this statement
            //setTimeout(() => { state.dynamicModal = null; }, 200);
        },
        INSERT_OPERATOR: function (state, value) {
            state.listing.tourOperators.push(value);
        },
        DELETE_OPERATOR: function (state, value) {
            Vue.set(state.listing, 'tourOperators', Utils.removeFromArray(state.listing.tourOperators, value));
        }
    }
});
