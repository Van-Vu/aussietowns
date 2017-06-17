<template>
    <div>
        <autocomplete :minChars="3"
                      :list="users"
                      :placeHolderText="placeHolderText"
                      @search="onUserSearch($event)"
                      @select="onUserSelected($event)"></autocomplete>
    </div>
</template>

<script lang="ts">
    import UserSearchComponent from "./usersearch.component.ts";
    export default UserSearchComponent;
</script>