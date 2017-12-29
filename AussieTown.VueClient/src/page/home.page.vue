<template>
    <div class="container">
        <section class="header-main">
            <div class="background">
                <img :src="backgroundImage" alt="Background Image"/>
            </div>
            <img class="backgroundShadow" v-if="showShadowImage" src="/static/images/shadow.jpg"/>
            <article id="typingwrapper">
                <h1 id="homepagetyping">Have a blast with real locals.</h1>
            </article>
            <article id="searchBarHomepage">
                <!--Bodom: no need for now, come bak later
                <searchbar @onSelect="onSelect($event)" @onSearch="onSearch($event)" ></searchbar>-->
            </article>
        </section>

        <section class="page-content" :class="{'is-home': currentPage == 'home'}">
            <ul>
                <li class="li-horizontal" v-for="listing in featuredListings">
                    <listingcard :listingDetail="listing"></listingcard>
                </li>
            </ul>

            <div>
                <listingcard v-for="article in featuredArticles" :key="article.id" :listingDetail="listing"></listingcard>
            </div>

            <h2>What is FunWithLocal</h2>
            <ul class="bullet-item">
                <li>“The marketplace for travellers who want to have real fun via real experiences with real locals.”</li>
                <li>We create this platform for travellers to discover new experience like a local, for locals to share their knowledge, their stories and meet new people</li>
                <li>We want to create a community for you so that everywhere you go, you can always say: I have a mate</li>
            </ul>
            <h2>Why us</h2>
            <ul class="bullet-item">
                <li>Build up your reputation as a seasoned traveller</li>
                <li>Meet new people, make new friend</li>
                <li>Participate in a community to support each other wherever you go</li>
                <li>At this point, using our platfrom is free. We don't charge you anything because we want you to have the best experience at the most reasonable price determined by you host</li>
                <li>Experience every precious moment of your time while travel</li>
            </ul>
            <h2>How it works</h2>
            <div class="tile">
                <div class="tile is-6 is-vertical">
                    <h3>For travellers:</h3>
                    <ul class="bullet-item">
                        <li>Search a tour of your destination</li>
                        <li>Request a booking</li>
                        <li>Receive contact information from your host</li>
                        <li>Settle payment</li>
                        <li>Confirm booking</li>
                        <li><strong>Ready to rock</strong></li>
                    </ul>
                </div>
                <div class="tile is-6 is-vertical">
                    <h3>For hosts:</h3>
                    <ul class="bullet-item">
                        <li>Create an experience</li>
                        <li>Wait for booking request</li>
                        <li>Contact your guests to settle payment</li>
                        <li>Prepare for the experience</li>
                        <li><strong>Ready to rock</strong></li>
                    </ul>
                </div>
            </div>
            <h2>So what's the catch</h2>
            <div class="tile">
                <div class="tile is-6 is-vertical">
                    <h3>For travellers:</h3>
                    <ul class="bullet-item">
                        <li>Enjoy unique local experiences</li>
                        <li>Fair price</li>
                        <li>Directly from a local host</li>
                        <li>Meet new friends</li>
                        <li>Learn exciting facts from real locals</li>
                    </ul>

                </div>
                <div class="tile is-6 is-vertical">
                    <h3>For hosts:</h3>
                    <ul class="bullet-item">
                        <li>Earn money by doing what you are good at</li>
                        <li>Sell directly to the tourist</li>
                        <li>Get a fair price</li>
                        <li>Know the tourist you will meet in advance</li>
                        <li>Meet new friends</li>
                    </ul>
                </div>
            </div>
</section>
    </div>
</template>

<script lang="ts">
import HomePage from "./home.page.ts";
export default HomePage;
</script>