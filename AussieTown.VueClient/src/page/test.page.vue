<template>
    <div class="page-content container tile is-vertical">
        <div class="tile">
            <datepicker :disabled="disableDays" :range="false" :inline="true" v-model="startDate"></datepicker>
        </div>
        <div class="tile">
            <form-wizard>
                <tab-content title="Personal details">
                    My first tab content
                </tab-content>
                <tab-content title="Additional Info">
                    My second tab content
                </tab-content>
                <tab-content title="Last step">
                    Yuhuuu! This seems pretty damn simple
                </tab-content>
            </form-wizard>
        </div>

        <div class="tile" style="margin-top:100px;">
            <button @click="checkLogginUser"> check current user</button>
            <button @click="addNotification"> Add notification</button>
          
        </div>
     </div>
</template>

<script lang="ts">
import TestPage from "./test.page.ts";
export default TestPage;
</script>