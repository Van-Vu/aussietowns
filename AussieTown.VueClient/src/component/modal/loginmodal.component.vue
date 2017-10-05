<template>
    <modalshell :show.sync="show" @onClose="onClose">
        <div slot="body">
            <loginform @onSuccessfulLogin="onClose"></loginform>
        </div>
    </modalshell>
</template>

<script lang="ts">
import LoginModalComponent from "./loginmodal.component.ts";
export default LoginModalComponent;
</script>