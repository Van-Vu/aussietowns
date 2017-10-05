<template>
    <div class="is-flex">
        <div class="conversation" style="flex: 0 0 25%; max-width: 420px;overflow-y: auto;overflow-x: hidden;">
            <div class="userinfo-wrapper" v-for="conversation in conversations" @click.prevent="openConversation(conversation)">
                <div class="photo_wrapper">
                    <img class="is-circle" :src="conversation.userTwo.photoUrl" :alt="conversation.userTwo.fullName">
                </div>
                <div class="text_wrapper">
                    <div>{{conversation.userTwo.fullname}}</div>
                    <div style="color: rgb(166, 166, 166)">{{conversation.messageContent}}</div>
                </div>
                <!--<div class="text_wrapper">{{conversation.lastMessageFormat}}</div>-->
            </div>
        </div>
        <div style="flex: 0 0 75%;border-left:2px solid grey;overflow-x:hidden;overflow-y:auto;">
            <div class="tile control is-sticky-bottom" style="width: 100%; height:110px;position:relative;">
                <div class="message-icon" style="position:absolute; right:0;width:80%">
                    <textarea class="textarea" style="min-height: 70px;" v-model="sendingMessage"/>
                    <button type="button" class="button mtl_button-no-round" style="top:70px;" @click.prevent="sendMessage">
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
