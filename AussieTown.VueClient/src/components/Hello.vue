<template>
  <div class="hello">
    <autocomplete
          :minChars="3"
          :list="list"
          :placeHolderText="placeHolderText"
          :keyword="searchStr"
          v-on:search="onLocationSearch($event)"
          v-on:select="onSelect($event)"></autocomplete>
    <test></test>

      <!--<vue-instant :suggestion-attribute="suggestionAttribute" 
                   v-model="value" :disabled="false" 
                   @input="changed" @click-input="clickInput" @click-button="clickButton" 
                   @selected="selected" @enter="enter" @key-up="keyUp" @key-down="keyDown" 
                   @key-right="keyRight" @clear="clear" @escape="escape" :show-autocomplete="true" 
                   :autofocus="false" :suggestions="suggestions" name="customName" 
                   placeholder="custom placeholder" type="google"></vue-instant>-->

          <h1>{{ msg }}</h1>
          <h2>Essential Links this idfgh dhdghertherthreth ret</h2>
          <ul>
              <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
              <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
              <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
              <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
              <br>
              <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
          </ul>
          <h2>ASDFSADFASDFAD Ecosystem</h2>
          <ul>
              <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
              <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
              <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
              <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
          </ul>
</div>
</template>

<script lang="ts">
import Hello from "./Hello.ts";
export default Hello;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
