<template>
  <div class="bodom">
    <p>hello Bodom {{item}}</p>
  </div>
</template>

<script>
export default {
  
  asyncData ({ store, route }) {
    // return the Promise from the action
      // return the Promise from the action
      console.log('here II am: :' + store.state);
      return store.dispatch('FETCH_LISTING');
  },

  computed: {
    // display the item from store state.
    item () {
      return this.$store.state
    }
  }
}
</script>