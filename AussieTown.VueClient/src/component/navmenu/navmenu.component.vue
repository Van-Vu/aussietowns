<template>
    <div class="nav-bar container" :class="{'is-sticky': isSticky}">
        <div class="columns is-gapless is-mobile">
            <div class="column is-one-quarter-mobile">
                <a class="button is-pulled-left mtl_button" @click="showMenuModal = !showMenuModal">
                <i class="glyphicon glyphicon-menu-hamburger"></i> Menu
                </a>
            </div>
            <div class="column is-half-mobile ">
                <div class='nav-bar__logo'></div>
                <router-link :to="{name:'home'}" class="is-center"><div class='nav-bar__logo'></div></router-link>
            </div>
            <div class="column is-one-quarter-mobile">
                <a v-if="!isLoggedIn"class="button is-pulled-right mtl_button" @click="showLoginModal = !showLoginModal">Join</a>
                <a v-else class="is-pulled-right" @click="showLoginModal = !showLoginModal">
                    <figure class="image is-32x32">
                        <img class="is-circle" :src="profilePhoto" />
                    </figure>
                </a>
            </div>

        </div>
        <div class="is-hidden-tablet" v-show="showSecondSearchBar">
            <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)"></searchbar>
        </div>
        <loginmodal :show="showLoginModal" @onSuccessfulLogin="onSuccessfulLogin" @onClose="showLoginModal = !showLoginModal"></loginmodal>
        <!--<registrationmodal :show="showRegistrationModal" @onClose="showRegistrationModal = !showRegistrationModal"></registrationmodal>-->
        <menumodal :show="showMenuModal" @onClose="showMenuModal = !showMenuModal"></menumodal>
    </div>

</template>

<script lang="ts">
    import NavMenuComponent from "./navmenu.component.ts";
    export default NavMenuComponent;
</script>