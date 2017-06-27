<template>
    <div>
        <ul>
            <li v-for="conversation in conversations">
                <a @click.prevent="openConversation(conversation)">
                    <miniprofile :data="conversation.userTwo" :isRemovable="false"></miniprofile>
                    <span>{{conversation.lastMessageFormat}}</span>
                </a>
            </li>
            <li v-for="message in conversationsContent">
                <div :class="messageBubble(message)">
                    <div class="talktext">
                        <p>{{message.messageContent}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
import MessageComponent from "./message.component.ts";
export default MessageComponent;
</script>
