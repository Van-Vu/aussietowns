<template>
    <div id="app" :class="{showModal: showModal}">
        <notifications></notifications>
        <loading></loading>
        <header class="hero-head" :class="{'is-home': currentPage == 'home'}">
            <navmenu></navmenu>
            <!--<header-banner></header-banner>-->
            <!--<loginmodal :show="showLoginModal" @onSuccessfulLogin="onSuccessfulLogin" @onClose="hideLoginModal"></loginmodal>-->
            <!--@onClose="hideModal" @onSuccessfulLogin="onSuccessfulLogin" @onScheduleSave="onSaveSchedule"-->
            <component v-if="currentView" v-bind:is="currentView.name" v-bind="currentView.props" @onClose="onCloseModal" @onSave="onSaveSchedule"></component>

        </header>
        <section class="hero-body">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </section>
        <footer class="hero-foot tile is-vertical">
            <div class="social-media">
                <a href="https://www.facebook.com/FunWithLocal/" target="_blank" class="social-medial-link">
                    <i class="social-medial-icon social-medial-icon_facebook"></i>
                    <span>Facebook</span>
                </a>
                <a href="https://twitter.com/FunWithLocal" target="_blank" class="social-medial-link">
                    <i class="social-medial-icon social-medial-icon_twitter"></i>
                    <span>Twitter</span>
                </a>
                <!--<a class="social-medial-link">
                    <i class="social-medial-icon social-medial-icon_googlePlus"></i>
                    <span>Google</span>
                </a>-->
                <a href="https://www.instagram.com/funwithlocal/" target="_blank" class="social-medial-link">
                    <i class="social-medial-icon social-medial-icon_instagram"></i>
                    <span>Instagram</span>
                </a>
                <a href="https://www.pinterest.com.au/funwithlocal" target="_blank" class="social-medial-link">
                    <i class="social-medial-icon social-medial-icon_pinterest"></i>
                    <span>Pinterest</span>
                </a>
            </div>
            <div class="tile is-parent">
                <div class="tile is-2"></div>
                <div class="tile is-5 is-vertical">
                    <h4 class="tile">What's happening</h4>
                    <ul style="font-weight: 500;">
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-sydney', articleId:'1' } }">In Sydney</router-link></li>
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-melbourne', articleId:'1' } }">In Melbourne</router-link></li>
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-brisbane', articleId:'1' } }">In Brisbane</router-link></li>
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-adelaide', articleId:'1' } }">In Adelaide</router-link></li>
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-perth', articleId:'1' } }">In Perth</router-link></li>
                        <li><router-link :to="{ name: 'whatson', params: { seoString: 'in-tasmania', articleId:'1' } }">In Tasmania</router-link></li>
                    </ul>
                </div>
                <div class="tile is-5 is-vertical">
                    <h4 class="tile">About</h4>
                    <ul style="font-weight: 500;">
                        <li><router-link :to="{ name: 'about', params: { seoString: 'what-is-funwithlocal', articleId:'1' } }">What is FunWithLocal</router-link></li>
                        <li><router-link :to="{ name: 'about', params: { seoString: 'why-us', articleId:'1' } }">Why us</router-link></li>
                        <li><router-link :to="{ name: 'about', params: { seoString: 'how-it-works', articleId:'1' } }">How it works</router-link></li>
                        <li><router-link :to="{ name: 'about' }">About us</router-link></li>
                        <li><router-link :to="{ name: 'about', params: { seoString: 'contact-us', articleId:'1' } }">Contact us</router-link></li>
                        <li><router-link :to="{ name: 'termsandconditions' }">Terms and Conditions</router-link></li>
                    </ul>
                </div>
            </div>
        </footer>
        
    </div>
</template>

<script lang="ts">
import App from "./App.ts";
export default App;
</script>

<style lang="scss">
    @import './sass/base.scss'
</style>