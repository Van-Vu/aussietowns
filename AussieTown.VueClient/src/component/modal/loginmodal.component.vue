<template>
    <modalshell :show.sync="show" @onClose="close">
        <div slot="body">
            <loginform @onSuccessfulLogin="onSuccessfulLogin"></loginform>
        </div>
    </modalshell>
</template>

<script lang="ts">
import LoginModalComponent from "./loginmodal.component.ts";
export default LoginModalComponent;
</script>