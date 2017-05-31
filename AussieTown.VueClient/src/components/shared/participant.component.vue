<template>
    <ul class="tour-paticipant">
        <div style="height:100px;"
        <li class="li-horizontal" v-for="user of participants ">
            <miniprofile :data="user" :isRemovable="true" @removeUser="onUserRemove($event)"></miniprofile>
        </li>
        <li class="li-horizontal">
            <button @click.prevent="toggleProfileSearch($event)" class="addParticipant">
                <span class="glyphicon glyphicon-plus-sign"></span> {{buttonText}}
            </button>
            <usersearch v-show="isAdding" @onSelected="onUserSelect($event)"></usersearch>
        </li>
    </ul>
</template>

<script lang="ts">
import ParticipantComponent from "./participant.component.ts";
export default ParticipantComponent;
</script>