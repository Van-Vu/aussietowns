<template>
    <div class="is-flex">
        <div class="conversation" style="flex: 0 0 25%; max-width: 420px;overflow-y: auto;overflow-x: hidden;">
            <a v-for="conversation in conversations" @click.prevent="openConversation(conversation)">
                <div class="photo_wrapper">
                    <img class="profile_photo_img" :src="conversation.userTwo.photoUrl" width="50" height="50" :alt="conversation.userTwo.fullName">
                </div>
                <div class="text_wrapper">
                    <div>{{conversation.userTwo.fullname}}</div>
                    <div>
                        <span>{{conversation.messageContent}}</span>
                    </div>
                </div>
                <div class="text_wrapper">{{conversation.lastMessageTime}}</div>
            </a>
        </div>
        <div style="flex: 0 0 75%;border-left:2px solid grey;overflow-x:hidden;overflow-y:auto;">
            <div class="tile control is-sticky-bottom" style="width: 100%; height:110px;position:relative;">
                <div class="message-icon" style="position:absolute; right:0;width:80%">
                    <textarea class="textarea" style="min-height: 70px;" v-model="sendingMessage"/>
                    <button type="button" class="button mtl_button-no-round" style="top:70px;" @click.prevent="sendMessage">
                        <i class="glyphicon glyphicon-send"></i>
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
