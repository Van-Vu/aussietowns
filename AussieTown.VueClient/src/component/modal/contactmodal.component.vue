<template>
    <modalshell :show.sync="show" @onClose="onClose">
        <h1 slot="header">Send a message</h1>
        <contactform :model="contactModel" @closeModal="onClose" slot="body"></contactform>
    </modalshell>
</template>

<script lang="ts">
import ContactModal from "./contactmodal.component.ts";
export default ContactModal;
</script>