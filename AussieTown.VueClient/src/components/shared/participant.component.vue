<template>
    <ul class="tour-paticipant">
        <div style="height:100px;"
        <li class="li-horizontal" v-for="user of internalUsers ">
            <miniprofile :data="user" :isRemovable="true" @removeUser="onUserRemove($event)"></miniprofile>
        </li>
        <li class="li-horizontal">
            <button @click.prevent="toggleProfileSearch($event)" class="addParticipant">
                <span class="glyphicon glyphicon-plus-sign"></span> {{buttonText}}
            </button>
            <autocomplete :minChars="3"
                          :list="searchUsers"
                          :placeHolderText="placeHolderText"
                          :keyword="searchStr"
                          v-on:search="onUserSearch($event)"
                          v-on:select="onUserSelect($event)"></autocomplete>
        </li>
    </ul>
</template>

<script lang="ts">
import ParticipantComponent from "./participant.component.ts";
export default ParticipantComponent;
</script>