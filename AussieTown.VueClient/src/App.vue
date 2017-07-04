<template>
    <div id="app">
        <header class="hero-head">
            <nav-menu></nav-menu>
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