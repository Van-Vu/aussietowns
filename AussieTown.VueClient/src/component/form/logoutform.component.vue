<template>
    <div>
        <zoneloading :isLoading="true" :loadingText="'Logging out'"></zoneloading>
    </div>
</template>

<script lang="ts">
    import LogoutForm from './logoutform.component.ts'
    export default LogoutForm
</script>