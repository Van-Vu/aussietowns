<template>
    <div id="app">
        <notifications></notifications>
        <loading></loading>
        <header class="hero-head" :class="{'is-home': currentPage == 'home'}">
            <nav-menu></nav-menu>
            <!--<header-banner></header-banner>-->
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