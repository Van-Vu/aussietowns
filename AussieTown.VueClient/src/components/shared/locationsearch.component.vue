<template>
    <div>
        <autocomplete :minChars="3"
            :initialData="initialData"
            :list="locations"
            :placeHolderText="placeHolderText"
            @refreshSelect="onRefreshSelect($event)"
            @search="onLocationSearch($event)"
            @select="onLocationSelected($event)"></autocomplete>
    </div>
</template>

<script lang="ts">
    import LocationSearchComponent from "./locationsearch.component.ts";
    export default LocationSearchComponent;
</script>