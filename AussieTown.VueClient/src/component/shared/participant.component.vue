<template>
    <ul class="tile is-vertical tour-paticipant">
        <li class="tile" v-for="user of participants" :key="user.id">
            <miniprofile :data="user" :isRemovable="isEditing && allowRemove" @removeUser="onUserRemove($event)"></miniprofile>
        </li>
        <li v-if="isEditing && allowAdd" class="tile box">
            <a @click.prevent="toggleProfileSearch($event)" class="button mtl_grey_button">
            <i class="glyphicon glyphicon-plus-sign"/><span>{{buttonText}}</span></a>
            <usersearch v-show="isAdding" @onSelected="onUserSelect($event)"></usersearch>
        </li>
    </ul>
</template>

<script lang="ts">
import ParticipantComponent from "./participant.component.ts";
export default ParticipantComponent;
</script>