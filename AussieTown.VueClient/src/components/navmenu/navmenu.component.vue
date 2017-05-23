<template>
    <div id="header">
        <div class='nav-bar' v-bind:class="{ 'is-sticky': isSticky }">
            <router-link to="home" :class="{ 'hidden': hideNavToggle }">
				<div class='nav-bar__logo glyphicon glyphicon-home'></div>
			</router-link>

            <a @click="onNavToggle()" :class="{ 'hidden': !hideNavToggle }">
                <div class='nav-bar__logo glyphicon glyphicon-home'></div>
                <div class="nav-bar__toggle">
                    <i class="glyphicon glyphicon-chevron-down"></i>
                </div>
            </a>

            <div class='nav-bar__menu' :class="{'is-open': isMenuOpen, 'is-close': !isMenuOpen}">
                <ul>
                    <li active-class="link-active" class="nav-bar__menu-item">
                        <router-link class="nav-bar__menu-item-link" :to="{ name: 'tourdetail', params: { id: 6}}">
                            <span class='glyphicon glyphicon-th-list'></span> Tour Detail
                        </router-link>
                    </li>
                    <li v-if="logginInUserId == 0" class="nav-bar__menu-item" active-class="link-active">
                        <a class="nav-bar__menu-item-link" @click="showLoginModal = !showLoginModal">
                            <span class='glyphicon glyphicon-th-list'></span> Log in
                        </a>
                    </li>
                    <li v-if="logginInUserId == 0" class="nav-bar__menu-item" active-class="link-active">
                        <a class="nav-bar__menu-item-link" @click="showRegistrationModal = !showRegistrationModal">
                            <span class='glyphicon glyphicon-th-list'></span> Sign up
                        </a>
                    </li>

                    <li v-if="logginInUserId > 0" class="nav-bar__menu-item">
                        <router-link class="nav-bar__menu-item-link" :to="{ name: 'profile', params: { id: logginInUserId }}"  active-class="link-active">
                            <span class='glyphicon glyphicon-th-list'></span> Hi
                        </router-link>
                    </li>

                    <li v-if="logginInUserId > 0" class="nav-bar__menu-item">
                        <router-link class="nav-bar__menu-item-link" to="logout" @click="onLogout()">
                            <span class='glyphicon glyphicon-th-list'></span> Log out
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>
        <loginmodal :show="showLoginModal" @onSuccessfulLogin="onSuccessfulLogin" @onClose="showLoginModal = !showLoginModal"></loginmodal>
        <registrationmodal :show="showRegistrationModal" @onClose="showRegistrationModal = !showRegistrationModal"></registrationmodal>
    </div>

</template>

<script lang="ts">
    import NavMenuComponent from "./navmenu.component.ts";
    export default NavMenuComponent;
</script>