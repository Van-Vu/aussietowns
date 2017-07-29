<template> 
    <div class="notifications">
        <div class="notification is-success " v-for="notification in notifications" :class="notification.type" transition="fade">
            <div class="message-header">
                <button class="delete touchable" @click="triggerClose(notification)"></button>
                <span class="icon"><i class="glyphicon glyphicon-warning-sign"></i></span>
                <span>{{notification.title}}</span>
            </div>
            <div class="message-body">{{notification.text}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import NotificationComponent from "./notification.component.ts";
export default NotificationComponent;
</script>