<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="header">
            This is header
        </div>
        <div slot="body">
            This is header
        </div>
    </modalshell>
</template>

<script lang="ts">
import LoginModalComponent from "./loginmodal.component.ts";
export default LoginModalComponent;
</script>