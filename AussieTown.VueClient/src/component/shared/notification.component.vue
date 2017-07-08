<template>
    <div class="notifications">
        <div class="notification callout animated" v-for="notification in notifications" :class="notification.type ? notification.type : 'secondary'" transition="fade">
            <button @click="triggerClose(notification)" class="close-button" aria-label="Close alert" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
            <h5 v-if="notification.title">{{notification.title}}</h5>
            <p>
                {{notification.text}}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import NotificationComponent from "./notification.component.ts";
export default NotificationComponent;
</script>