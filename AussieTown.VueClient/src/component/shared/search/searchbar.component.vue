<template>
    <div>
        <form class="searchbar"  style="border: 1px solid #CFD5DB;">
            <locationsearch @onSelected="onSelect($event)"></locationsearch>
            <input type="button" class="is-hidden-mobile searchBtn" value="Search" @click="onSearch" />
            <button type="button" class="is-hidden-tablet searchBtn" @click="onSearch">
                <i class="glyphicon glyphicon-search"></i>
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import SearchBarComponent from "./searchbar.component.ts";
    export default SearchBarComponent;
</script>