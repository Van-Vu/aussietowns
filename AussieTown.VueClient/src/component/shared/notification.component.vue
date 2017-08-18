<template> 
    <div class="notifications">
        <div class="notification " v-for="notification in notifications" :class="notification.type" transition="fade">
            <div class="message-header">
                <button class="delete touchable" @click="triggerClose(notification)"></button>
                <span>{{notification.title}}</span>
            </div>
            <div v-if="notification.text" class="message-body">{{notification.text}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import NotificationComponent from "./notification.component.ts";
export default NotificationComponent;
</script>