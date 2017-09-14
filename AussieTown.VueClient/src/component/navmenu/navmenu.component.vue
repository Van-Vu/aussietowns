<template>
    <div class="nav-bar container" :class="{'is-sticky': isSticky}">
        <div class="columns is-gapless is-mobile">
            <div class="column is-one-quarter-mobile is-hidden-tablet">
                <a class="button is-pulled-left mtl_button" @click="showMenuModal = !showMenuModal">
                <i class="glyphicon glyphicon-menu-hamburger"></i> Menu
                </a>
            </div>
            <div class="column is-half-mobile is-two-thirds-desktop" style="position: relative;">
                <!--<div class='nav-bar__logo '></div>-->
                <router-link :to="{name:'home'}" class="nav-bar__logo"></router-link>
                <div class="second-search-bar is-hidden-mobile" v-show="isSticky">
                    <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)"></searchbar>
                </div>
            </div>
            <!--<div class="column is-half-desktop is-hidden-mobile">
                <div class='nav-bar__logo '></div>
                <router-link :to="{name:'home'}" class="nav-bar__logo"></router-link>
            </div>-->

            <!--<div class="column is-one-quarter-mobile">
                <a v-if="!isLoggedIn"class="button is-pulled-right mtl_button" @click="showLoginModal = !showLoginModal">Join</a>
                <a v-else class="is-pulled-right" @click="showLoginModal = !showLoginModal">
                    <figure class="image is-32x32">
                        <img class="is-circle" :src="profilePhoto" />
                    </figure>
                </a>
            </div>-->

            <div class="column is-one-quarter-mobile is-one-third-desktop">
                <ul  class="is-pulled-right">
                    <!--<li class="li-horizontal nav-link"><router-link :to="{ name: 'home' }">Home</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile is-hidden" v-if="isLoggedIn"><router-link :to="{ name: 'newListing', params: { listingType: 'offer' }}">Create Experience</router-link></li>
                    <!--<li class="li-horizontal nav-link"><router-link :to="{ name: 'newListing', params: { listingType: 'request' }}">Find</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile is-hidden"><router-link :to="{ name: 'help' }">How it works</router-link></li>
                    <!--<li class="li-horizontal"><router-link :to="{ name: 'termsandconditions' }">Terms and Conditions</router-link></li>-->
                    <li class="li-horizontal nav-link  is-hidden-mobile is-hidden"><router-link :to="{ name: 'about'}">About</router-link></li>
                    <li class="li-horizontal">
                        <a v-show="!isLoggedIn" class="button is-pulled-right mtl_button" @click="onShowLoginModal">Join</a>
                        <a v-show="isLoggedIn" class="is-pulled-right" @click="onShowLoginModal">
                            <figure class="image is-32x32">
                                <img class="is-circle" :src="profilePhoto" />
                            </figure>
                        </a>
                    </li>
                </ul>
                <!--<p class="is-pulled-right"> hey mate, I'm here </p>-->
            </div>
        </div>
        <div class="is-hidden-tablet" v-show="isSticky">
            <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)"></searchbar>
        </div>
        <!--<loginmodal :show="showLoginModal" @onSuccessfulLogin="onSuccessfulLogin" @onClose="showLoginModal = !showLoginModal"></loginmodal>-->
        <menumodal :show="showMenuModal" @onClose="showMenuModal = !showMenuModal"></menumodal>
    </div>

</template>

<script lang="ts">
    import NavMenuComponent from "./navmenu.component.ts";
    export default NavMenuComponent;
</script>