
export default {
  // ensure data for rendering given list type
  INCREASE_ACTION: ({ commit, dispatch, state }, { type }) => {
    commit('INCREASE_ITEMPERPAGE', { type })
    //return fetchIdsByType(type)
    //  .then(ids => commit('SET_LIST', { type, ids }))
    //  .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
    //  return ''
  }
}
