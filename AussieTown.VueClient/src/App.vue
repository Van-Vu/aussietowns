<template>
    <div id="app" :class="{showModal: showModal}">
        <notifications></notifications>
        <vue-progress-bar></vue-progress-bar>
        <loading></loading>
        <header class="hero-head" :class="{'is-home': currentPage == 'home'}">
            <nav-menu></nav-menu>
            <!--<header-banner></header-banner>-->
            <!--<loginmodal :show="showLoginModal" @onSuccessfulLogin="onSuccessfulLogin" @onClose="hideLoginModal"></loginmodal>-->
            <!--@onClose="hideModal" @onSuccessfulLogin="onSuccessfulLogin" @onScheduleSave="onSaveSchedule"-->
            <component v-if="currentView" v-bind:is="currentView.name" v-bind="currentView.props" @onClose="onCloseModal" @onSave="onSaveSchedule"></component>

        </header>
        <section class="hero-body">
            <transition :duration="{ enter: 5000, leave: 500 }" name="fade">
                <router-view></router-view>
            </transition>
        </section>
        <section class="hero-foot">
        </section>
        
    </div>
</template>

<script lang="ts">
import App from "./App.ts";
export default App;
</script>

<style lang="scss">
    @import './sass/base.scss'
</style>