<template>
    <modalshell :show.sync="show" @onClose="onClose">
        <h1 slot="header">Login</h1>
        <loginform @onSuccessfulLogin="onClose" slot="body"></loginform>
    </modalshell>
</template>

<script lang="ts">
import LoginModalComponent from "./loginmodal.component.ts";
export default LoginModalComponent;
</script>