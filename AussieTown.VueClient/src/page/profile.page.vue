<template>
    <div class="page-content container tile is-vertical profile-content">
        <div v-if="canEdit" class="tabs is-toggle is-fullwidth is-medium">
            <ul>
                <li>
                    <router-link :to="{ name: 'profileHome' }">
                        <i class="icon icon-clipboard"></i>
                        <label class="tab-text is-hidden-mobile">Profile</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'changePassword' }">
                        <i class="icon icon-lock"></i>
                        <label class="tab-text is-hidden-mobile">Change password</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileListings' }">
                        <i class="icon icon-list-alt"></i>
                        <label class="tab-text is-hidden-mobile">Your Listings</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileTrips' }">
                        <i class="icon icon-suitcase"></i>
                        <label class="tab-text is-hidden-mobile">Your Trips</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileMessages' }">
                        <i class="icon icon-envelope-o"></i>
                        <label class="tab-text is-hidden-mobile">Inbox</label>
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