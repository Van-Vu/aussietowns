<template>
    <div class="container is-fluid tile profile-content">
        <div class="tile is-3 is-vertical box profile-menu">
            <router-link :to="{ name: 'profileHome' }">
                <label class="tab-text">Profile</label>
            </router-link>

            <router-link :to="{ name: 'changePassword' }">
                <label class="tab-text">Change password</label>
            </router-link>

            <router-link :to="{ name: 'profileImages' }">
                <label class="tab-text">Photos</label>
            </router-link>

            <router-link :to="{ name: 'profileMessages' }">
                <label class="tab-text">Messages</label>
            </router-link>

            <router-link :to="{ name: 'profileTrips' }">
                <label class="tab-text">Trips</label>
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