<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="header">
            This is header
        </div>
        <div slot="body">
            <registrationform></registrationform>
        </div>
    </modalshell>
</template>

<script lang="ts">
import RegistrationModal from "./registrationmodal.component.ts";
export default RegistrationModal;
</script>