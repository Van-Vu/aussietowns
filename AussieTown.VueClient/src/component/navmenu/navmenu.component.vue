<template>
    <div class="nav-bar container" :class="{'is-sticky': isSticky}">
        <div class="columns is-gapless is-mobile">
            <div class="column is-two-thirds-desktop" style="position: relative;">
                <!--<div class='nav-bar__logo '></div>-->
                <router-link :to="{name:'home'}" class="nav-bar__logo"></router-link>
                <div class="second-search-bar is-hidden-mobile" v-show="isSticky">
                    <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)"></searchbar>
                </div>
            </div>

            <div class="column is-one-quarter-mobile is-one-third-desktop">
                <ul  class="is-pulled-right">
                    <!--<li class="li-horizontal nav-link"><router-link :to="{ name: 'home' }">Home</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile" v-if="isLoggedIn"><router-link :to="{ name: 'newListing', params: { listingType: 'offer' }}">Create Experience</router-link></li>
                    <!--<li class="li-horizontal nav-link"><router-link :to="{ name: 'newListing', params: { listingType: 'request' }}">Find</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile"><router-link :to="{ name: 'help' }">How it works</router-link></li>
                    <!--<li class="li-horizontal"><router-link :to="{ name: 'termsandconditions' }">Terms and Conditions</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile"><router-link :to="{ name: 'about'}">About</router-link></li>
                    <li class="li-horizontal">
                        <a v-show="!isLoggedIn" class="button is-pulled-right mtl_button" @click.prevent="onShowLoginModal">Join</a>
                        <a v-show="isLoggedIn" class="is-pulled-right" style="margin: 0 15px;" @click="showMenuModal = !showMenuModal">
                            <figure class="image is-32x32">
                                <img class="is-circle" alt="Profile Photo" :src="profilePhoto" />
                            </figure>
                        </a>
                        <ul v-if="isLoggedIn" v-show="showMenuModal" id="popupUserMenu">
                            <li>
                                <router-link :to="{ name: 'profileHome', params: { seoString: profileLink, profileId: userId } }">
                                    <label class="tab-text">Profile</label>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'changePassword', params: { seoString: profileLink, profileId: userId } }">
                                    <label class="tab-text">Change password</label>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'profileListings', params: { seoString: profileLink, profileId: userId } }">
                                    <label class="tab-text">Your Listings</label>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'profileTrips', params: { seoString: profileLink, profileId: userId } }">
                                    <label class="tab-text">Your Trips</label>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'profileMessages', params: { seoString: profileLink, profileId: userId } }">
                                    <label class="tab-text">Inbox</label>
                                </router-link>
                            </li>
                            <li>
                                <hr />
                                <a @click="onLogout">Log Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!--<p class="is-pulled-right"> hey mate, I'm here </p>-->
            </div>
        </div>
        <div class="is-hidden-tablet" v-show="isSticky">
            <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)"></searchbar>
        </div>
    </div>

</template>

<script lang="ts">
    import NavMenuComponent from "./navmenu.component.ts";
    export default NavMenuComponent;
</script>