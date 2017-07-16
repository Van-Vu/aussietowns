<template>
    <div class="container is-fluid tile profile-content">
        <div class="tile is-3 is-vertical box profile-menu">
            <router-link :to="{ name: 'profileHome' }">
                <!--<input id="tab1" type="radio" name="radio" value="profileHome" v-model="currentTab">-->
                <label for="tab1" class="tab-text">Profile</label>
            </router-link>

            <router-link :to="{ name: 'profileImages' }">
                <!--<input id="tab2" type="radio" name="radio" value="profileImages" v-model="currentTab">-->
                <label for="tab2" class="tab-text">Photos</label>
            </router-link>

            <router-link :to="{ name: 'profileMessages' }">
                <!--<input id="tab3" type="radio" name="radio" value="profileMessages" v-model="currentTab">-->
                <label for="tab3" class="tab-text">Messages</label>
            </router-link>

            <router-link :to="{ name: 'profileTrips' }">
                <!--<input id="tab4" type="radio" name="radio" value="profileTrips" v-model="currentTab">-->
                <label for="tab4" class="tab-text">Trips</label>
            </router-link>
        </div>
        <div class="tile is-vertical box">
            <section id="content1" class="profile-section">
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import ProfilePage from "./profile.page.ts";
export default ProfilePage;
</script>