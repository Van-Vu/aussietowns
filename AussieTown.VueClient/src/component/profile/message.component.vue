<template>
    <div class="tile">
        <ul class="conversation tile is-3 is-vertical is-parent" style="max-height: 420px;overflow-y: auto;overflow-x: hidden;box-shadow: 0 0 1rem 0 rgba(0,0,0,.18);">
            <li class="userinfo-wrapper" v-for="conversation in conversations" @click.prevent="openConversation(conversation)">
                <div class="photo_wrapper">
                    <img class="is-circle" :src="conversation.userTwo.photoUrl" :alt="conversation.userTwo.fullName">
                </div>
                <div class="text_wrapper">
                    <div>{{conversation.userTwo.fullname}}</div>
                    <div style="color: rgb(166, 166, 166)">{{conversation.messageContent}}</div>
                </div>
                <!--<div class="text_wrapper">{{conversation.lastMessageFormat}}</div>-->
            </li>
        </ul>
        <div class="messageContent tile is-9 is-vertical">
            <div class="tile is-vertical control is-sticky-bottom">
                <textarea class="textarea" style="min-height: 70px;" v-model="sendingMessage"/>
                <!--Bodom: hacky way to arrange button on the right-->
                <div class="tile sendButton">
                    <div class="tile is-9 is-hidden-mobile">&nbsp;</div>
                    <button type="button" class="button mtl_button-no-round tile is-3" @click.prevent="sendMessage">
                        <i class="icon icon-paper-plane"></i>
                        <span class="is-hidden-mobile">&nbsp;Send message</span>
                    </button>
                </div>
            </div>
            <div class="tile is-vertical">
                <div v-for="message in conversationsContent" :class="messageBubble(message)">
                    <div class="talktext">
                        <p>{{message.messageContent}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<script lang="ts">
import MessageComponent from "./message.component.ts";
export default MessageComponent;
</script>
