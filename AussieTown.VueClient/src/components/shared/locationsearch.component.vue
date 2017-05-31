<template>
    <div>
        <autocomplete :minChars="3"
            :list="locations"
            :placeHolderText="placeHolderText"
            @search="onLocationSearch($event)"
            @select="onLocationSelected($event)"></autocomplete>
    </div>
</template>

<script lang="ts">
    import LocationSearchComponent from "./locationsearch.component.ts";
    export default LocationSearchComponent;
</script>