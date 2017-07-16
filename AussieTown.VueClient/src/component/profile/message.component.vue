<template>
    <ul class="message">
        <li class="conversation" v-if="!isShowConversationContent" v-for="conversation in conversations">
            <a @click.prevent="openConversation(conversation)">
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
        </li>
        <li v-if="isShowConversationContent">
            <button @click.prevent="isShowConversationContent = false">Go back </button>
        </li>
        <li v-if="isShowConversationContent" v-for="message in conversationsContent">
            <div :class="messageBubble(message)">
                <div class="talktext">
                    <p>{{message.messageContent}}</p>
                </div>
            </div>
        </li>
        <li class="field" v-if="isShowConversationContent">
            <div class="control is-sticky-bottom has-icon has-icon-right">
                <input class="input" v-model="sendingMessage">
                <span class="message-icon icon" @click.prevent="sendMessage">
                    <i class="glyphicon glyphicon-send"></i>
                </span>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import MessageComponent from "./message.component.ts";
export default MessageComponent;
</script>
