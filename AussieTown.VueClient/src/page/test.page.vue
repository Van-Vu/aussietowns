<template>
    <div class="container">
        <section class="header-main">
            <div class="content">
                <!--<numberchooser v-model="numberChooser"></numberchooser>-->
            </div>
            <div style="margin-top:100px;">
                <datepicker :disabled="disableDays" :range="false" :inline="true" v-model="startDate"></datepicker>
            </div>
        </section>
        <button @click="checkLogginUser"> check current user</button>
        <button @click="addNotification"> Add notification</button>
    </div>
</template>

<script lang="ts">
import TestPage from "./test.page.ts";
export default TestPage;
</script>