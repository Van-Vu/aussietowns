<template>
    <div>
        <ul>
            <li v-for="conversation in conversations">
                <miniprofile :data="conversation.userTwo" :isRemovable="false"></miniprofile> 
                <span>{{conversation.lastMessageFormat}}</span>
            </li>
            <li v-for="conversation in conversationsContent">
                <div v-for="message in conversation">{{message.messageContent}}</div>
            </li>
        </ul>
        <span>{{cookieValue}}</span>
    </div>

</template>

<script lang="ts">
import MessageComponent from "./message.component.ts";
export default MessageComponent;
</script>