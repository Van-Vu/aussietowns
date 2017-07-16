<template>
  <div class="autocomplete-wrapper is-flex">
    <label v-if="selectedText != ''" class="tag is-success">{{selectedText}}</label>
    <input type="text" class="search-box"
          v-model="keyword"
           v-focus="focus"
          @input="onInput($event.target.value)"
          @keydown="onKeyDown($event)" @keyup="onKeyUp($event)" @blur="onBlur" @focus="onFocus"
          v-bind:placeHolder="placeHolderText" />
    <div v-if="showList && list.length > 0" class="menu">
        <ul v-for="(item, index) of matches" class="menu-list">
            <li v-bind:class="{ selected: item.selected }" @click="onClickOption(item, index)" class="menu-list-item">
                <img v-if="item.imageUrl" v-bind:src="item.imageUrl" style="width: 30px;height:30px;" />
                <span style="width:auto">{{item.name}}</span> 
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import AutoCompleteComponent from "./autocomplete.ts";
  export default AutoCompleteComponent;
</script>