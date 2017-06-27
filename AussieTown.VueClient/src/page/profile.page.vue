<template>
    <div class="container is-fluid profile-content">
        <input id="tab1" type="radio" name="radio" value="profile" v-model="currentTab">
        <label for="tab1" class="tab-text">Profile</label>

        <input id="tab2" type="radio" name="radio" value="photo" v-model="currentTab">
        <label for="tab2" class="tab-text">Photos and Video</label>

        <input id="tab3" type="radio" name="radio" value="message" v-model="currentTab">
        <label for="tab3" class="tab-text">Messages</label>

        <input id="tab4" type="radio" name="radio" value="trip" v-model="currentTab">
        <label for="tab4" class="tab-text">Trips</label>
        <section id="content1" class="profile-section">
            <router-view></router-view>
            <p>
                Bacon ipsum dolor sit amet beef venison beef ribs kielbasa. Sausage pig leberkas, t-bone sirloin shoulder bresaola. Frankfurter rump porchetta ham. Pork belly prosciutto brisket meatloaf short ribs.
            </p>
            <p>
                Brisket meatball turkey short loin boudin leberkas meatloaf chuck andouille pork loin pastrami spare ribs pancetta rump. Frankfurter corned beef beef tenderloin short loin meatloaf swine ground round venison.
            </p>
        </section>
    </div>
</template>

<script lang="ts">
import ProfilePage from "./profile.page.ts";
export default ProfilePage;
</script>