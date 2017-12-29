<template>
    <div>
        <zoneloading :isLoading="true" :loadingText="'Logging out and redirect to home'"></zoneloading>
    </div>
</template>

<script lang="ts">
    import LogoutForm from './logoutform.component.ts'
    export default LogoutForm
</script>