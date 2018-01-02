<template>
    <div class="checkButton">
        <div v-if="isEditing" class="toggle toggle--push" v-for="item of model" :key="item.id">
            <input type="checkbox" :id="item.id" class="toggle--checkbox" :value="item.value" v-model="checkValue">
            <label class="toggle--btn" :for="item.id">{{item.text}}</label>
        </div>
        <div v-if="!isEditing" class="toggle toggle--push" v-for="item of readonlyValue">
            <label class="toggle--label">{{item.text}}</label>
        </div>
    </div>
</template>

<script lang="ts">
import CheckButton from "./checkbutton.component.ts";
export default CheckButton;
</script>