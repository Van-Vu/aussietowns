<template>
    <div>
        <form class="searchbar">
            <locationsearch @onSelected="onSelect($event)" @HeyIAmDone="onSearch"></locationsearch>
            <input type="button" class="is-hidden-mobile button mtl_button-no-round searchBtn" value="Search" @click="onSearch" />
            <button type="button" class="is-hidden-tablet button mtl_button-no-round searchBtn" @click="onSearch">
                <i class="glyphicon glyphicon-search"></i>
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import SearchBarComponent from "./searchbar.component.ts";
    export default SearchBarComponent;
</script>