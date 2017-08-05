<template>
    <div class="page-content container tile is-vertical is-parent profile-content">
        <div class="tabs is-toggle is-fullwidth is-medium">
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
                    <router-link :to="{ name: 'profileImages' }">
                        <label class="tab-text">Photos</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileMessages' }">
                        <label class="tab-text">Messages</label>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'profileTrips' }">
                        <label class="tab-text">Trips</label>
                    </router-link>
                </li>
            </ul>
        </div>


        <!--<div class="tabs tile is-3 is-vertical box profile-menu">
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
        </div>-->
        <div class="tile box">
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