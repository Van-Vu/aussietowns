<template>
    <div class="page-content container tile is-vertical profile-content is-profile">
        <div v-if="canEdit" class="tabs is-toggle is-fullwidth is-medium">
            <ul>
                <li>
                    <router-link :to="{ name: 'profileHome' }">
                        <label class="tab-text">Profile</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'changePassword' }">
                        <label class="tab-text">Change password</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileListings' }">
                        <label class="tab-text">Your Listings</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileTrips' }">
                        <label class="tab-text">Your Trips</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileMessages' }">
                        <label class="tab-text">Inbox</label>
                    </router-link>
                </li>

            </ul>
        </div>
        <section>
            <router-view></router-view>
        </section>
    </div>
</template>

<script lang="ts">
import ProfilePage from "./profile.page.ts";
export default ProfilePage;
</script>