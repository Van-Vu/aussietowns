<template>
    <ul class="tile is-vertical tour-paticipant">
        <li class="tile box" v-for="user of participants ">
            <miniprofile :data="user" :isRemovable="true" @removeUser="onUserRemove($event)"></miniprofile>
        </li>
        <li v-if="isEditing" class="tile box">
            <a @click.prevent="toggleProfileSearch($event)" class="button mtl_button">
            <i class="glyphicon glyphicon-plus-sign"/><span>{{buttonText}}</span></a>
            <usersearch v-show="isAdding" @onSelected="onUserSelect($event)"></usersearch>
        </li>
    </ul>
</template>

<script lang="ts">
import ParticipantComponent from "./participant.component.ts";
export default ParticipantComponent;
</script>