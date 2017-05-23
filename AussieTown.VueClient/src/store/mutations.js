import Vue from 'vue'

export default {
  INCREASE_ITEMPERPAGE: (state, { type }) => {
    state.itemsPerPage += 1
  }
}
