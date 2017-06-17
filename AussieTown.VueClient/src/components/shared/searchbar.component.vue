<template>
    <div>
        <form class="searchbar">
            <locationsearch @onSelected="onSelect($event)"></locationsearch>
            <input type="submit" class="is-hidden-mobile searchBtn" value="Search" @click="onSearch" />
            <button type="submit" class="is-hidden-tablet searchBtn" @click="onSearch">
                <i class="glyphicon glyphicon-search"></i>
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import SearchBarComponent from "./searchbar.component.ts";
    export default SearchBarComponent;
</script>